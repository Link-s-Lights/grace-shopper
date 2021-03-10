import axios from 'axios'
import history from '../history'

//ACTION TYPES
const SET_SINGLE_PRODUCT = 'SET_SINGLE_PRODUCT'
const ADD_PRODUCT = 'ADD_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'

//INITIAL STATE
const defaultSingleProduct = {loading: true, singleProduct: {}}

//ACTION CREATORS
const setActionSingleProduct = product => {
  return {
    type: SET_SINGLE_PRODUCT,
    product
  }
}
const addActionProduct = product => {
  return {
    type: ADD_PRODUCT,
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
      let data = {}
      if (product.new) {
        data = (await axios.post(`/api/admin/products/`, product)).data
      } else {
        data = (await axios.put(`/api/admin/products/${product.id}`, product))
          .data
      }
      history.push(`/products/${data.id}`)
    } catch (err) {
      console.error(err)
    }
  }
}

//REDUCER

export default function(state = defaultSingleProduct, action) {
  switch (action.type) {
    case SET_SINGLE_PRODUCT:
      return {...state, loading: false, singleProduct: action.product}
    case ADD_PRODUCT:
      return {...state, loading: false, singleProduct: action.product}
    case DELETE_PRODUCT:
      return defaultSingleProduct
    default:
      return state
  }
}
