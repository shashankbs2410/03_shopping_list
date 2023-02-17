import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import { productsActions } from "../../store/products-slice";
import classes from "./CartCard.module.css";
import CartInput from "./CartInput";
import Checkout from "./Checkout";

const CartCard = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart);

  const decreaseHandler = (id, size, price) => {
    dispatch(cartActions.removeFromCart({ id: id, size: size, price: price }));
    dispatch(productsActions.decreaseQuantity({ id: id, size: size }));
  };
  const increaseHandler = (id, size, price) => {
    dispatch(
      cartActions.increaseQuantity({ id: id, size: size, price: price })
    );
    dispatch(productsActions.increaseQuantity({ id: id, size: size }));
  };

  return (
    <div className={classes.cart_items}>
      {cartItems.length === 0 && (
        <div className={classes.no_item}>
          <p>No items are added yet!</p>
          <p>Please add some items.</p>
        </div>
      )}
      {cartItems.map((cartItem) => {
        const totalPrice = cartItem.price * cartItem.quantity;
        return (
          <div key={`${cartItem.id}+${cartItem.size}`} className={classes.card}>
            <div className={classes.title}>{cartItem.title}</div>
            <div className={classes.price}>
              {cartItem.currencyFormat}
              {totalPrice.toFixed(2)}
            </div>
            <div className={classes.size}>{cartItem.size}</div>
            <CartInput
              value={cartItem.quantity}
              increaseHandler={() => {
                increaseHandler(cartItem.id, cartItem.size, cartItem.price);
              }}
              decreaseHandler={() => {
                decreaseHandler(cartItem.id, cartItem.size, cartItem.price);
              }}
            />
          </div>
        );
      })}
      <Checkout />
    </div>
  );
};

export default CartCard;
