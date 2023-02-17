import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import { productsActions } from "../../store/products-slice";
import Input from "./Input";
import ToggleOptionsButton from "./ToggleOptionsButton";

const SelectNumber = (props) => {
  const dispatch = useDispatch();
  const product = props.product;

  const toggleOptionsHandler = (id) => {
    dispatch(productsActions.toggleOptions(id));
  };

  const addToCartHandler = (size) => {
    dispatch(
      cartActions.addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        currencyFormat: product.currencyFormat,
        size: size,
        quantity: 1,
      })
    );
  };

  return (
    <div>
      {!product.showOptions && (
        <ToggleOptionsButton
          text="⮟ Show Available Sizes!"
          toggleHandler={() => {
            toggleOptionsHandler({ id: product.id });
          }}
        />
      )}
      {product.showOptions && (
        <div>
          {product.availableSizes.map((size) => {
            return (
              <Input
                key={size}
                size={size}
                id={product.id}
                price={product.price}
                quantities={product.quantities}
                addToCartHandler={addToCartHandler}
              />
            );
          })}
          <ToggleOptionsButton
            text="⮝ Hide Available Sizes"
            toggleHandler={() => {
              toggleOptionsHandler({ id: product.id });
            }}
          />
        </div>
      )}
    </div>
  );
};

export default SelectNumber;
