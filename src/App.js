import { useSelector } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Cart from "./components/cart/Cart";
import GoogleLoginComponent from "./components/login/GoogleLogin";
import Products from "./components/shoppingList/Products";
import Header from "./components/ui/Header";

function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const isSignedIn = useSelector((state) => state.ui.isSignedIn);

  return (
    <div>
      <Header showCartButton={isSignedIn} />
      {showCart && <Cart />}
      <GoogleOAuthProvider clientId="510666409059-2v0h3v9rqgn12fcfnnd7tjj0s1tbie3k.apps.googleusercontent.com">
        <GoogleLoginComponent />
      </GoogleOAuthProvider>
      {isSignedIn && <Products />}
    </div>
  );
}

export default App;
