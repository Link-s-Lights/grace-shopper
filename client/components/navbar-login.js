import React from 'react'
import {Link} from 'react-router-dom'

export default function NavbarLogin(props) {
  const name = props.name
  const userType = props.userType
  const isLoggedIn = props.isLoggedIn
  const handleClick = props.handleClick
  return (
    <React.Fragment>
      {isLoggedIn ? (
        <div>
          <div className="dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {name}
            </a>
            <ul
              className="dropdown-menu dropdown-menu-light"
              aria-labelledby="navbarDropdown"
            >
              <li>
                <a className="dropdown-item" href="/home">
                  Profile
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Orders
                </a>
              </li>
              {userType === 'admin' ? (
                <li>
                  <a className="dropdown-item" href="/products/add">
                    Add Product
                  </a>
                </li>
              ) : (
                ''
              )}
              {userType === 'user' ? (
                <li>
                  <a className="dropdown-item" href="/home/orders">
                    Past Orders
                  </a>
                </li>
              ) : (
                ''
              )}
              <li>
                <a className="dropdown-item" href="/" onClick={handleClick}>
                  Signout
                </a>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div>
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </div>
      )}
    </React.Fragment>
  )
}
