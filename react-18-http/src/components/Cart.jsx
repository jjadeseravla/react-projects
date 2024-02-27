import { useContext } from 'react';
import Modal from './UI/Modal';
import Button from './UI/Button';
import CartItem from './CartItem';
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

  function handleCloseCart() {
    userCtx.hideCart();
  }

  console.log('---------', userCtx);
  console.log('---------111', cartCxt.items);
  return (
    <Modal
      className='cart'
      open={userCtx.progress === 'cart'}
      onClose={userCtx.progress === 'cart' ? handleCloseCart : null}
      >
      <h2>Your Cart</h2>
      <ul>
        {cartCxt.items.map((item) => {
          console.log('inside map', item)
          return (
            <CartItem
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              price={item.price}
              onDecrease={() => cartCxt.removeItem(item.id)}
              onIncrease={() => cartCxt.addItem(item)}
              // {...item} but it has some data we dont need, so do it individually
            />
          )
        })}
      </ul>
      <p className='cart-total'>`{currencyFormatter.format(cartTotal)}</p>
      <p className='modal-actions'>
      <Button textOnly onClick={handleCloseCart}>
        Close
        </Button>
        {cartCxt.items.length > 0 ? (
      <Button onClick={handleShowCheckout}>
        Go to Checkout
      </Button>
        ): null}
      </p>
    </Modal>
  )
}