import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import classes from "./Payment.module.css";

const Payment = () => {
  const dispatch = useDispatch();
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const isPayed = useSelector((state) => state.ui.isPayed);

  const completeHandler = () => {
    dispatch(uiActions.toggleIsPaying());
    dispatch(uiActions.toggleIsPayed());
  };

  return (
    <div className={classes.payment_page}>
      {!isPayed && (
        <div>
          <p className={classes.total_amount}>
            Total Amount: ${totalAmount.toFixed(2)}
          </p>
          <button onClick={completeHandler} className={classes.pay_button}>
            Pay
          </button>
        </div>
      )}
    </div>
  );
};

export default Payment;
