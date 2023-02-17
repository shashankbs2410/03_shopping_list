import { useDispatch } from "react-redux";
import classes from "./Input.module.css";

import { productsActions } from "../../store/products-slice";
import { cartActions } from "../../store/cart-slice";

const Input = (props) => {
  const dispatch = useDispatch();
  const size = props.size;
  const id = props.id;
  const price = props.price;
  const quantity = props.quantities.find(
    (element) => element.size === size
  ).quantity;

  const increaseHandler = (id, size) => {
    dispatch(productsActions.increaseQuantity({ id: id, size: size }));
    props.addToCartHandler(size);
  };

  const decreaseHandler = (id, size) => {
    if (quantity === 0) {
      return;
    } else {
      dispatch(productsActions.decreaseQuantity({ id: id, size: size }));
      dispatch(
        cartActions.removeFromCart({ id: id, size: size, price: price })
      );
    }
  };

  return (
    <div className={classes.select}>
      <p className={classes.size}>{size}</p>
      <button
        className={classes.button}
        onClick={() => {
          decreaseHandler(id, size);
        }}
      >
        -
      </button>
      <input className={classes.input} type="number" value={quantity} />
      <button
        className={classes.button}
        onClick={() => {
          increaseHandler(id, size);
        }}
      >
        +
      </button>
    </div>
  );
};

export default Input;
