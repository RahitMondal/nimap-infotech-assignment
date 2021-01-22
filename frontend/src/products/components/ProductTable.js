import React, { useState } from "react";
import ReactPaginate from "react-paginate";

const ProductTable = ({ data, isLoading, deleteHandler }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const PER_PAGE = 6;
  const offset = currentPage * PER_PAGE;

  const currentPageData = data.slice(offset, offset + PER_PAGE);
  const pageCount = Math.ceil(data.length / PER_PAGE);

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  if (isLoading) return <h1 className="text-center mt-4">Loading...</h1>;
  if (data.length === 0)
    return (
      <h1 className="text-center mt-4">
        There is no product to show. Please add some product!
      </h1>
    );
  return (
    <div className="container-fluid">
      <table className="table text-center">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Product Name</th>
            <th scope="col">Product Id</th>
            <th scope="col">Category Name</th>
            <th scope="col">Category Id</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentPageData.map((datum) => (
            <tr key={datum._id}>
              <td>{datum.name}</td>
              <td>{datum._id}</td>
              <td>{datum.category_name}</td>
              <td>{datum.category_id}</td>
              <td>
                <button
                  onClick={deleteHandler}
                  type="button"
                  className="btn btn-sm btn-outline-danger rounded"
                  value={datum._id}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!isLoading && (
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          previousLinkClassName={"pagination__link"}
          nextLinkClassName={"pagination__link"}
          disabledClassName={"pagination__link--disabled"}
          activeClassName={"pagination__link--active"}
        />
      )}
    </div>
  );
};

export default ProductTable;
