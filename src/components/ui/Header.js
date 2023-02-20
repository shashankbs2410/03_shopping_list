import { useDispatch, useSelector } from "react-redux";
import { googleLogout } from "@react-oauth/google";

import { uiActions } from "../../store/ui-slice";
import classes from "./Header.module.css";

const Header = () => {
  const isSignedIn = useSelector((state) => state.ui.isSignedIn);
  const isShowProducts = useSelector((state) => state.ui.showProducts);
  const totalCartQuantity = useSelector((state) => state.cart.totalQuantity);
  const itemsFetched = useSelector((state) => state.ui.itemsFetched);
  const isPaying = useSelector((state) => state.ui.isPaying);
  const isPayed = useSelector((state) => state.ui.isPayed);
  const dispatch = useDispatch();

  const toggleCartHandler = () => {
    dispatch(uiActions.toggleCart());
  };

  const logoutHandler = () => {
    googleLogout();
    console.log("logged out!");
    dispatch(uiActions.signInChange());
    if (isShowProducts) {
      dispatch(uiActions.toggleShowProducts());
    }
  };

  const backHandler = () => {
    dispatch(uiActions.toggleShowProducts());
  };

  return (
    <div className={classes.header}>
      {itemsFetched && isSignedIn && !isPaying && !isPayed && (
        <div>
          <button onClick={toggleCartHandler} className={classes.cart_button}>
            Cart [{totalCartQuantity}]
          </button>
        </div>
      )}
      {isSignedIn && (
        <button className={classes.logout_button} onClick={logoutHandler}>
          <img
            className={classes.google_logo}
            src={
              "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png"
            }
            alt="Google logo"
          />
          Logout
        </button>
      )}
      {isShowProducts && !isPaying && !isPayed && (
        <button className={classes.back_button} onClick={backHandler}>
          {"< Back"}
        </button>
      )}
    </div>
  );
};

export default Header;
