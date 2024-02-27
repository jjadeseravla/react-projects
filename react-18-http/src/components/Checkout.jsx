import { useContext } from "react";
import UserProgressContext from '../store/UserProgressContext';
import CartContext from "../store/CartContext";
import Modal from "./UI/Modal";
import Button from './UI/Button';
import Input from './UI/Input';

import { currencyFormatter } from '../util/formatting';

export default function Checkout() {

  const cartCxt = useContext(CartContext);
  const userCxt = useContext(UserProgressContext);

  const cartTotal = cartCxt.items.reduce((totalPrice, item) => {
    return totalPrice + item.quantity * item.price
  }, 0);

  function handleClose() {
    userCxt.hideCheckout()
  }

  function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    // how we can easily extract data from the user, eg {email: test@gmail.com}
    const customerData = Object.fromEntries(fd.entries());

    fetch('https://localhost:3000/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order: {
          items: cartCxt.items,
          customer: customerData
        }
      })
    });
    
  }

  return (
    <Modal
      open={userCxt.progress === 'checkout'}
      onClose={handleClose}
    >
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total amount: {currencyFormatter.format(cartTotal)}</p>
        <Input label="full name" type="text" id="name" />
        <Input label="emaiil" type="email" id="email" />
        <Input label="street" type="text" id="street" />
        <div className="control-row">
          <Input label="post code" type="text" id="postal-code" />
          <Input label="city" type="text" id="city"/>
        </div>
        <p className='modal-actions'>
          <Button type="button" textOnly onClick={handleClose}>Close</Button>
          <Button>Submit Order</Button>
        </p>
      </form>
   </Modal>
  )
}