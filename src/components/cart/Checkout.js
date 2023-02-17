import { useDispatch, useSelector } from "react-redux";

import { uiActions } from "../../store/ui-slice";
import { cartActions } from "../../store/cart-slice";
import classes from "./Checkout.module.css";

const Checkout = () => {
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();

  const CompleteHandler = () => {
    dispatch(uiActions.toggleCart());
    dispatch(uiActions.shoppingCompleteHandler());
    dispatch(cartActions.clearCart());
  };

  return (
    <div className={classes.checkout}>
      <p>Total Amount: {totalAmount.toFixed(2)}</p>
      <button onClick={CompleteHandler} disabled={totalAmount === 0}>
        Proceed to Pay
      </button>
    </div>
  );
};

export default Checkout;
