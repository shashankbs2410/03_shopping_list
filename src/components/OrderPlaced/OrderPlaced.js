import { useState, useEffect } from "react";
import classes from "./OrderPlaced.module.css";
import { uiActions } from "../../store/ui-slice";
import { cartActions } from "../../store/cart-slice";
import { useDispatch } from "react-redux";

const OrderPlaced = () => {
  const dispatch = useDispatch();
  const [spin, setSpin] = useState("true");

  useEffect(() => {
    const timer = setTimeout(() => {
      setSpin(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [spin]);

  const backToHomeHandler = () => {
    dispatch(uiActions.shoppingCompleteHandler());
    dispatch(cartActions.clearCart());
    dispatch(uiActions.toggleIsPayed());
  };

  return (
    <div>
      {spin && (
        <div className={classes.spinner_container}>
          <div className={classes.loading_spinner}></div>
        </div>
      )}
      {!spin && (
        <div className={classes.text}>
          <h1>Order Placed!</h1>
          <img
            src="https://static.vecteezy.com/system/resources/previews/010/152/358/original/tick-icon-sign-symbol-design-free-png.png"
            alt="tick mark"
          />
          <button onClick={backToHomeHandler}>Back to Home Page ➤</button>
        </div>
      )}
    </div>
  );
};

export default OrderPlaced;
