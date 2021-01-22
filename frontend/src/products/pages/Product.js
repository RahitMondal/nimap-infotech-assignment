import React, { useState, useEffect } from "react";
import axios from "axios";

import ProductTable from "../components/ProductTable";
import ProductCreationForm from "../components/ProductCreationForm";

import "./Product.css";

const Categories = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoriesId] = useState("");
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCategoryData();
    fetchData();
  }, []);

  const fetchCategoryData = async () => {
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
      console.log("entered");
      const response = await axios.post(
        "http://localhost:5000/api/products",
        JSON.stringify({ name: input, category_id: categoryId }),
        { headers: { "Content-type": "application/json" } }
      );
      console.log(response);
      fetchData();
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteData = async (product_id) => {
    setIsLoading(true);
    try {
      const response = await axios.delete(
        "http://localhost:5000/api/products",
        {
          data: JSON.stringify({ product_id: product_id }),
          headers: { "Content-type": "application/json" },
        }
      );
      console.log(response);
      fetchData();
    } catch (err) {
      console.log(err.message);
    }
  };

  const deleteHandler = (evt) => {
    deleteData(evt.target.value);
  };

  const submitHandler = () => {
    postData();
  };

  const onSelectHandler = (evt) => {
    setCategoriesId(evt.target.value);
  };

  const onChangeHandler = (evt) => {
    setInput(evt.target.value);
  };

  return (
    <React.Fragment>
      <ProductCreationForm
        categories={categories}
        onChangeHandler={onChangeHandler}
        onSelectHandler={onSelectHandler}
        submitHandler={submitHandler}
      />
      <ProductTable
        data={products}
        isLoading={isLoading}
        deleteHandler={deleteHandler}
      />
    </React.Fragment>
  );
};

export default Categories;
