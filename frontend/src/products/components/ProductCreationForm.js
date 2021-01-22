import React from "react";

const ProductCreationForm = ({
  categories,
  onChangeHandler,
  onSelectHandler,
  submitHandler,
}) => {
  return (
    <div className="d-flex justify-content-center my-3 mx-2">
      <input
        className="text-center rounded-0 p-2  border-1 border-primary"
        type="text"
        name="category_name"
        placeholder="Product name"
        onChange={onChangeHandler}
        style={{ outline: "none" }}
      />
      <select
        id="category-selector"
        className="text-center rounded-0 p-2  border-1 border-primary"
        style={{ outline: "none" }}
        onClick={onSelectHandler}
      >
        <option value="">Select category</option>
        {categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>
      <button
        className="bg-primary text-white border-1 rounded-0 py-2 px-5 border-primary"
        onClick={submitHandler}
      >
        ADD(+)
      </button>
    </div>
  );
};

export default ProductCreationForm;
