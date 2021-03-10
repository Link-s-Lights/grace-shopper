import React from 'react'
import {connect} from 'react-redux'
import {
  updateOrder,
  createOrder,
  saveCart,
  updateQty,
  removeItem,
  getCart,
  submitOrder
} from '../store/cart'
import {Link} from 'react-router-dom'
import OrderSubmission from './OrderSubmission'

let selectArray = []
for (let i = 1; i <= 10; i++) {
  selectArray.push(i)
}

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.updateQty = this.updateQty.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  // Get it outta here (async/await that is)
  async saveCart() {
    try {
      await saveCart()
    } catch (err) {
      console.error(err)
    }
  }
  updateQty(evt) {
    const {id, value} = evt.target
    this.props.updateQty(id, value)
    this.saveCart()
  }

  handleRemove(evt) {
    const {id} = evt.target
    this.props.removeItem(id)
  }
  async componentDidMount() {
    await this.props.getCart()
  }

  render() {
    const {lineItems} = this.props.cart
    console.log('STATUS', this.props.cart)
    // if (this.props.cart.status === 'cart')
    return (
      <div>
        <table className="table table-hover">
          <tbody>
            <tr>
              <th>Product Name</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
              <th>remove</th>
            </tr>
            {lineItems.map((item, idx) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>
                  <select id={idx} onChange={this.updateQty} value={item.qty}>
                    {Array(Math.min(10, item.stock))
                      .fill(1)
                      .map((x, i) => (
                        <option value={i + x} key={i}>
                          {i + x}
                        </option>
                      ))}
                  </select>
                </td>
                <td>{item.price}</td>
                <td>{item.qty * item.price}</td>
                <td>
                  <a
                    id={idx}
                    onClick={this.handleRemove}
                    className="btn btn-danger"
                  >
                    X
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        Subtotal: {/* Put calculation in helper js file */}
        {lineItems.reduce((acc, item) => acc + item.qty * item.price, 0)}
        <div>
          {/* <button
            type="button"
            onClick={() => this.props.submitCart(this.props.cart)}
            id="checkout-button"
          >
            Checkout
          </button> */}
          <OrderSubmission
            submitCart={this.props.submitCart}
            cart={this.props.cart}
          />
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  cart: state.cart
})
const mapDispatch = dispatch => ({
  updateCart: cart => dispatch(updateOrder(cart)),
  submitCart: cart => dispatch(submitOrder(cart)),
  updateQty: (idx, qty) => dispatch(updateQty(idx, qty)),
  removeItem: idx => dispatch(removeItem(idx)),
  getCart: () => dispatch(getCart())
})

export default connect(mapState, mapDispatch)(Cart)
