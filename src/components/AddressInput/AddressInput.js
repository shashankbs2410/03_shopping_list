import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import classes from "./AddressInput.module.css";
import BackdropAddress from "../ui/BackdropAddress";
import { addressActions } from "../../store/address-slice";

const AddressInput = () => {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.address.name);
  const house = useSelector((state) => state.address.house);
  const street = useSelector((state) => state.address.street);
  const city = useSelector((state) => state.address.city);
  const state = useSelector((state) => state.address.state);
  const pincode = useSelector((state) => state.address.pincode);
  const country = useSelector((state) => state.address.country);
  const isEnteringAddress = useSelector((state) => state.ui.isEnteringAddress);
  let formIsValid = false;
  if (
    name.trim().length > 0 &&
    house.trim().length > 0 &&
    street.trim().length > 0 &&
    city.trim().length > 0 &&
    state.trim().length > 0 &&
    country.trim().length > 0 &&
    pincode.trim().toString().length === 6
  ) {
    formIsValid = true;
  }

  const completeHandler = () => {
    dispatch(uiActions.toggleIsEnteringAddress());
    dispatch(uiActions.toggleIsPaying());
  };

  const toggleAddressHandler = () => {
    dispatch(uiActions.toggleIsEnteringAddress());
    dispatch(uiActions.toggleCart());
  };

  return (
    <div>
      {isEnteringAddress && (
        <div>
          <BackdropAddress />
          <div className={classes.AddressInput}>
            <button
              onClick={toggleAddressHandler}
              className={classes.back_button}
            >
              {"< Back"}
            </button>
            <h3> Address</h3>
            <div className={classes.fields}>
              <label>Name :</label>
              <input
                type="text"
                onChange={(event) => {
                  dispatch(addressActions.nameInputChange(event.target.value));
                }}
              />
              <label>House :</label>
              <input
                type="text"
                onChange={(event) => {
                  dispatch(addressActions.houseInputChange(event.target.value));
                }}
              />
              <label>Street :</label>
              <input
                type="text"
                onChange={(event) => {
                  dispatch(
                    addressActions.streetInputChange(event.target.value)
                  );
                }}
              />
              <label>City :</label>
              <input
                type="text"
                onChange={(event) => {
                  dispatch(addressActions.cityInputChange(event.target.value));
                }}
              />
              <label>State :</label>
              <input
                type="text"
                onChange={(event) => {
                  dispatch(addressActions.stateInputChange(event.target.value));
                }}
              />
              <label>Pincode :</label>
              <input
                type="number"
                placeholder="enter pincode of 6 digits"
                onChange={(event) => {
                  dispatch(
                    addressActions.pincodeInputChange(event.target.value)
                  );
                }}
              />
              <label>Country :</label>
              <input
                type="text"
                onChange={(event) => {
                  dispatch(
                    addressActions.countryInputChange(event.target.value)
                  );
                }}
              />
              <span className={classes.text}>
                Please provide accurate address to help us with on-time delivery
                to your doorstep!
              </span>
            </div>
            <button
              onClick={completeHandler}
              className={
                formIsValid ? classes.proceed_button : classes.proceed_disabled
              }
              disabled={!formIsValid}
            >
              Proceed to Pay ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressInput;
