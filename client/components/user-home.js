import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, fname, lname, imageUrl} = props.user

  return (
    <div>
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="d-flex align-items-center">
            <img src={imageUrl} className="img-fluid rounded profile-img" />
          </div>
          <div className="d-flex flex-column justify-content-between">
            <div>
              <h1>Welcome {fname + ' ' + lname}</h1>
            </div>
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
