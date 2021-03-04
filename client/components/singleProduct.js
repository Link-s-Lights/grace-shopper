import React from 'react'
import {connect} from 'react-redux'
import {getSingleProduct} from '../store/singleProduct'
import {addToCart} from '../store/cart'

export class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.handleAdd = this.handleAdd.bind(this)
  }
  async componentDidMount() {
    await this.props.getMySingleProduct(this.props.match.params)
  }
  handleAdd() {
    this.props.addToCart(this.props.singleProduct)
    this.props.history.push('/cart')
  }
  render() {
    console.log('SINGLE P PROPS', this.props.singleProduct)
    const product = this.props.singleProduct
    return (
      <div>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <h2>${product.price}</h2>
        <h2>Stock: {product.stock}</h2>
        <button onClick={this.handleAdd}>Add to cart</button>
      </div>
    )
  }
}

const mapState = state => {
  return {
    singleProduct: state.singleProduct
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
