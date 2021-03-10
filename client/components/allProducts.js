import React from 'react'
import {connect} from 'react-redux'
import {setProducts} from '../store/products'
import {Link} from 'react-router-dom'
import PaginationControls from './paginationControls'
import FilterForm from './FilterForm'
import {addToCart, saveCart} from '../store/cart'
import AddItemToast from './Toast'

export class AllProducts extends React.Component {
  constructor() {
    super()
    this.isInStock = this.isInStock.bind(this)
    this.checkPathAndRedirect = this.checkPathAndRedirect.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.setShow = this.setShow.bind(this)
    this.state = {qty: 1, show: false, name: ''}
  }

  async componentDidMount() {
    this.checkPathAndRedirect()
    await this.props.getMyProducts(this.props.location.search)
  }

  async handleAdd(product) {
    try {
      this.props.addToCart(product, this.state.qty)

      this.setShow(product.name)
      await saveCart()
    } catch (err) {
      console.error(err)
    }
  }

  setShow(name = '') {
    this.setState({show: !this.state.show, name: name})
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.search !== this.props.location.search) {
      this.props.getMyProducts(this.props.location.search)
    }
  }

  isInStock(product) {
    if (product.stock <= 0) {
      return 'Out Of Stock'
    }
  }

  checkPathAndRedirect() {
    if (!this.props.location.search) {
      let currentUrlParams = new URLSearchParams(this.props.location.search)
      currentUrlParams.append('page', 1)
      currentUrlParams.append('size', 12)
      this.props.history.push(
        window.location.pathname + '?' + currentUrlParams.toString()
      )
    }
  }

  updateUrlParams(key, value) {
    let currentUrlParams = new URLSearchParams(this.props.location.search)
    currentUrlParams.set(key, value)
    return window.location.pathname + '?' + currentUrlParams.toString()
  }

  render() {
    const products = this.props.products
    const currentUrlParams = new URLSearchParams(this.props.location.search)

    if (this.props.loading === false) {
      return (
        <div className="position-relative">
          <div className="d-flex justify-content-between align-items-center mt-2">
            <h1>All Products</h1>
            <div className="d-flex align-items-center">
              <div>
                View:
                <a
                  href={this.updateUrlParams('size', 12)}
                  className="link-primary m-2"
                >
                  12
                </a>
                <a
                  href={this.updateUrlParams('size', 24)}
                  className="link-primary m-2"
                >
                  24
                </a>
                <a
                  href={this.updateUrlParams('size', 48)}
                  className="link-primary m-2"
                >
                  48
                </a>
              </div>
              <button
                className="btn btn-sm btn-secondary mx-3"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#filterForm"
                aria-expanded="false"
                aria-controls="filterForm"
              >
                <i className="bi-filter" />
              </button>
            </div>
          </div>

          <div className="collapse" id="filterForm">
            <FilterForm title="Filter Products" {...this.props} />
          </div>

          <div className="container">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-2 g-lg-2">
              {products.map(product => (
                <div key={product.id} className="col p-2">
                  <div className="card">
                    <div className="card-body">
                      <Link to={`/products/${product.id}`}>
                        <img
                          className="card-img-top item_image"
                          src={product.imageUrl}
                          alt="Card image cap"
                        />
                        <h1 className="card-title">{product.name}</h1>
                      </Link>
                      <div className="d-flex justify-content-between">
                        <h2>${product.price}</h2>
                        <button
                          onClick={() => this.handleAdd(product)}
                          className="btn btn-primary btn-sm"
                          type="button"
                        >
                          Add to cart
                        </button>
                      </div>
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
              size={currentUrlParams.get('size')}
            />
          </div>
          <AddItemToast
            name={this.state.name}
            show={this.state.show}
            setShow={this.setShow}
          />
        </div>
      )
    } else {
      return (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary m-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )
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
    getMyProducts: query => dispatch(setProducts(query)),
    addToCart: (product, qty) => dispatch(addToCart(product, qty))
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
