/* eslint-disable no-case-declarations */
/* eslint-disable complexity */
import axios from 'axios'
import history from '../history'
import store from './index'

//ACTION TYPES
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
export const addToCart = (product, qty) => ({
  type: ADD_TO_CART,
  product,
  qty
})

export const emptyCart = () => {
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

//helper function
export const saveCart = async () => {
  const {user, cart} = store.getState()
  if (user.id) {
    try {
      console.log('saving to user profile')
      await axios.put(`/api/user/cart`, cart)
    } catch (err) {
      console.error(err)
    }
  }
  console.log('saving to local storage')
  window.localStorage.setItem('cart', JSON.stringify(cart))
}

//THUNK CREATORS
export const getCart = () => {
  return async dispatch => {
    try {
      const {user} = store.getState()
      // const user = {}
      // let data = {}
      const userCart = user.id
        ? (await axios.get('/api/user/cart')).data
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
      if (localCart.lineItems.length > 0) await saveCart()
    } catch (err) {
      console.error(err)
    }
  }
}

export const submitOrder = () => {
  return async dispatch => {
    try {
      await axios.put('api/user/checkout')
      dispatch(emptyCart())
      history.push(`/orderSubmission`)
    } catch (err) {
      console.error(err)
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
