import classes from "./CartInput.module.css";

const CartInput = (props) => {
  const decreaseHandler = () => {
    props.decreaseHandler();
  };

  const increaseHandler = () => {
    props.increaseHandler();
  };

  return (
    <div className={classes.change_quantity}>
      <button className={classes.button} onClick={decreaseHandler}>
        -
      </button>
      <input type="number" value={props.value} className={classes.input} />
      <button className={classes.button} onClick={increaseHandler}>
        +
      </button>
    </div>
  );
};

export default CartInput;
