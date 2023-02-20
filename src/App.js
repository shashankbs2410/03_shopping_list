import { useSelector } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Cart from "./components/cart/Cart";
import GoogleLoginComponent from "./components/login/GoogleLogin";
import Products from "./components/shoppingList/Products";
import Header from "./components/ui/Header";
import AddressInput from "./components/AddressInput/AddressInput";
import Payment from "./components/Payment/Payment";
import OrderPlaced from "./components/OrderPlaced/OrderPlaced";

function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const isSignedIn = useSelector((state) => state.ui.isSignedIn);
  const isEnteringAddress = useSelector((state) => state.ui.isEnteringAddress);
  const isPaying = useSelector((state) => state.ui.isPaying);
  const isPayed = useSelector((state) => state.ui.isPayed);

  return (
    <div>
      <Header showCartButton={isSignedIn} />
      {!isPaying && showCart && <Cart />}
      {!isPaying && isEnteringAddress && <AddressInput />}
      <GoogleOAuthProvider clientId="510666409059-2v0h3v9rqgn12fcfnnd7tjj0s1tbie3k.apps.googleusercontent.com">
        <GoogleLoginComponent />
      </GoogleOAuthProvider>
      {isPaying && <Payment />}
      {!isPayed && !isPaying && isSignedIn && <Products />}
      {isPayed && <OrderPlaced />}
    </div>
  );
}

export default App;
