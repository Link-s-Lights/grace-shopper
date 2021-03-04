import React from 'react'
import {connect} from 'react-redux'
import {setProducts} from '../store/products'
import {Link} from 'react-router-dom'

export class AllProducts extends React.Component {
  async componentDidMount() {
    await this.props.getMyProducts()
  }
  render() {
    const productsArray = this.props.products
    if (this.props.loading === false) {
      return (
        <div>
          <h1>All Products</h1>
          <div>
            {productsArray.map(product => {
              return (
                <div key={product.id}>
                  <Link to={`/products/${product.id}`}>
                    <h1>{product.name}</h1>
                  </Link>
                  <p>{product.description}</p>
                  <h2>${product.price}</h2>
                  <h2>Stock: {product.stock}</h2>
                </div>
              )
            })}
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
    products: state.products.products,
    loading: state.products.loading
  }
}

const mapDispatch = dispatch => {
  return {
    getMyProducts: () => dispatch(setProducts())
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
