import axios from 'axios'
import history from '../history'

//ACTION TYPES
const GET_SINGLE_PRODUCT = 'GET_PRODUCT'
const UPDATE_SINGLE_PRODUCT = 'UPDATE_PRODUCT'

//INITIAL STATE
const defaultSingleProduct = {}

//ACTION CREATORS
const getActionSingleProduct = product => {
  return {
    type: GET_SINGLE_PRODUCT,
    product
  }
}

const updateActionProduct = product => {
  return {
    type: UPDATE_SINGLE_PRODUCT,
    product
  }
}

//THUNK CREATORS
export const getSingleProduct = product => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/${product.id}`)
      dispatch(updateActionProduct(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const updateProduct = (product, history) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/products/${product.id}`, product)
      dispatch(updateActionProduct(data))
      history.push(`/${product.id}`)
    } catch (err) {
      console.log(err)
    }
  }
}

//REDUCER

export default function singleProductReducer(
  state = defaultSingleProduct,
  action
) {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return {...state, singleProduct: action.product}
    default:
      return state
  }
}
