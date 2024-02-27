import { useContext } from "react";
import useHttp from "../hooks/useHttp";
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

  function handleFinish() {
    userCxt.hideCheckout();
    cartCxt.clearCart();
    clearData();
  }

  const requestConfig = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const {
    data: order,
    isLoading,
    err,
    sendRequest,
    clearData
  } = useHttp('http://localhost:3000/orders', requestConfig, []);


  function handleSubmit(e) {
    e.preventDefault();

    const fd = new FormData(e.target);
    // how we can easily extract data from the user, eg {email: test@gmail.com}
    const customerData = Object.fromEntries(fd.entries());

      sendRequest(JSON.stringify({
        order: {
          items: cartCxt.items,
          customer: customerData,
        },
      })
    );
  }

  let actions = (
    <>
      <Button type="button" textOnly onClick={handleClose}>Close</Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isLoading) {
    actions = <span>Sending order data...</span>
  }

  if (order && !err) {
    return (
      <Modal open={userCxt.progress === 'checkout'}
        onClose={handleClose}>
        <h2>Success</h2>
        <p>Your order submitted successfully</p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>OK</Button>
        </p>
      </Modal>
    )
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
        {err && <Error title="failed to submit order" err={err} />}
        <p className='modal-actions'>{actions}</p>
      </form>
   </Modal>
  )
}