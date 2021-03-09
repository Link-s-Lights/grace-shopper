import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {emptyCart} from '../store/cart'
import {logout} from '../store'
import NavbarLogin from './navbar-login'
import {setProducts} from '../store/products'

class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {query: ''}

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.handleSearch(`?keywords=${this.state.query}`)
    this.setState({query: ''})
    console.log(this.state)
  }

  render() {
    const {handleClick, isLoggedIn, userType, name, lineItems} = this.props
    const cartSize = lineItems.length
      ? lineItems.reduce((acc, val) => acc + parseInt(val.qty), 0)
      : 0
    return (
      <React.Fragment>
        <nav className="navbar navbar-light bg-light">
          <div className="container">
            <NavLink
              className="navbar-brand"
              to="/products/?page=1"
              aria-label="Home"
            >
              <div className="logo" />
            </NavLink>
            <div className="d-flex flex-fill order-md-0 order-1">
              <form className="input-group" onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  name="query"
                  className="form-control"
                  placeholder="Find the perfect bulb"
                  aria-label="Search Bar"
                  aria-describedby="button-addon2"
                  onChange={this.handleChange}
                />
                <button
                  className="btn btn-outline-secondary"
                  type="submit"
                  id="button-addon2"
                  aria-label="Search Button"
                >
                  <i className="bi-search" />
                </button>
              </form>
            </div>
            <div id="login-cart-div" className="d-flex align-items-center">
              <NavbarLogin
                name={name}
                userType={userType}
                isLoggedIn={isLoggedIn}
                handleClick={() => handleClick()}
              />
              <NavLink
                to="/cart"
                className="btn btn-primary position-relative mt-0"
              >
                <i className="bi-cart3" />
                <div className="d-none d-sm-inline">Shopping Cart</div>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">
                  {cartSize}
                </span>
              </NavLink>
            </div>
          </div>
        </nav>
      </React.Fragment>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    userType: state.user.type,
    name: state.user.fname,
    lineItems: state.cart.lineItems
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
      dispatch(emptyCart())
    },
    handleSearch(query) {
      dispatch(setProducts(query))
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
