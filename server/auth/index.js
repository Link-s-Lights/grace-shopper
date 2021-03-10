const router = require('express').Router()
const {User, ShippingAddress} = require('../db/models/')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {email: req.body.email},
      include: ShippingAddress
    })
    console.log('XXX user found: ', user)
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.put('/me', async (req, res, next) => {
  try {
    const {email, password, fname, lname, phone, imageUrl} = req.body
    const {line1, line2, city, state, zip} = req.body.shippingAddresses[0]
    await ShippingAddress.update(
      {line1, line2, city, state, zip},
      {where: {userId: req.user.id}, plain: true}
    )
    console.log('address updated')
    const [numberOfAffectedRows, affectedRows] = await User.update(
      {
        email,
        password,
        fname,
        lname,
        phone,
        imageUrl
      },
      {
        where: {id: req.user.id},
        returning: true,
        plain: true,
        include: ShippingAddress
      }
    )
    affectedRows
      ? res.json(
          await User.findOne({
            where: {id: req.user.id},
            include: ShippingAddress
          })
        )
      : res.sendStatus(304)
  } catch (err) {
    next(err)
  }
})

router.delete('/me', async (req, res, next) => {
  try {
    await User.destroy({where: {id: req.user.id}})
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

router.use('/google', require('./google'))
