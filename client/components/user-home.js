import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import UserForm from './userForm'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, fname, lname, imageUrl} = props.user

  return (
    <div>
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-md-auto d-flex align-items-center">
            <img src={imageUrl} className="img-fluid rounded profile-img" />
          </div>
          <div className="col-md-auto d-flex align-items-center">
            <div>
              <h1>Welcome {fname + ' ' + lname}</h1>
            </div>
            <div>
              <button
                className="btn btn-secondary mx-3"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#userForm"
                aria-expanded="false"
                aria-controls="userForm"
              >
                Edit
              </button>
            </div>
          </div>
          <div className="collapse" id="userForm">
            <UserForm title="Edit User" user={props.user} />
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
