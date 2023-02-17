import { useDispatch } from "react-redux";

import { uiActions } from "../../store/ui-slice";
import Backdrop from "../ui/Backdrop";
import CartCard from "./CartCard";
import classes from "./Cart.module.css";

const Cart = () => {
  const dispatch = useDispatch();
  const toggleCartHandler = () => {
    dispatch(uiActions.toggleCart());
  };

  return (
    <div>
      <Backdrop />
      <div className={classes.cart}>
        <button onClick={toggleCartHandler} className={classes.back_button}>
          {"< Back"}
        </button>
        <h3>Cart</h3>
        <CartCard />
      </div>
    </div>
  );
};

export default Cart;
