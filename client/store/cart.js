/* eslint-disable no-case-declarations */
/* eslint-disable complexity */
import axios from 'axios'
import history from '../history'
import store from './index'

//ACTION TYPES
const CREATE_ORDER = 'CREATE_ORDER'
const UPDATE_ORDER = 'UPDATE_ORDER'
const ADD_TO_CART = 'ADD_TO_CART'
const EMPTY_CART = 'EMPTY_CART'
const REMOVE_ITEM = 'REMOVE_ITEM'
const UPDATE_QTY = 'UPDATE_QTY'
const LOAD_CART = 'LOAD_CART'

//INITIAL STATE
const initialCart = {
  status: 'cart',
  lineItems: []
}

//ACTION CREATORS
const createActionOrder = order => {
  return {
    type: CREATE_ORDER,
    order
  }
}

const updateActionOrder = order => {
  return {
    type: UPDATE_ORDER,
    order
  }
}

export const addToCart = (product, qty) => ({
  type: ADD_TO_CART,
  product,
  qty
})

export const emptyCart = () => {
  // window.localStorage.removeItem('cart')
  // return {type: EMPTY_CART}
  return {
    type: EMPTY_CART
  }
}

export const removeItem = idx => ({
  type: REMOVE_ITEM,
  idx
})

export const updateQty = (idx, qty) => ({
  type: UPDATE_QTY,
  idx,
  qty
})

export const loadCart = cart => ({
  type: LOAD_CART,
  cart
})

//THUNK CREATORS
export const getCart = () => {
  return async dispatch => {
    try {
      const {user} = store.getState()
      // const user = {}
      // let data = {}
      const userCart = user.id
        ? (await axios.get('/api/orders/cart')).data
        : {lineItems: []}
      const localCart = JSON.parse(window.localStorage.getItem('cart')) || {
        lineItems: []
      }
      const lineItems = [
        ...localCart.lineItems.filter(item =>
          userCart.lineItems.every(product => product.id !== item.id)
        ),
        ...userCart.lineItems
      ]
      const cart = {...userCart, lineItems}
      dispatch(loadCart(cart))
    } catch (err) {
      console.error(err)
    }
  }
}
export const createOrder = (order, history) => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/orders', order)
      dispatch(createActionOrder(data))
      history.push('/orders')
    } catch (err) {
      console.log(err)
    }
  }
}

export const updateOrder = (order, history) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/orders/${order.id}`, order)
      dispatch(updateActionOrder(data))
      history.push(`/orders/${order.id}`)
    } catch (err) {
      console.log(err)
    }
  }
}

export const saveCart = async () => {
  const {user, cart} = store.getState()
  if (user.id) {
    try {
      console.log('saving to user profile')
      await axios.put(`/api/orders/cart`, cart)
    } catch (err) {
      console.log(err)
    }
  }
  console.log('saving to local storage')
  window.localStorage.setItem('cart', JSON.stringify(cart))
}

export const submitOrder = order => {
  return async dispatch => {
    try {
      await axios.put('api/orders/checkout')
      dispatch(emptyCart())
      history.push(`/orderSubmission`)
    } catch (err) {
      console.log(err)
    }
  }
}

//REDUCER

export default function(state = initialCart, action) {
  switch (action.type) {
    case LOAD_CART:
      return {
        ...state,
        ...action.cart
      }
    case CREATE_ORDER:
      return action.order
    case UPDATE_ORDER:
      return action.order
    case ADD_TO_CART:
      let i = state.lineItems.findIndex(item => {
        return item.id === action.product.id
      })
      if (i === -1) {
        return {
          ...state,
          lineItems: [...state.lineItems, {...action.product, qty: action.qty}]
        }
      } else {
        let updatedLineItems = state.lineItems
        updatedLineItems[i].qty = Math.min(
          action.qty + updatedLineItems[i].qty,
          action.product.stock
        )
        return {...state, lineItems: updatedLineItems}
      }
    case EMPTY_CART:
      console.log('emptying empty cart')
      window.localStorage.removeItem('cart')
      return initialCart
    case REMOVE_ITEM:
      let splicedArray = state.lineItems
      splicedArray.splice(action.idx, 1)
      return {
        ...state,
        lineItems: splicedArray
      }
    case UPDATE_QTY:
      let newLineItems = [...state.lineItems]
      newLineItems[action.idx].qty = action.qty
      return {...state, lineItems: newLineItems}
    default:
      return state
  }
}
