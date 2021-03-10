import React, {useState} from 'react'
import {connect} from 'react-redux'
import {getSingleProduct} from '../store/singleProduct'
import {addToCart, saveCart} from '../store/cart'
import AddItemToast from './Toast'

export class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.handleAdd = this.handleAdd.bind(this)
    this.isInStock = this.isInStock.bind(this)
    this.updateQty = this.updateQty.bind(this)
    this.setShow = this.setShow.bind(this)
    this.state = {qty: 1, show: false}
  }

  // Get rid of async/await
  async componentDidMount() {
    await this.props.getMySingleProduct(this.props.match.params)
  }

  // Get rid of async/await
  async handleAdd() {
    try {
      console.log('qty to add: ', this.state.qty)
      this.props.addToCart(this.props.singleProduct, this.state.qty)
      this.setShow()
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
  setShow() {
    this.setState({show: !this.state.show})
  }
  render() {
    if (this.props.loading === false) {
      const product = this.props.singleProduct
      const {name, description, attributes, imageUrl, price, stock} = product
      return (
        <div className="position-relative">
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
                    className="btn btn-primary btn-lg"
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
                  className="btn btn-primary btn-lg"
                >
                  Edit
                </a>
              ) : (
                ''
              )}
            </div>
            <AddItemToast
              name={name}
              show={this.state.show}
              setShow={this.setShow}
            />
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
    addToCart: (product, qty) => dispatch(addToCart(product, qty))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
