import { useDispatch } from "react-redux";
import classes from "./Backdrop.module.css";
import { uiActions } from "../../store/ui-slice";

const Backdrop = () => {
  const dispatch = useDispatch();

  const backdropClickHandler = () => {
    dispatch(uiActions.toggleCart());
  };

  return (
    <div className={classes.backdrop} onClick={backdropClickHandler}></div>
  );
};

export default Backdrop;
