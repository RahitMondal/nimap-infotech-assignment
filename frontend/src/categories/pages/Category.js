import React, { useState, useEffect } from "react";
import axios from "axios";

import CategoryTable from "../components/CategoryTable";
import CategoryUpdate from "../components/CategoryUpdate";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [input, setInput] = useState("");
  const [isCatUpdateShown, setIsCatUpdateShown] = useState(false);
  const [newName, setNewName] = useState("");
  const [curId, setCurId] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/categories");
      setCategories(response.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const postData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/categories",
        JSON.stringify({ name: input }),
        { headers: { "Content-type": "application/json" } }
      );
      console.log(response);
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  const updateData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.patch(
        "http://localhost:5000/api/categories",
        JSON.stringify({ newName, _id: curId }),
        { headers: { "Content-type": "application/json" } }
      );
      console.log(response);
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteData = async (_id) => {
    setIsLoading(true);
    try {
      const response = await axios.delete(
        "http://localhost:5000/api/categories",
        {
          data: JSON.stringify({ _id }),
          headers: { "Content-type": "application/json" },
        }
      );
      console.log(response);
      fetchData();
    } catch (err) {
      console.log(err.message);
    }
  };

  const onChangeHandler = (evt) => {
    setInput(evt.target.value);
  };

  const _onChangeHandler = (evt) => {
    setNewName(evt.target.value);
  };

  const submitHandler = () => {
    postData();
  };

  const updateHandler = (evt) => {
    updateData();
  };

  const deleteHandler = (evt) => {
    deleteData(evt.target.value);
  };

  const toggleUpdateHandler = (evt) => {
    setIsCatUpdateShown(!isCatUpdateShown);
    setCurId(evt.target.value);
  };

  return (
    <React.Fragment>
      <div className="d-flex justify-content-center border-1 my-3 mx-2">
        <input
          className="text-center rounded-0 p-2  border-primary"
          type="text"
          name="category_name"
          placeholder="Category name"
          onChange={onChangeHandler}
          style={{ outline: "none" }}
        />
        <button
          className="bg-primary text-white border-1 rounded-0 py-2 px-5 border-primary"
          onClick={submitHandler}
        >
          ADD(+)
        </button>
        <CategoryUpdate
          isShown={isCatUpdateShown}
          _onChangeHandler={_onChangeHandler}
          updateHandler={updateHandler}
          input={input}
        />
      </div>
      <CategoryTable
        data={categories}
        isLoading={isLoading}
        deleteHandler={deleteHandler}
        toggleUpdateHandler={toggleUpdateHandler}
      />
    </React.Fragment>
  );
};

export default Category;
