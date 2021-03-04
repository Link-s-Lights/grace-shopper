import React from 'react'
import {connect} from 'react-redux'
import {setProducts} from '../store/products'
import {Link} from 'react-router-dom'

export class AllProducts extends React.Component {
  constructor() {
    super()
    this.isInStock = this.isInStock.bind(this)
  }
  async componentDidMount() {
    await this.props.getMyProducts()
  }
  isInStock(product) {
    if (product.stock <= 0) {
      return 'Out Of Stock'
    }
  }
  render() {
    const productsArray = this.props.products
    if (this.props.loading === false) {
      return (
        <div>
          <h1>All Products</h1>
          <div className="container">
            <div className="row row-cols-3">
              {productsArray.map(product => {
                return (
                  <div key={product.id} className="col black-border">
                    <Link to={`/products/${product.id}`}>
                      <h1>{product.name}</h1>
                    </Link>
                    {/* <p>{product.description}</p> */}
                    <h2>${product.price}</h2>
                    {/* <h2>Stock: {product.stock}</h2> */}
                    <h2 className="out-of-stock">{this.isInStock(product)}</h2>
                  </div>
                )
              })}
            </div>
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
