import { useSelector, useDispatch } from "react-redux";
import { GoogleLogin } from "@react-oauth/google";

import classes from "./GoogleLogin.module.css";
import { uiActions } from "../../store/ui-slice";

const Google = () => {
  const dispatch = useDispatch();
  const isSignedIn = useSelector((state) => state.ui.isSignedIn);

  return (
    <div>
      {!isSignedIn && (
        <div className={classes.sign_in}>
          <h2>Sign in to Continue!</h2>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
              dispatch(uiActions.signInChange());
            }}
            onError={() => {
              console.log("Login Failed");
            }}
            useOneTap
          />
        </div>
      )}
    </div>
  );
};

export default Google;
