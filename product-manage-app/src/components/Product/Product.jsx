import { useEffect, useRef } from "react";
import { useProductGroup } from "../Providers/ProductGroupsProvider";
import { useProductsActions } from "../Providers/ProductsProvider";

import "./Product.css";

const Product = ({ product, setProduct, setBtnEditSelected }) => {
  const productsGroup = useProductGroup();
  const productsDispatch = useProductsActions();
  const numberFormat = (value) => new Intl.NumberFormat("fa-IR").format(value);
  const editRef = useRef();

  useEffect(() => {
    editRef.current.focus();
  }, [product.id]);

  const cancelHandler = () => {
    setBtnEditSelected(false);
  };
  const changeHandler = (event) => {
    if (event.target.name === "groupId") {
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

  const submitEditHandler = (e) => {
    e.preventDefault();
    if (product.name !== "" && product.price !== "") {
      productsDispatch({
        type: "edit",
        value: {
          id: product.id,
          name: product.name,
          price: parseInt(product.price),
          groupId: parseInt(product.groupId),
        },
      });
      setBtnEditSelected(false);
    }
  };

  if (product !== null) {
    return (
      <section className="prdContainer">
        <h4>ویرایش اطلاعات کالا</h4>
        <form onSubmit={submitEditHandler}>
          <div>
            <input
              ref={editRef}
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
              type="number"
              name="price"
              value={product.price}
              onChange={changeHandler}
              className="prdformInput"
              placeholder="قیمت نمی تواند خالی باشد"
            />
            <span>
              {numberFormat(product.price)}
              <span> ریال</span>
            </span>
          </div>
          <div>
            <button className="formBtn" type="submit">
              ویرایش
            </button>
            <button className="formBtnCancel" onClick={cancelHandler}>
              لغو
            </button>
          </div>
        </form>
      </section>
    );
  } else {
    return <></>;
  }
};

export default Product;
