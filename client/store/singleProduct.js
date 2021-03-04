import axios from 'axios'
import history from '../history'

//ACTION TYPES
const SET_SINGLE_PRODUCT = 'SET_SINGLE_PRODUCT'

//INITIAL STATE
const defaultSingleProduct = {loading: true, singleProduct: {}}

//ACTION CREATORS
const setActionSingleProduct = product => {
  return {
    type: SET_SINGLE_PRODUCT,
    product
  }
}

//THUNK CREATORS
export const getSingleProduct = product => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products/${product.id}`)
      dispatch(setActionSingleProduct(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const updateProduct = (product, history) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/products/${product.id}`, product)
      dispatch(setActionSingleProduct(data))
      history.push(`/products/${product.id}`)
    } catch (err) {
      console.log(err)
    }
  }
}

//REDUCER

export default function(state = defaultSingleProduct, action) {
  switch (action.type) {
    case SET_SINGLE_PRODUCT:
      return {...state, loading: false, singleProduct: action.product}
    default:
      return state
  }
}
