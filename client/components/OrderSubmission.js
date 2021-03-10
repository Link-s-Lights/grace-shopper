import React, {useState, useEffect} from 'react'
import {loadStripe} from '@stripe/stripe-js'
// import './App.css'
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  'pk_test_51IT9L4CDIyPTIGppwS45MxSHiNoelEQWlx7tBQPYU5EuMXuk0G32bjuA3GvgafRQtYEe72gwCqdDGpX4qGk5C2fZ00P9vi7Kwv'
)

export const ProductDisplay = ({handleClick}) => (
  <section>
    {/* <div className="product">
      <img
        src="https://i.imgur.com/EHyR2nP.png"
        alt="The cover of Stubborn Attachments"
      />
      <div className="description">
        <h3>Stubborn Attachments</h3>
        <h5>$20.00</h5>
      </div>
    </div> */}
    {/* <h5>{}</h5> */}
    <button
      type="button"
      id="checkout-button"
      role="link"
      onClick={handleClick}
    >
      Checkout
    </button>
  </section>
)
const Message = ({message}) => (
  <section>
    <p>{message}</p>
  </section>
)
export default function OrderSubmission(props) {
  // const emptyCart = function() {
  //   props.submitCart(props.cart)
  // }
  const [message, setMessage] = useState('')
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search)
    if (query.get('success')) {
      setMessage('Order placed! You will receive an email confirmation.')
    }
    if (query.get('canceled')) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      )
    }
  }, [])
  const handleClick = async event => {
    event.preventDefault()
    console.log('CLICKED')
    try {
      const stripe = await stripePromise
      const response = await fetch('/payment', {
        method: 'POST'
      })

      // response('/payment')
      // .then(res => res.json()) // comment this out for now
      // const responseText = await response.text()
      // console.log('RESPONSE TEXT', responseText)

      // console.log('RESPONSE', response)
      const session = await response.json()
      // When the customer clicks on the button, redirect them to Checkout.
      console.log('SESSION', session.id)
      // emptyCart()
      await stripe.redirectToCheckout({
        sessionId: session.id
      })
    } catch (error) {
      console.log(error.message)
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  }
  return message ? (
    <Message message={message} />
  ) : (
    <ProductDisplay handleClick={handleClick} />
  )
}
