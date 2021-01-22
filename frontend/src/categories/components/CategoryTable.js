import React from "react";

const CategoryTable = ({
  data,
  isLoading,
  deleteHandler,
  toggleUpdateHandler,
}) => {
  if (isLoading) return <h1 className="text-center mt-4">Loading...</h1>;
  if (data.length === 0)
    return (
      <h1 className="text-center mt-4">
        There is no data to show. Please add some data!
      </h1>
    );
  return (
    <div className="container-fluid">
      <table className="table text-center">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Category Name</th>
            <th scope="col">Category Id</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((datum) => (
            <tr key={datum._id}>
              <td className="text-capitalize">{datum.name}</td>
              <td>{datum._id}</td>
              <td>
                <button
                  onClick={toggleUpdateHandler}
                  type="button"
                  className="btn btn-sm btn-outline-primary rounded"
                  value={datum._id}
                >
                  Update
                </button>
              </td>
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
    </div>
  );
};

export default CategoryTable;
