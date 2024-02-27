import { useContext } from 'react';
import Modal from './UI/Modal';
import Button from './UI/Button';
import CartContext from '../store/CartContext';
import { currencyFormatter } from '../util/formatting';
import UserProgressContext from '../store/UserProgressContext';

export default function Cart() {
  
  const cartCxt = useContext(CartContext);
  const userCtx = useContext(UserProgressContext);
  const cartTotal = cartCxt.items.reduce((totalPrice, item) => {
    return totalPrice + item.quantity * item.price
  }, 0);

  function handleShowCheckout() {
    userCtx.showCheckout();
  }

  console.log('---------', userCtx);
  console.log('---------111', cartCxt.items);
  return (
    <Modal className='cart' open={userCtx.progress === 'cart'}>
      <h2>Your Cart</h2>
      <ul>
        {cartCxt.items.map((item) => {
          console.log('inside map', item)
          return (
            <li key={item.id}>
              {item.name} --- {item.quantity}
            </li>
          )
        })}
      </ul>
      <p className='cart-total'>`{currencyFormatter.format(cartTotal)}</p>
      <p className='modal-actions'>
      <Button textOnly>
        Close
      </Button>
      <Button onClick={handleShowCheckout}>
        Go to Checkout
      </Button>
      </p>
    </Modal>
  )
}