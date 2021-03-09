import React from 'react'
import {connect} from 'react-redux'
import {updateProduct, getSingleProduct} from '../store/singleProduct'
import {deleteProduct} from '../store/products'

class AddEditProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      description: '',
      imageUrl: '',
      attributes: [],
      new: true,
      stock: 0,
      price: 0.0
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.addAttribute = this.addAttribute.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.removeAttribute = this.removeAttribute.bind(this)
  }
  handleChange(evt) {
    console.log(evt.target.name)
    let [name, idx] = JSON.parse(evt.target.name)
    const {value} = evt.target
    let newAttributes = [...this.state.attributes]
    switch (name) {
      case 'attribute':
        newAttributes[idx].name = value
        this.setState({attributes: newAttributes})
        break
      case 'value':
        newAttributes[idx].productAttribute.value = value
        this.setState({attributes: newAttributes})
        break
      default:
        this.setState({
          [name]: evt.target.value
        })
        break
    }
  }
  addAttribute() {
    let newAttributes = [
      ...this.state.attributes,
      {name: '', productAttribute: {value: ''}}
    ]
    this.setState({attributes: newAttributes})
  }
  removeAttribute(idx) {
    let newAttributes = [...this.state.attributes]
    newAttributes.splice(idx, 1)
    this.setState({attributes: newAttributes})
  }
  handleSubmit(evt) {
    evt.preventDefault()
    this.props.updateProduct(this.state)
  }
  handleDelete() {
    this.props.deleteProduct(this.props.product)
  }
  async componentDidMount() {
    const {id} = this.props.match.params
    if (id) {
      try {
        await this.props.getMySingleProduct(this.props.match.params)
        this.setState({...this.props.product, new: false})
      } catch (err) {
        console.error(err)
      }
    }
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.product && this.props.product) {
      this.setState({...this.props.product, new: false})
    }
  }

  render() {
    const {
      handleChange,
      handleSubmit,
      addAttribute,
      handleDelete,
      removeAttribute
    } = this
    const {name, description, imageUrl, attributes, stock, price} = this.state
    return (
      <div className="align-items-center maxWidth">
        <form
          id="product_form"
          onSubmit={handleSubmit}
          className="align-items-center"
        >
          <table>
            <tbody>
              <tr>
                <td>
                  <label htmlFor="[&quot;name&quot;]">Product Name:</label>
                </td>
                <td>
                  <input
                    name="[&quot;name&quot;]"
                    onChange={handleChange}
                    value={name}
                    className="form-control"
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <label htmlFor="[&quot;description&quot;]">
                    Description:
                  </label>
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <textarea
                    name="[&quot;description&quot;]"
                    onChange={handleChange}
                    value={description}
                    rows="5"
                    className="form-control maxWidth"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="[&quot;imageUrl&quot;]">Image URL:</label>
                </td>
                <td>
                  <input
                    name="[&quot;imageUrl&quot;]"
                    onChange={handleChange}
                    value={imageUrl}
                    className="form-control"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="[&quot;stock&quot;]">Stock:</label>
                </td>
                <td>
                  <input
                    name="[&quot;stock&quot;]"
                    onChange={handleChange}
                    value={stock}
                    className="form-control"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="[&quot;price&quot;]">Price</label>
                </td>
                <td>
                  <input
                    name="[&quot;price&quot;]"
                    onChange={handleChange}
                    value={price}
                    className="form-control"
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <a
                    role="button"
                    onClick={addAttribute}
                    className="btn btn-link"
                  >
                    Add attribute
                  </a>
                </td>
              </tr>
              <tr>
                <td>Attribute</td>
                <td>Value</td>
              </tr>
              {attributes.map((attribute, idx) => (
                <tr key={idx}>
                  <td>
                    <input
                      name={`["attribute", ${idx}]`}
                      onChange={handleChange}
                      value={attribute.name}
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      name={`["value", ${idx}]`}
                      onChange={handleChange}
                      value={attribute.productAttribute.value}
                      className="form-control"
                    />
                  </td>
                  <td>
                    <a
                      role="button"
                      onClick={() => removeAttribute(idx)}
                      className="btn btn-danger"
                    >
                      X
                    </a>
                  </td>
                </tr>
              ))}
              <tr>
                <td>
                  {this.props.product.id ? (
                    <button
                      type="button"
                      onClick={handleDelete}
                      className="btn btn-primary btn-lg maxWidth"
                    >
                      Delete Product
                    </button>
                  ) : (
                    ''
                  )}
                </td>
                <td>
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg maxWidth"
                  >
                    Submit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    )
  }
}

const mapState = state => ({
  product: state.singleProduct.singleProduct
})
const mapDispatch = (dispatch, {history}) => ({
  getMySingleProduct: singleProduct =>
    dispatch(getSingleProduct(singleProduct)),
  updateProduct: product => dispatch(updateProduct(product, history)),
  deleteProduct: product => dispatch(deleteProduct(product, history))
})

export default connect(mapState, mapDispatch)(AddEditProduct)
