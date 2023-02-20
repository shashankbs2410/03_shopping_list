import { useDispatch } from "react-redux";
import classes from "./Backdrop.module.css";
import { uiActions } from "../../store/ui-slice";

const BackdropAddress = () => {
  const dispatch = useDispatch();

  const backdropClickHandler = () => {
    dispatch(uiActions.toggleIsEnteringAddress());
  };

  return (
    <div className={classes.backdrop} onClick={backdropClickHandler}></div>
  );
};

export default BackdropAddress;
