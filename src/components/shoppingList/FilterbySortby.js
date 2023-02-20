import { useDispatch, useSelector } from "react-redux";

import { productsActions } from "../../store/products-slice";
import { uiActions } from "../../store/ui-slice";
import classes from "./FilterbySortby.module.css";

const FiltersSorters = () => {
  const dispatch = useDispatch();
  const showProducts = useSelector((state) => state.ui.showProducts);
  const isFreeShippingFiltered = useSelector(
    (state) => state.products.freeShippingFiltered
  );

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
    </div>
  );
};

export default FiltersSorters;
