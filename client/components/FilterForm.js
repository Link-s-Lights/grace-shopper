import React from 'react'
import {connect} from 'react-redux'
import {putUser} from '../store/user'

const INITIAL_STATE = {
  sortColumn: 'id',
  direction: true,
  showOutOfStock: true
}

class FilterForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = INITIAL_STATE

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    const {type, id, name, value} = event.target

    switch (type) {
      case 'radio':
        this.setState({
          [name]: id
        })
        break
      case 'checkbox':
        this.setState(prevState => ({
          [name]: !prevState[name]
        }))
        break
      default:
        this.setState({
          [name]: value
        })
        break
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    const currentUrlParams = new URLSearchParams(this.props.location.search)
    Object.entries(this.state).forEach(pair => {
      if (pair[0] === 'direction') {
        pair[1] = pair[1] ? 'ASC' : 'DESC'
      }
      !currentUrlParams.has(pair[0])
        ? currentUrlParams.append(...pair)
        : currentUrlParams.set(...pair)
    })
    this.props.history.push(
      window.location.pathname + '?' + currentUrlParams.toString()
    )
  }

  render() {
    const state = this.state
    return (
      <div className="card mt-3">
        <div className="card-header">
          <h5 className="card-title">Filter Products</h5>
        </div>
        <div className="card-body">
          <form onSubmit={this.handleSubmit}>
            <div className="row mb-3">
              <div id="sortBy">
                Sort By:
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="sortColumn"
                    id="name"
                    value={state.sortColumn}
                    onChange={this.handleChange}
                  />
                  <label className="form-check-label" htmlFor="name">
                    Name
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="sortColumn"
                    id="price"
                    value={state.sortColumn}
                    onChange={this.handleChange}
                  />
                  <label className="form-check-label" htmlFor="price">
                    Price
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="btn-check"
                    type="checkbox"
                    name="direction"
                    id="direction"
                    value={state.direction}
                    onChange={this.handleChange}
                  />
                  <label className="btn btn-primary" htmlFor="direction">
                    {this.state.direction ? (
                      <i className="bi-sort-down-alt" />
                    ) : (
                      <i className="bi-sort-down" />
                    )}
                  </label>
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <div id="filterBy">Filter By:</div>
            </div>
            <div className="row mb-3">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="showOutOfStock"
                  id="showOutOfStock"
                  value={state.showOutOfStock}
                  onChange={this.handleChange}
                  checked={
                    this.state.showOutOfStock || this.props.showOutOfStock
                  }
                />
                <label className="form-check-label" htmlFor="showOutOfStock">
                  Show Out Of Stock Items
                </label>
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

export default connect(null, mapDispatch)(FilterForm)
