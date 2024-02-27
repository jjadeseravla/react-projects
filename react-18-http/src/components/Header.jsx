import { useContext } from 'react';
import logoImg from '../assets/logo.jpg';
import Button from './UI/Button';
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';

export default function Header({ title }) {
  const cartContx = useContext(CartContext);
  const userContx = useContext(UserProgressContext);

  const totalCartItems = cartContx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  function handleShowCart() {
    userContx.showCart();
  }

  return (
    <header id='main-header'>
      <div id="title">
        <img src={logoImg} alt="heading image" />
        <h1> 
          {title}
        </h1>
      </div>
      <nav>
        <Button
          onClick={handleShowCart}
          textOnly>
          Cart ({totalCartItems})
        </Button>
      </nav>
    </header>
  )
}