import React from 'react'
import {connect} from 'react-redux'
import {putUser} from '../store/user'

const INITIAL_STATE = {
  fname: '',
  lname: '',
  email: ''
}

class UserForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = props.user || INITIAL_STATE

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
    this.props.putUser(this.state)
  }

  render() {
    const state = this.state
    return (
      <div className="card mt-3">
        <div className="card-header">
          <h5 className="card-title">
            {this.props.user
              ? `${this.props.user.fname}'s info`
              : 'New User Info'}
          </h5>
        </div>
        <div className="card-body">
          <form onSubmit={this.handleSubmit}>
            <div className="row mb-3">
              <div className="col">
                <input
                  type="text"
                  name="fname"
                  value={state.fname}
                  className="form-control"
                  placeholder="First name"
                  aria-label="First name"
                  onChange={this.handleChange}
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  name="lname"
                  value={state.lname}
                  className="form-control"
                  placeholder="Last name"
                  aria-label="Last name"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="email-address" className="form-label">
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={state.email}
                className="form-control"
                id="email-address"
                placeholder="name@example.com"
                onChange={this.handleChange}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary row"
              data-bs-toggle="collapse"
              data-bs-target="#userForm"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    putUser: updatedUser => dispatch(putUser(updatedUser))
  }
}

export default connect(null, mapDispatch)(UserForm)
