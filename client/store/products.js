import axios from 'axios'
import history from '../history'

//ACTIONS TYPES
const SET_PRODUCTS = 'SET_PRODUCTS'
const CREATE_PRODUCT = 'CREATE_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'

//INITIAL STATE
const initialState = {loading: true, products: []}

//ACTION CREATORS
const getActionProducts = products => {
  return {
    type: SET_PRODUCTS,
    products
  }
}

const createActionProduct = product => {
  return {
    type: CREATE_PRODUCT,
    product
  }
}

const deleteActionProduct = product => {
  return {
    type: DELETE_PRODUCT,
    product
  }
}

//THUNK CREATORS

export const setProducts = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products')
      dispatch(getActionProducts(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const createProduct = (product, history) => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/products', product)
      dispatch(createActionProduct(data))
      history.push('/products')
    } catch (err) {
      console.log(err)
    }
  }
}

export const deleteProduct = (product, history) => {
  return async dispatch => {
    try {
      await axios.delete(`/api/products/${product.id}`, product)
      dispatch(deleteActionProduct(product))
      history.push('/products')
    } catch (err) {
      console.log(err)
    }
  }
}
//REDUCER

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      // return action.products
      return {...state, loading: false, products: action.products}
    case CREATE_PRODUCT:
      // return [...state, action.product]
      return {...state, loading: false, product: action.product}
    case DELETE_PRODUCT:
      // return state.filter((product) => product.id !== action.product.id)
      return {
        ...state,
        loading: false,
        products: state.filter(product => product.id !== action.product.id)
      }
    default:
      return state
  }
}
