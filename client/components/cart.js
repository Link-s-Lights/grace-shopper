import React from 'react'
import {connect} from 'react-redux'
import {saveCart, updateQty, removeItem, submitOrder} from '../store/cart'
import {Link} from 'react-router-dom'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.updateQty = this.updateQty.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  // Get it outta here (async/await that is)
  updateQty(evt) {
    const {id, value} = evt.target
    this.props.updateQty(id, parseInt(value, 10))
    saveCart()
  }

  handleRemove(evt) {
    const {id} = evt.target
    this.props.removeItem(id)
    saveCart()
  }
  calcSubtotal() {
    return this.formatPrice(
      this.props.cart.lineItems.reduce(
        (acc, item) => acc + item.qty * item.price,
        0
      )
    )
  }
  formatPrice(price) {
    return price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    })
  }
  render() {
    const {lineItems} = this.props.cart
    const {formatPrice} = this
    const subtotal = this.calcSubtotal()
    return (
      <div>
        <table className="table table-hover">
          <tbody>
            <tr>
              <th>Product Name</th>
              <th className="text-end">Qty</th>
              <th className="text-end">Price</th>
              <th className="text-end">Total</th>
              <th className="text-end">remove</th>
            </tr>
            {lineItems.map((item, idx) => (
              <tr key={item.id}>
                <td>
                  <Link to={`/products/${item.id}`}>{item.name}</Link>
                </td>
                <td className="text-end">
                  <select id={idx} onChange={this.updateQty} value={item.qty}>
                    {Array(Math.min(Math.max(10, item.qty + 5), item.stock))
                      .fill(1)
                      .map((x, i) => (
                        <option value={i + x} key={i}>
                          {i + x}
                        </option>
                      ))}
                  </select>
                </td>
                <td className="text-end">{formatPrice(item.price)}</td>
                <td className="text-end">
                  {formatPrice(item.qty * item.price)}
                </td>
                <td className="text-end">
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
        Subtotal: {subtotal}
        <div>
          <button
            type="button"
            onClick={() => this.props.submitCart(this.props.cart)}
          >
            Checkout
          </button>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  cart: state.cart
})
const mapDispatch = dispatch => ({
  submitCart: cart => dispatch(submitOrder(cart)),
  updateQty: (idx, qty) => dispatch(updateQty(idx, qty)),
  removeItem: idx => dispatch(removeItem(idx))
})

export default connect(mapState, mapDispatch)(Cart)
