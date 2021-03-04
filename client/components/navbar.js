import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, Route} from 'react-router-dom'
import {logout} from '../store'
import allProducts from './allProducts'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    {/* <div>
      <h1>Link's Lights</h1>
    </div> */}
    <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
      <a className="navbar-brand" href="#">
        Link's Lights
      </a>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          <Link to="/products">All Products</Link>
          <Link to="/cart">
            <a href="#" className="btn btn-info btn-lg">
              <span className="glyphicon glyphicon-shopping-cart" /> Shopping
              Cart
            </a>
          </Link>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/products">All Products</Link>
          <Link to="/cart">
            <a href="#" className="btn btn-info btn-lg">
              <span className="glyphicon glyphicon-shopping-cart" /> Shopping
              Cart
            </a>
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
