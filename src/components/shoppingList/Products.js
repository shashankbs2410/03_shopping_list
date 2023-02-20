import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchProducts, productsActions } from "../../store/products-slice";
import classes from "./Products.module.css";
import Card from "../ui/Card";
import LoadingSpinner from "../ui/LoadingSpinner";
import Pagination from "./Pagination";
import { uiActions } from "../../store/ui-slice";
import FiltersSorters from "./FilterbySortby";

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.filteredProducts);
  const showProducts = useSelector((state) => state.ui.showProducts);
  const activePage = useSelector((state) => state.ui.activePage);
  const isItemsFetched = useSelector((state) => state.ui.itemsFetched);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProductsHandler = async () => {
    setIsLoading(true);
    if (!isItemsFetched) {
      await fetchProducts(dispatch);
    } else {
      dispatch(uiActions.toggleShowProducts());
    }
    dispatch(productsActions.setPages());
    setIsLoading(false);
  };

  const vieableProducts = products.slice((activePage - 1) * 5, activePage * 5);

  return (
    <div>
      {!showProducts && !isLoading && (
        <div className={classes.initial}>
          <h2>Try our range of Amazing & Stylish Products!</h2>
          <button
            onClick={fetchProductsHandler}
            className={classes.show_products}
          >
            ⮟ Show all Products
          </button>
        </div>
      )}
      <div className={classes.products}>
        <FiltersSorters />
        <Pagination />
        {isLoading && <LoadingSpinner />}
        {showProducts &&
          vieableProducts.map((product) => {
            return <Card key={product.id} product={product} />;
          })}
      </div>
    </div>
  );
};

export default Products;
