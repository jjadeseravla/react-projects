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

  return (
    <Modal
      open={userCxt.progress === 'checkout'}
      onClose={handleClose}
    >
      <form action="">
        <h2>Checkout</h2>
        <p>Total amount: {currencyFormatter.format(cartTotal)}</p>
        <Input label="full name" type="text" id="full-name" />
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