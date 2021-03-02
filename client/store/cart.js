import axios from 'axios'
import history from '../history'

//ACTION TYPES
const CREATE_ORDER = 'CREATE_ORDER'
const UPDATE_ORDER = 'UPDATE_ORDER'

//INITIAL STATE
const initialCart = {}

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

//THUNK CREATORS
const createOrder = (order, history) => {
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

const updateOrder = (order, history) => {
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

//REDUCER

export default function(state = initialCart, action) {
  switch (action.type) {
    case CREATE_ORDER:
      return action.order
    case UPDATE_ORDER:
      return action.order
    default:
      return state
  }
}
