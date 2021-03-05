import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, Route} from 'react-router-dom'
import {logout} from '../store'
import {emptyCart} from '../store/cart'
import allProducts from './allProducts'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    {/* <div>
      <h1>Link's Lights</h1>
    </div> */}
    <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-start">
      <Link className="navbar-brand" to="/products">
        Link's Lights
      </Link>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          {/* <Link to="/home">Home</Link> */}
          {/* <a href="#" onClick={handleClick}>
            Logout
          </a> */}
          {/* <Link to="/products">All Products</Link> */}
          <div className="nav-item dropdown">
            <div
              className="nav-link dropdown-toggle"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Profile
            </div>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <Link className="dropdown-item">account</Link>
              <Link className="dropdown-item">orders</Link>
              <Link to="#" onClick={handleClick} className="dropdown-item">
                sign out
              </Link>
            </div>
          </div>
          <Link to="/cart" className="cart-button btn btn-info btn-lg">
            <span className="glyphicon glyphicon-shopping-cart" /> Shopping Cart
          </Link>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          {/* <Link to="/products">All Products</Link> */}
          <Link to="/cart" className="cart-button btn btn-info btn-lg">
            <span className="glyphicon glyphicon-shopping-cart" /> Shopping Cart
          </Link>

          {/* MAYBE ADD SWITCH HERE */}
        </div>
      )}
    </nav>
    <hr />
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
