import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchProducts, productsActions } from "../../store/products-slice";
import classes from "./Products.module.css";
import Card from "../ui/Card";
import LoadingSpinner from "../ui/LoadingSpinner";
import Pagination from "./Pagination";
import { uiActions } from "../../store/ui-slice";

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.filteredProducts);
  const showProducts = useSelector((state) => state.ui.showProducts);
  const activePage = useSelector((state) => state.ui.activePage);
  const isItemsFetched = useSelector((state) => state.ui.itemsFetched);
  const isFreeShippingFiltered = useSelector(
    (state) => state.products.freeShippingFiltered
  );
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

  const freeShippingFilterHandler = async () => {
    dispatch(productsActions.toggleFreeShippingFilter());
    dispatch(productsActions.setPages());
    dispatch(uiActions.changePage(1));
    document.getElementById("selectSortOType").value = "Relevance";
  };

  const handleOptionsChange = (event) => {
    const type = event.target.value;
    if (type === "Relevance") {
      dispatch(productsActions.sortByRelevance());
    } else if (type === "LowtoHigh") {
      dispatch(productsActions.sortByPriceLowToHigh());
    } else if (type === "HightoLow") {
      dispatch(productsActions.sortByPriceHighToLow());
    }
    dispatch(uiActions.changePage(1));
  };

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
        {showProducts && (
          <div>
            <h4 className={classes.filter_by}>Filter by -</h4>
            <button
              onClick={freeShippingFilterHandler}
              className={
                isFreeShippingFiltered
                  ? classes.filter_active
                  : classes.filter_inactive
              }
            >
              Free Shipping
            </button>
            <h4 className={classes.sort_by}>Sort by -</h4>
            <select
              id="selectSortOType"
              className={classes.selector}
              onChange={handleOptionsChange}
              defaultValue="Relevance"
            >
              <option value="Relevance">Relevance</option>
              <option value="LowtoHigh">Low to High</option>
              <option value="HightoLow">High to Low</option>
            </select>
          </div>
        )}
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
