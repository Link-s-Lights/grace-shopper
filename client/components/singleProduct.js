import React from 'react'
import {connect} from 'react-redux'
import {getSingleProduct} from '../store/singleProduct'
import {addToCart, saveCart} from '../store/cart'

export class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.handleAdd = this.handleAdd.bind(this)
    this.isInStock = this.isInStock.bind(this)
  }

  // Get rid of async/await
  async componentDidMount() {
    await this.props.getMySingleProduct(this.props.match.params)
  }

  // Get rid of async/await
  async handleAdd() {
    try {
      this.props.addToCart(this.props.singleProduct)
      await saveCart()
      this.props.history.push('/cart')
    } catch (err) {
      console.error(err)
    }
  }

  isInStock(product) {
    if (product.stock <= 0) {
      return 'Out Of Stock'
    }
  }
  render() {
    if (this.props.loading === false) {
      const product = this.props.singleProduct
      return (
        <div className="jumbotron">
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <h2>${product.price}</h2>
          {/* <h2>Stock: {product.stock}</h2> */}
          <h2>{this.isInStock(product)}</h2>
          <button onClick={this.handleAdd} className="btn btn-primary btn-lg">
            Add to cart
          </button>
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
