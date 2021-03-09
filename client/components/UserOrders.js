import React from 'react'
import {connect} from 'react-redux'
import {getOrders} from '../store/orders'
import OrderDetails from './OrderDetails'

class UserOrders extends React.Component {
  constructor(props) {
    super(props)
  }
  getCost(order) {
    const subtotal = order.products.reduce(
      (acc, product) => acc + product.orderProduct.subtotal,
      0
    )
    return subtotal + order.tax + order.shippingCost
  }
  componentDidMount() {
    this.props.getOrders()
  }
  render() {
    const {loading, orders} = this.props
    if (!loading) {
      return (
        <div>
          <table className="table table-hover">
            <tbody>
              <tr>
                <th>Order Id</th>
                <th>Status</th>
                <th>Total Cost</th>
                <th />
              </tr>
              {orders.map(order => (
                <OrderDetails order={order} key={order.id} />
              ))}
            </tbody>
          </table>
        </div>
      )
    } else {
      return <div>Loading</div>
    }
  }
}

const mapState = state => ({
  loading: state.orders.loading,
  orders: state.orders.orders
})
const mapDispatch = dispatch => ({
  getOrders: () => dispatch(getOrders())
})

export default connect(mapState, mapDispatch)(UserOrders)
