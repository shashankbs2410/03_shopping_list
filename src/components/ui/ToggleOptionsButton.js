import classes from "./ToggleOptionsButton.module.css";

const ToggleOptionsButton = (props) => {
  return (
    <div>
      <button
        onClick={props.toggleHandler}
        className={classes.show_options_button}
      >
        {props.text}
      </button>
    </div>
  );
};

export default ToggleOptionsButton;
