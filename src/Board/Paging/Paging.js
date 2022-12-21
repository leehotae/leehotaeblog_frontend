import "./Paging.css";
import Pagination from "react-js-pagination";

const Paging = ({ page, count, setPage }) => {
  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={8}
      totalItemsCount={count}
      pageRangeDisplayed={8}
      prevPageText={"‹"}
      nextPageText={"›"}
      onChange={setPage}
    />
  );
};

export default Paging;
