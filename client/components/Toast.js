import React from 'react'
import {Toast} from 'react-bootstrap'

const AddItemToast = props => {
  const {show, setShow, name} = props
  return (
    <Toast
      onClick={() => setShow(false)}
      show={show}
      delay={3000}
      autohide
      style={{
        position: 'absolute',
        top: 0,
        right: 0
      }}
    >
      <Toast.Body>{name} has been added to your cart</Toast.Body>
    </Toast>
  )
}

export default AddItemToast
