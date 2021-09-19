import { useState, useRef, useEffect } from "react";
import "./AddNewProduct.css";
import { useProductsActions } from "../Providers/ProductsProvider";
import { useProductGroup } from "../Providers/ProductGroupsProvider";

const initialState = {
  name: "",
  price: 0,
  groupId: 1,
};

const AddNewProduct = ({ children }) => {
  const productsDispatch = useProductsActions();
  const productsGroup = useProductGroup();
  const inputRef = useRef();
  const [inputValues, setInputValues] = useState(initialState);
  const [btnGroupSelected, setBtnGroupSelected] = useState(false);
  const numberFormat = (value) => new Intl.NumberFormat("fa-IR").format(value);

  const clickGroupHandler = () => {
    const status = !btnGroupSelected;
    setBtnGroupSelected(status);
  };
  useEffect(() => {
    setBtnGroupSelected(false);
    inputRef.current.focus();
  }, [productsGroup]);

  // const numberFormat = (value) =>
  //   new Intl.NumberFormat("fa-IR", { maximumSignificantDigits: 3 }).format(
  //     value
  //   );

  const changeHandler = (event) => {
    setInputValues({
      ...inputValues,
      [event.target.name]: event.target.value,
    });
  };

  const submitHandler = (se) => {
    se.preventDefault();
    if (inputValues.name !== "" && inputValues.price !== "") {
      productsDispatch({
        type: "add",
        value: {
          name: inputValues.name,
          price: parseInt(inputValues.price),
          groupId: parseInt(inputValues.groupId),
        },
      });
      inputRef.current.focus();
      setInputValues(initialState);
    }
  };

  return (
    <section className="newproductsContainer">
      <div>
        <h4>پنجره اضافه کردن کالا</h4>
        <div className="rowFlexCenter">
          <button
            className={btnGroupSelected ? "btn2 selected" : "btn2"}
            onClick={clickGroupHandler}
          >
            {btnGroupSelected ? "بستن" : "گروه جدید"}
          </button>

          {/* {btnGroupSelected && <label className="groupLabel"></label>} */}
          {btnGroupSelected && <section>{children}</section>}
        </div>

        <form className="productForm" onSubmit={submitHandler}>
          <section className="formInputs">
            <div>
              <label style={{ marginLeft: "5px", marginBottom: "5px" }}>
                گروه کالا:
              </label>
              <select
                className="formInput"
                name="groupId"
                onChange={changeHandler}
                value={inputValues.groupId}
              >
                {productsGroup.map((pg) => {
                  return (
                    <option key={pg.id} value={pg.id}>
                      {pg.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <label style={{ marginLeft: "5px", marginBottom: "5px" }}>
                نام کالا:
              </label>
              <input
                ref={inputRef}
                type="text"
                name="name"
                className="formInput"
                value={inputValues.name}
                onChange={changeHandler}
                placeholder="نام کالا نمی تواند خالی باشد"
              />
            </div>
            <div>
              <label style={{ marginLeft: "5px", marginBottom: "5px" }}>
                قیمت (ریال):
              </label>
              <input
                type="number"
                name="price"
                className="formInput2"
                value={inputValues.price}
                onChange={changeHandler}
                placeholder="قیمت نمی تواند خالی باشد"
              />
              <span>
                {numberFormat(inputValues.price)}
                <span> ریال</span>
              </span>
            </div>

            <div className="rowFlexCenter">
              <button className="formButton" type="submit">
                اضافه کردن کالا
              </button>
            </div>
          </section>
        </form>
      </div>
    </section>
  );
};

export default AddNewProduct;
