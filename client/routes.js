import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome, Cart, UserOrders} from './components'
import {me} from './store'
import AllProducts from './components/allProducts'
import SingleProduct from './components/singleProduct'
import AddEditProduct from './components/AddEditProductDetails'
import OrderSubmission from './components/OrderSubmission'
import {getCart, loadCart} from './store/cart'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
    const localCart = JSON.parse(window.localStorage.getItem('cart'))
    if (localCart) this.props.loadLocalCart(localCart)
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.isLoggedIn && this.props.isLoggedIn) {
      this.props.loadUserCart()
    }
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <div className="container">
        <Switch>
          {/* Routes placed here are available to all visitors */}
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/cart" component={Cart} />
          <Route exact path="/products" component={AllProducts} />
          <Route exact path="/products/add" component={AddEditProduct} />
          <Route exact path="/products/:id" component={SingleProduct} />
          <Route exact path="/products/:id/edit" component={AddEditProduct} />
          <Route exact path="/orderSubmission" component={OrderSubmission} />
          {isLoggedIn && (
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route exact path="/home" component={UserHome} />
              <Route path="/home/orders" component={UserOrders} />
            </Switch>
          )}
          {/* Redirects to our All Products path as a fallback */}
          <Route exact path="/">
            <Redirect to="/products" />
          </Route>
        </Switch>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    loadUserCart: () => dispatch(getCart()),
    loadLocalCart: cart => dispatch(loadCart(cart))
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
