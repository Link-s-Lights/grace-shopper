import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {emptyCart} from '../store/cart'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-start">
      <NavLink className="navbar-brand" to="/products">
        Link's Lights
      </NavLink>
      <div id="login-cart-div" className="d-flex align-items-center">
        <NavLink to="/cart" className="btn btn-info btn-lg text-center">
          <span className="glyphicon glyphicon-shopping-cart" /> Shopping Cart
        </NavLink>
      </div>
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
      dispatch(emptyCart())
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
