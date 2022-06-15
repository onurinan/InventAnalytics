import React from "react";
import "./pagination.css";

const Pagination = ({
  currentPage,
  handleNextPage,
  handlePreviousPage,
  totalResults,
}) => {
  let postsPerPage = 10;
  let totalPage = (totalResults / postsPerPage).toFixed(0);

  return (
    <div className="pagination">
      {currentPage > 1 && (
        <button onClick={handlePreviousPage}>Previous</button>
      )}

      {currentPage !== totalPage && (
        <button onClick={handleNextPage}>Next</button>
      )}
    </div>
  );
};

export default Pagination;
