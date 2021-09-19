import { useState, useEffect } from "react";
import { useProductGroup } from "../Providers/ProductGroupsProvider";
import { useProducts } from "../Providers/ProductsProvider";

import "./ProductList.css";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import AddNewGroup from "../AddNewGroup/AddNewGroup";
import AddNewProduct from "../AddNewProduct/AddNewProduct";

const ProductList = () => {
  const [btnSelected, setBtnSelected] = useState(false);
  const products = useProducts();
  const productsGroup = useProductGroup();
  const numberFormat = (value) =>
    new Intl.NumberFormat("fa-IR", { maximumSignificantDigits: 3 }).format(
      value
    );

  useEffect(() => {
    setBtnSelected(false);
  }, [products]);

  const clickHandler = () => {
    const status = !btnSelected;
    setBtnSelected(status);
  };

  return (
    <>

      <h3 style={{ marginTop: "30px", marginBottom: "10px" }}>لیست محصولات</h3>

      <section className="main2">
        <section>
          <button
            name="product"
            onClick={clickHandler}
            className={btnSelected ? "btn selected" : "btn"}
          >
            {btnSelected ? "بستن" : "افزودن کالای جدید"}
          </button>
        </section>
        {btnSelected && (
          <AddNewProduct>
            <AddNewGroup />
          </AddNewProduct>
        )}
      </section>

      <section className="productsContainer">
        <div
          className="productContainer productHeaderContainer bolded"
        >
          <p className="productsHeaderPadding">ردیف</p>
          <p className="productsHeaderPadding">نام کالا</p>
          <p className="productsHeaderPadding">گروه کالا</p>
          <p className="productsHeaderPadding">قیمت(ریال)</p>
          <p className="productsHeaderPadding">تغییرات</p>
        </div>
        {products.map((product, index) => {
          return (
            <div key={product.id} className="productContainer">
              <p className="productsPadding centered">
                {index + 1}
              </p>
              <p className="productsPadding">{product.name}</p>
              <p className="productsPadding">
                {Object.values(
                  productsGroup.find((pg) => pg.id === product.groupId)
                ).pop()}
              </p>
              <p className="productsPadding rtol">
                {numberFormat(product.price)}
              </p>
              <div className="productsPadding icons">
                <FaRegEdit className="edit" />
                <FaTrashAlt className="delete" />
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default ProductList;
