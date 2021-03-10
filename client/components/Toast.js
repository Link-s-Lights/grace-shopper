import React from 'react'
import {Toast} from 'react-bootstrap'

const AddItemToast = props => {
  const {show, setShow, name} = props
  return (
    <Toast
      onClose={() => setShow(false)}
      show={show}
      delay={3000}
      autohide
      style={{
        position: 'absolute',
        top: 0,
        right: 0
      }}
    >
      <Toast.Header closeLabel="" closeButton={false}>
        <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
        <strong className="mr-auto">Link's Lights</strong>
      </Toast.Header>
      <Toast.Body>{name} has been added to your cart</Toast.Body>
    </Toast>
  )
}

export default AddItemToast
