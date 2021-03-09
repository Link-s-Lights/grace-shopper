import React from 'react'
import {connect} from 'react-redux'
import {getSingleProduct} from '../store/singleProduct'
import {addToCart, saveCart} from '../store/cart'

export class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.handleAdd = this.handleAdd.bind(this)
    this.isInStock = this.isInStock.bind(this)
    this.updateQty = this.updateQty.bind(this)
    this.state = {qty: 1}
  }
  async componentDidMount() {
    await this.props.getMySingleProduct(this.props.match.params)
  }
  async handleAdd() {
    try {
      this.props.addToCart(this.props.singleProduct)
      await saveCart()
    } catch (err) {
      console.error(err)
    }
  }
  updateQty(evt) {
    const qty = evt.target.value
    this.setState({qty: parseInt(qty, 10)})
  }
  isInStock() {
    return this.product.stock > 0
  }
  render() {
    if (this.props.loading === false) {
      const product = this.props.singleProduct
      const {name, description, attributes, imageUrl, price, stock} = product
      return (
        <div className="jumbotron d-flex flex-row bd-highlight mb-3">
          <div className="m-2">
            <img src={imageUrl} className="rounded productImg" />
          </div>

          <div className="m-2">
            <h1>{name}</h1>
            <p>{description}</p>
            <ul>
              {attributes.map(attribute => (
                <li key={attribute.id}>
                  {attribute.name}: {attribute.productAttribute.value}
                </li>
              ))}
            </ul>
            <h2>
              {price.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD'
              })}
            </h2>
            {/* <h2>Stock: {product.stock}</h2> */}

            {stock > 0 ? (
              <div className="addToCartDiv">
                <h2>Qty: </h2>
                <h2>
                  <select
                    className="formControl"
                    value={this.state.qty}
                    onChange={this.updateQty}
                  >
                    {Array(Math.min(10, stock))
                      .fill(1)
                      .map((x, i) => (
                        <option value={i + x} key={i}>
                          {i + x}
                        </option>
                      ))}
                  </select>
                </h2>
                <button
                  onClick={this.handleAdd}
                  className="btn btn-warning btn-lg"
                  type="button"
                >
                  Add to cart
                </button>
              </div>
            ) : (
              <h2>Out of Stock</h2>
            )}

            <br />
            {this.props.userType === 'admin' ? (
              <a
                href={this.props.location.pathname + '/edit'}
                className="btn btn-warning btn-lg"
              >
                Edit
              </a>
            ) : (
              ''
            )}
          </div>
        </div>
      )
    } else {
      return <div>Loading</div>
    }
  }
}

const mapState = state => {
  return {
    singleProduct: state.singleProduct.singleProduct,
    loading: state.singleProduct.loading,
    userType: state.user.type
  }
}

const mapDispatch = dispatch => {
  return {
    getMySingleProduct: singleProduct =>
      dispatch(getSingleProduct(singleProduct)),
    addToCart: product => dispatch(addToCart(product))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
