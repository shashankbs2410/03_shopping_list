import classes from "./Card.module.css";
import SelectNumber from "./SelectNumber";

const Card = (props) => {
  const product = props.product;

  return (
    <div className={classes.card}>
      <div className={classes.title}>
        <h3 className={classes.product_name}>{product.title}</h3>
      </div>
      <p className={classes.price}>
        {product.currencyId} {product.currencyFormat}
        {product.price}
      </p>
      <div className={classes.info}>
        {product.style && <p>style: {product.style}</p>}
        {product.isFreeShipping ? (
          <p className={classes.shipping_free}>Free Shipping Available</p>
        ) : (
          <p className={classes.shipping_not_free}>
            Free Shipping Not Available
          </p>
        )}
        <SelectNumber product={product} />
      </div>
    </div>
  );
};

export default Card;
