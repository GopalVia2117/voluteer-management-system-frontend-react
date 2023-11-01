import React from "react";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";

const Pagination = ({ totalCount, page, setPage, perPage, setPerPage }) => {
  let totalPages = [];
  let numberOfRows = [25, 50, 75, 100, 125, 150, 175, 200];
  for (let i = 1; i <= Math.ceil(totalCount / perPage); i++) {
    totalPages.push(i);
  }

  return (
    <div className="flex justify-center items-center text-sm">
      <button
        className="text-2xl disabled:text-secondary"
        disabled={page === 1 ? true : false}
        onClick={() => setPage(page - 1)}
      >
        <ArrowLeft fontSize="inherit" />
      </button>

      <div className="flex gap-2 items-center">
        <div>
          <label htmlFor="currentPage">Current Page: </label>
          <select
            className="bg-primary text-white px-2 py-1 outline-none"
            value={page}
            onChange={(e) => setPage(e.currentTarget.value)}
          >
            {totalPages.map((page) => (
              <option key={page} value={page}>
                {page}
              </option>
            ))}
          </select>
        </div>

        <button
          className="text-2xl disabled:text-secondary"
          disabled={page === Math.ceil(totalCount / perPage) ? true : false}
          onClick={() => setPage(page + 1)}
        >
          <ArrowRight fontSize="inherit" />
        </button>

        <div>
          <label htmlFor="no_of_rows">Number of rows:</label>
          <select
            className="bg-primary text-white px-2 py-1 outline-none"
            value={perPage}
            onChange={(e) => {
              setPerPage(e.currentTarget.value);
              localStorage.setItem(
                "per_pages",
                JSON.stringify(e.currentTarget.value)
              );
            }}
          >
            {numberOfRows.map((row) => (
              <option key={row} value={row}>
                {row}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
