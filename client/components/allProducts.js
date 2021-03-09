import React from 'react'
import {connect} from 'react-redux'
import {setProducts} from '../store/products'
import {Link} from 'react-router-dom'
import PaginationControls from './paginationControls'

export class AllProducts extends React.Component {
  constructor() {
    super()
    this.isInStock = this.isInStock.bind(this)
  }
  async componentDidMount() {
    await this.props.getMyProducts(this.props.location.search)
  }
  isInStock(product) {
    if (product.stock <= 0) {
      return 'Out Of Stock'
    }
  }
  render() {
    const products = this.props.products
    console.log(this.props.location.search)
    if (!this.props.location.search) {
      this.props.location.search = '?size=12&page=1'
    }
    if (this.props.loading === false) {
      return (
        <div>
          <div className="d-flex justify-content-between">
            <h1>All Products</h1>
            <div>
              <a href={process.env}>12</a>
            </div>
          </div>
          <div className="container">
            <div className="row row-cols-2 g-2 g-lg-2">
              {products.map(product => (
                <div key={product.id} className="col p-2">
                  <div className="card">
                    <div className="card-body">
                      <a href={`/products/${product.id}`}>
                        <img
                          className="card-img-top"
                          src="https://i.imgur.com/3jnETNw.png"
                          alt="Card image cap"
                        />
                        <h1 className="card-title">{product.name}</h1>
                      </a>
                      <h2>${product.price}</h2>
                      <h2 className="out-of-stock">
                        {this.isInStock(product)}
                      </h2>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <PaginationControls
              location={this.props.location}
              count={this.props.count}
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
    products: state.products.products,
    loading: state.products.loading,
    count: state.products.count
  }
}

const mapDispatch = dispatch => {
  return {
    getMyProducts: query => dispatch(setProducts(query))
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
