import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {emptyCart} from '../store/cart'
import {logout} from '../store'
import NavbarLogin from './navbar-login'

const Navbar = ({handleClick, isLoggedIn, name}) => (
  <React.Fragment>
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <NavLink className="navbar-brand" to="/products">
          <div className="logo" />
        </NavLink>
        <div className="d-flex flex-fill">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Find the perfect bulb"
              aria-label="Search Bar"
              aria-describedby="button-addon2"
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              id="button-addon2"
            >
              <i className="bi-search" />
            </button>
          </div>
        </div>
        <div id="login-cart-div" className="d-flex align-items-center">
          <NavbarLogin
            name={name}
            isLoggedIn={isLoggedIn}
            handleClick={() => handleClick()}
          />
          <NavLink to="/cart" className="btn btn-warning mt-0">
            <i className="bi-cart3" />
            Shopping Cart
          </NavLink>
        </div>
      </div>
    </nav>
  </React.Fragment>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    name: state.user.fname
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
