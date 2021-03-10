import React from 'react'
import {connect} from 'react-redux'
import {putUser} from '../store/user'

const INITIAL_STATE = {
  fname: '',
  lname: '',
  email: '',
  shippingAddresses: [{line1: '', line2: '', city: '', state: '', zip: ''}]
}

class UserForm extends React.Component {
  constructor(props) {
    super(props)
    if (props.user) {
      this.state = {
        ...props.user,
        shippingAddresses: [
          props.user.shippingAddresses[0] || INITIAL_STATE.shippingAddresses[0]
        ]
      }
    } else {
      this.state = INITIAL_STATE
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    if (
      ['city', 'state', 'line1', 'line2', 'zip'].includes(event.target.name)
    ) {
      this.setState({
        shippingAddresses: [
          {
            ...this.state.shippingAddresses[0],
            [event.target.name]: event.target.value
          }
        ]
      })
    } else {
      this.setState({
        [event.target.name]: event.target.value
      })
    }
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
            <div className="row mb-3">
              <div className="col">
                <input
                  type="text"
                  name="line1"
                  value={state.shippingAddresses[0].line1}
                  className="form-control"
                  placeholder="Address Line 1"
                  aria-label="Address Line 1"
                  onChange={this.handleChange}
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  name="line2"
                  value={state.shippingAddresses[0].line2}
                  className="form-control"
                  placeholder="Address Line 2"
                  aria-label="Address Line 2"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col">
                <input
                  type="text"
                  name="city"
                  value={state.shippingAddresses[0].city}
                  className="form-control"
                  placeholder="City"
                  aria-label="City"
                  onChange={this.handleChange}
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  name="State"
                  value={state.shippingAddresses[0].state}
                  className="form-control"
                  placeholder="State"
                  aria-label="State"
                  onChange={this.handleChange}
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  name="Zip"
                  value={state.shippingAddresses[0].zip}
                  className="form-control"
                  placeholder="Zip"
                  aria-label="Zip"
                  onChange={this.handleChange}
                />
              </div>
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
