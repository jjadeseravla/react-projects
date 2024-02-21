import React from 'react';
import PropTypes from "prop-types";
import { CartContext } from "../store/shopping-cart-context";
import { forwardRef, useImperativeHandle, useRef, useContext } from 'react';
import { createPortal } from 'react-dom';
import Cart from './Cart';

const CartModal = forwardRef(function Modal({ title, actions }, ref) {
  const { items, updateCartItemQuantity } = useContext(CartContext);

  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog id="modal" ref={dialog}>
      <h2>{title}</h2>
      <Cart items={items.cartItems} onUpdateItemQuantity={updateCartItemQuantity} />
      <form method="dialog" id="modal-actions">
        {actions}
      </form>
    </dialog>,
    document.getElementById('modal')
  );
});

export default CartModal;

CartModal.propTypes = {
  title: PropTypes.string.isRequired,
  actions: PropTypes.node.isRequired,
};
