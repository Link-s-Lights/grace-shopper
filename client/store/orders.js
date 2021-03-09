import axios from 'axios'

const SET_ORDERS = 'SET_ORDERS'
const CLEAR_ORDERS = 'CLEAR_ORDERS'

const initialState = {loading: true, orders: []}

const setOrders = orders => ({
  type: SET_ORDERS,
  orders
})

export const clearOrders = () => ({
  type: CLEAR_ORDERS
})

export const getOrders = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/user/orders')
      dispatch(setOrders(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ORDERS:
      return {loading: false, orders: action.orders}
    case CLEAR_ORDERS:
      return initialState
    default:
      return state
  }
}
