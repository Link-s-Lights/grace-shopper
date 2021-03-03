import React from 'react'
import {connect} from 'react-redux'
import {getSingleProduct} from '../store/singleProduct'

export class SingleProduct extends React.Component {
  async componentDidMount() {
    await this.props.getMySingleProduct(this.props.match.params)
  }
  render() {
    const product = this.props.singleProduct
    return (
      <div>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <h2>${product.price}</h2>
        <h2>Stock: {product.stock}</h2>
        <button>Add to cart</button>
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
      dispatch(getSingleProduct(singleProduct))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
