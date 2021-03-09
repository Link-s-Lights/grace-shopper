import React from 'react'
import {connect} from 'react-redux'

export class OrderSubmission extends React.Component {
  render() {
    return <div>Thanks for shopping with us today!</div>
  }
}

const mapState = state => {
  return {
    cart: state.cart
  }
}

const mapDispatch = () => {}

export default connect(mapState, null)(OrderSubmission)
