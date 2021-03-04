import React from 'react'
import {connect} from 'react-redux'
import {
  updateOrder,
  createOrder,
  saveCart,
  updateQty,
  removeItem
} from '../store/cart'

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
  componentDidMount() {
    this.saveCart()
  }

  render() {
    const {lineItems} = this.props.cart
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
                    {selectArray.map((x, i) => (
                      <option value={x} key={i}>
                        {x}
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
        Subtotal:{' '}
        {lineItems.reduce((acc, item) => acc + item.qty * item.price, 0)}
      </div>
    )
  }
}

const mapState = state => ({
  cart: state.cart
})
const mapDispatch = dispatch => ({
  updateCart: cart => dispatch(updateOrder(cart)),
  submitCart: () => dispach(submitCart(cart)),
  updateQty: (idx, qty) => dispatch(updateQty(idx, qty)),
  removeItem: idx => dispatch(removeItem(idx))
})

export default connect(mapState, mapDispatch)(Cart)
