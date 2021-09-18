import { useState, useEffect } from "react";
import { useProductGroup } from "../Providers/ProductGroupsProvider";
import { useProducts } from "../Providers/ProductsProvider";

import styles from "./ProductList.module.css";
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
      {/* <section>
        <section>
          <button
            name="productGroup"
            onClick={clickHandler}
            className={
              btnSelected.btn2
                ? "btn headerButtonGroup selected"
                : "btn headerButtonGroup"
            }
          >
            {btnSelected.btn2 ? "بستن گروه کالا" : "اضافه کردن گروه کالا"}
          </button>
        </section>
        {btnSelected.btn2 && <AddNewGroup />}
      </section> */}

      <h3 style={{ marginTop: "30px", marginBottom: "10px" }}>لیست محصولات</h3>

      <section className="main2">
        <section>
          <button
            name="product"
            onClick={clickHandler}
            className={btnSelected ? "btn  selected" : "btn "}
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

      <section className={styles.productsContainer}>
        <div
          className={`${styles.productContainer} ${styles.productHeaderContainer} ${styles.bolded}`}
        >
          <p className={styles.productsHeaderPadding}>ردیف</p>
          <p className={styles.productsHeaderPadding}>نام کالا</p>
          <p className={styles.productsHeaderPadding}>گروه کالا</p>
          <p className={styles.productsHeaderPadding}>قیمت(ریال)</p>
          <p className={styles.productsHeaderPadding}>تغییرات</p>
        </div>
        {products.map((product, index) => {
          return (
            <div key={product.id} className={`${styles.productContainer}`}>
              <p className={`${styles.productsPadding} ${styles.centered}`}>
                {index + 1}
              </p>
              <p className={styles.productsPadding}>{product.name}</p>
              <p className={styles.productsPadding}>
                {Object.values(
                  productsGroup.find((pg) => pg.id === product.groupId)
                ).pop()}
              </p>
              <p className={`${styles.productsPadding} ${styles.rtol}`}>
                {numberFormat(product.price)}
              </p>
              <div className={`${styles.icons} ${styles.productsPadding}`}>
                <FaRegEdit className={styles.edit} />
                <FaTrashAlt className={styles.delete} />
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default ProductList;
