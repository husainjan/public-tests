import { useState, useEffect } from "react";
import { useProductGroup } from "../Providers/ProductGroupsProvider";
import { useProductsActions } from "../Providers/ProductsProvider";

import "./Product.css";

const Product = ({ product, setProduct }) => {
  const productsGroup = useProductGroup();
  const productsDispatch = useProductsActions();

  useEffect(() => {
    if (product !== null) {
      //   let newVal = parseInt(
      //     product.price.toLocaleString().replace(/\D/g, ""),
      //     10
      //   );
      //   let newVal2 = newVal.toLocaleString();
      setProduct({ ...product, price: "" });
    }
  }, [product.id]);

  const changeHandler = (event) => {
    setProduct({ ...product, [event.target.name]: event.target.value });
    if (event.target.name === "price") {
      let newVal = parseInt(event.target.value.replace(/\D/g, ""), 10);
      let newVal2 = newVal.toLocaleString();
      if (newVal2 === "NaN") newVal2 = 0;
      setProduct({ ...product, price: newVal2 });
    } else if (event.target.name === "groupId") {
      setProduct({
        ...product,
        [event.target.name]: parseInt(event.target.value),
      });
    } else {
      setProduct({
        ...product,
        [event.target.name]: event.target.value,
      });
    }
  };

  const clickEditHandler = (e) => {
    e.preventDefault();
    if (product.name !== "" && product.price !== "") {
      productsDispatch({
        type: "edit",
        value: {
          id: product.id,
          name: product.name,
          price: parseInt(product.price.replace(/\D/g, "")),
          groupId: parseInt(product.groupId),
        },
      });
    }
  };

  if (product !== null) {
    return (
      <section className="prdContainer">
        <h4>
          ویرایش اطلاعات کالا <span> ( {product.name} )</span>
        </h4>
        <div>
          <input
            type="text"
            name="name"
            className="prdformInput"
            value={product.name}
            onChange={changeHandler}
            placeholder="نام کالا نمی تواند خالی باشد"
          />
          <select
            className="prdformInput"
            name="groupId"
            value={product.groupId}
            onChange={changeHandler}
          >
            {productsGroup.map((pg) => {
              return (
                <option key={pg.id} value={pg.id}>
                  {pg.name}
                </option>
              );
            })}
          </select>
          <input
            type="text"
            name="price"
            value={product.price}
            onChange={changeHandler}
            className="prdformInput"
            placeholder="قیمت نمی تواند خالی باشد"
          />
        </div>
        <div>
          <button className="formBtn" onClick={clickEditHandler}>
            ویرایش
          </button>
        </div>
      </section>
    );
  } else {
    return <></>;
  }
};

export default Product;
