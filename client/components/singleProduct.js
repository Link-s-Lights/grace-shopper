import React from 'react'
import {connect} from 'react-redux'
import {getSingleProduct} from '../store/singleProduct'
import {addToCart} from '../store/cart'

export class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.handleAdd = this.handleAdd.bind(this)
    this.isInStock = this.isInStock.bind(this)
  }
  async componentDidMount() {
    await this.props.getMySingleProduct(this.props.match.params)
  }
  handleAdd() {
    this.props.addToCart(this.props.singleProduct)
    this.props.history.push('/cart')
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
          <button onClick={this.handleAdd} className="btn btn-info btn-lg">
            Add to cart
          </button>
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
    loading: state.singleProduct.loading
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
