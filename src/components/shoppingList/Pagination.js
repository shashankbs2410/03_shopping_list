import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import classes from "./Pagination.module.css";

const Pagination = () => {
  const dispatch = useDispatch();
  const activePage = useSelector((state) => state.ui.activePage);
  // const products = useSelector((state) => state.products.filteredProducts);
  const showProducts = useSelector((state) => state.ui.showProducts);
  const pages = useSelector((state) => state.products.pages);
  // let pages = [];
  // let noOfPages = 0;

  // if (products.length % 5 === 0) {
  //   noOfPages = Number((products.length / 5).toFixed(0));
  // } else {
  //   noOfPages = Number((products.length / 5).toFixed(0)) + 1;
  // }

  // for (let i = 1; i <= noOfPages; i++) {
  //   pages[i - 1] = i;
  // }

  const changePagehandler = (pageNumber) => {
    dispatch(uiActions.changePage(pageNumber));
  };

  const prevPageHandler = (activePage) => {
    if (activePage > Math.min(...pages)) {
      dispatch(uiActions.changePage(activePage - 1));
    } else {
      return;
    }
  };

  const nextPageHandler = (activePage) => {
    if (activePage < Math.max(...pages)) {
      dispatch(uiActions.changePage(activePage + 1));
    } else {
      return;
    }
  };

  const firstPageHandler = () => {
    dispatch(uiActions.changePage(Math.min(...pages)));
  };

  const lastPageHandler = () => {
    dispatch(uiActions.changePage(Math.max(...pages)));
  };

  return (
    <div className={classes.pagination}>
      {showProducts && (
        <div>
          <button
            className={classes.common_button}
            onClick={() => firstPageHandler(activePage)}
            title="Go to First Page"
          >
            {"<<"}
          </button>
          <button
            className={classes.common_button}
            onClick={() => prevPageHandler(activePage)}
            title="Go to Previous Page"
          >
            {"<"}
          </button>
          {pages.map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => changePagehandler(pageNumber)}
              className={
                pageNumber === activePage
                  ? classes.active_page
                  : classes.page_button
              }
              title={"Go to Page " + pageNumber}
            >
              {pageNumber}
            </button>
          ))}
          <button
            className={classes.common_button}
            onClick={() => nextPageHandler(activePage)}
            title="Go to Next Page"
          >
            {">"}
          </button>
          <button
            className={classes.common_button}
            onClick={() => lastPageHandler(activePage)}
            title="Go to Last Page"
          >
            {">>"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Pagination;
