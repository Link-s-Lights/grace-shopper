import React from 'react'
import {Link} from 'react-router-dom'

export const OrderDetails = props => {
  const {line1, line2, city, state, zip} = props.order.shippingAddress
  const {id, status} = props.order
  let formatPrice = price =>
    price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    })
  let subtotal = props.order.products.reduce(
    (acc, product) => acc + product.orderProduct.subtotal,
    0
  )
  const products = props.order.products.map(product => {
    const qty = product.orderProduct.qty
    const subtotal = formatPrice(product.orderProduct.subtotal)
    const price = formatPrice(product.orderProduct.subtotal / qty)
    return {
      name: product.name,
      id: product.id,
      qty,
      price,
      subtotal
    }
  })
  const total = formatPrice(
    subtotal + props.order.tax + props.order.shippingCost
  )
  subtotal = formatPrice(subtotal)
  const tax = formatPrice(props.order.tax)
  const shippingCost = formatPrice(props.order.shippingCost)
  return (
    <React.Fragment>
      <tr>
        <td>{id}</td>
        <td>{status}</td>
        <td>{total}</td>
        <td>
          <button
            className="btn btn-secondary mx-3"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#order${id}`}
            aria-expanded="false"
            aria-controls="userForm"
          >
            Expand
          </button>
        </td>
      </tr>
      <tr>
        <td colSpan="4">
          <div className="collapse" id={`order${id}`}>
            <h5>Shipped To:</h5>
            <h6>{line1}</h6>
            {line2 ? <h6>{line2}</h6> : ''}
            <h6>
              {city}, {state} {zip}
            </h6>
            <table className="table table-hover">
              <tbody>
                <tr>
                  <th>Product Name</th>
                  <th className="text-end">Qty</th>
                  <th className="text-end">Price</th>
                  <th className="text-end">Total</th>
                </tr>
                {products.map(product => (
                  <tr key={product.id}>
                    <td>
                      <Link to={`/products/${product.id}`}>{product.name}</Link>
                    </td>
                    <td className="text-end">{product.qty}</td>
                    <td className="text-end">{product.price}</td>
                    <td className="text-end">{product.subtotal}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="2" />
                  <td className="text-end">subtotal:</td>
                  <td className="text-end">{subtotal}</td>
                </tr>
                <tr>
                  <td colSpan="2" />
                  <td className="text-end">tax:</td>
                  <td className="text-end">{tax}</td>
                </tr>
                <tr>
                  <td colSpan="2" />
                  <td className="text-end">shipping & handling:</td>
                  <td className="text-end">{shippingCost}</td>
                </tr>
                <tr>
                  <td colSpan="2" />
                  <td className="text-end">order total:</td>
                  <td className="text-end">{total}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </td>
      </tr>
    </React.Fragment>
  )
}

export default OrderDetails
