import React from "react";

import "./CategoryUpdate.css";

const CategoryUpdate = ({
  isShown,
  _onChangeHandler,
  updateHandler,
  newName,
}) => {
  const display = isShown ? "d-flex" : "d-none";
  return (
    <div id="overlay" className={`${display} ml-2`}>
      <input
        className="text-center rounded-0 p-2  border-primary"
        type="text"
        name="category_name"
        placeholder="Enter new name"
        onChange={_onChangeHandler}
        style={{ outline: "none" }}
      />
      <button
        className="bg-primary text-white border-1 rounded-0 py-2 px-5 border-primary"
        onClick={updateHandler}
        disabled={newName ? false : true}
      >
        Update
      </button>
    </div>
  );
};

export default CategoryUpdate;
