import { useDispatch, useSelector } from "react-redux";

import { uiActions } from "../../store/ui-slice";
import classes from "./Checkout.module.css";

const Checkout = () => {
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();

  const completeHandler = () => {
    dispatch(uiActions.toggleCart());
    dispatch(uiActions.toggleIsEnteringAddress());
  };

  return (
    <div className={classes.checkout}>
      <p>Total Amount: {Math.abs(totalAmount.toFixed(2))}</p>
      <button
        onClick={completeHandler}
        disabled={Math.round(totalAmount) === 0}
      >
        Proceed to Enter Address ➤
      </button>
    </div>
  );
};

export default Checkout;
