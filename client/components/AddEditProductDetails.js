import React from 'react'
import {connect} from 'react-redux'
import {updateProduct, getSingleProduct} from '../store/singleProduct'

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
  async handleSubmit(evt) {
    evt.preventDefault()
    try {
      await this.props.updateProduct(this.state)
    } catch (err) {
      console.error(err)
    }
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
    const {handleChange, handleSubmit, addAttribute} = this
    const {name, description, imageUrl, attributes, stock, price} = this.state
    return (
      <form id="product_form" onSubmit={handleSubmit}>
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
                />
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <label htmlFor="[&quot;description&quot;]">Description:</label>
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <textarea
                  name="[&quot;description&quot;]"
                  onChange={handleChange}
                  value={description}
                  rows="5"
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
                />
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <a onClick={addAttribute}>Add attribute</a>
              </td>
            </tr>
            <tr>
              <td>Attribute</td>
              <td>Value</td>
            </tr>
            {attributes.map((attribute, idx) => (
              <tr key={attribute.id}>
                <td>
                  <input
                    name={`["attribute", ${idx}]`}
                    onChange={handleChange}
                    value={attribute.name}
                  />
                </td>
                <td>
                  <input
                    name={`["value", ${idx}]`}
                    onChange={handleChange}
                    value={attribute.productAttribute.value}
                  />
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="2">
                <button type="submit">Submit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    )
  }
}

const mapState = state => ({
  product: state.singleProduct.singleProduct
})
const mapDispatch = (dispatch, {history}) => ({
  getMySingleProduct: singleProduct =>
    dispatch(getSingleProduct(singleProduct)),
  updateProduct: product => dispatch(updateProduct(product, history))
})

export default connect(mapState, mapDispatch)(AddEditProduct)
