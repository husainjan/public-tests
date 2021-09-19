import { useState, useEffect } from "react";
import { useProductGroup } from "../Providers/ProductGroupsProvider";
import { useProducts, useProductsActions } from "../Providers/ProductsProvider";

import "./ProductList.css";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import AddNewGroup from "../AddNewGroup/AddNewGroup";
import AddNewProduct from "../AddNewProduct/AddNewProduct";
import Product from "../Product/Product";

const ProductList = () => {
  const [btnSelected, setBtnSelected] = useState(false);
  const [btnEditSelected, setBtnEditSelected] = useState(false);
  const [product, setProduct] = useState({});
  const products = useProducts();
  const productsDispatch = useProductsActions();
  const productsGroup = useProductGroup();
  const numberFormat = (value) => new Intl.NumberFormat("fa-IR").format(value);
  useEffect(() => {
    setBtnSelected(false);
    setBtnEditSelected(false);
  }, [products]);

  const clickHandler = () => {
    const status = !btnSelected;
    setBtnSelected(status);
  };
  const editHandler = (id) => {
    setProduct(products.find((p) => p.id === id));
    setBtnEditSelected(true);
  };

  const deleteHandler = (id) => {
    productsDispatch({
      type: "delete",
      value: {
        id: id,
      },
    });
  };

  const renderProducts = () => {
    let renderedElements = <p>محصولی موجود نمی باشد</p>;
    console.log(products.length, products);
    if (products && products.length > 0) {
      renderedElements = (
        <>
          {btnEditSelected && (
            <Product product={product} setProduct={setProduct} />
          )}
          <section className="productsContainer">
            <div className="productContainer productHeaderContainer bolded">
              <p className="productsHeaderPadding">ردیف</p>
              <p className="productsHeaderPadding">نام کالا</p>
              <p className="productsHeaderPadding">گروه کالا</p>
              <p className="productsHeaderPadding">قیمت(ریال)</p>
              <p className="productsHeaderPadding">تغییرات</p>
            </div>
            {products &&
              products.map((product, index) => {
                return (
                  <div key={product.id} className="productContainer">
                    <p className="productsPadding centered">{index + 1}</p>
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
                      <div onClick={() => editHandler(product.id)}>
                        <FaRegEdit className="edit" />
                      </div>
                      <div onClick={() => deleteHandler(product.id)}>
                        <FaTrashAlt className="delete" />
                      </div>
                    </div>
                  </div>
                );
              })}
          </section>
        </>
      );
    }

    return renderedElements;
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
      {renderProducts()}
    </>
  );
};

export default ProductList;
