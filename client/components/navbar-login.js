import React from 'react'
import {NavLink} from 'react-router-dom'

export default function NavbarLogin(props) {
  const name = props.name
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
              Welcome, {name}!
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
          <NavLink to="/login">Login</NavLink>
        </div>
      )}
    </React.Fragment>
  )
}

// {
//   isLoggedIn ? (
//     <div>
//       <div className="nav-item dropdown">
//         <div
//           className="nav-link dropdown-toggle"
//           id="navbarDropdown"
//           role="button"
//           data-toggle="dropdown"
//           aria-haspopup="true"
//           aria-expanded="false"
//         >
//           Profile
//         </div>
//         <div className="dropdown-menu" aria-labelledby="navbarDropdown">
//           <NavLink to="#" className="dropdown-item">
//             account
//           </NavLink>
//           <NavLink to="#" className="dropdown-item">
//             orders
//           </NavLink>
//           <NavLink to="#" onClick={handleClick} className="dropdown-item">
//             sign out
//           </NavLink>
//         </div>
//       </div>
//     </div>
//   ) : (
//     <div>
//       <NavLink to="/login">Login</NavLink>
//       <NavLink to="/signup">Sign Up</NavLink>
//     </div>
//   )
// }
