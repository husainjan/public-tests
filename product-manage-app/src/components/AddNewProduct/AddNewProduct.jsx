import { useState, useRef, useEffect } from "react";
import "../../Layout/Layout.css";
import { useProductsActions } from "../Providers/ProductsProvider";
import { useProductGroup } from "../Providers/ProductGroupsProvider";

const initialState = {
  name: "",
  price: "",
  groupId: 1,
};

const AddNewProduct = ({ children }) => {
  const productsDispatch = useProductsActions();
  const productsGroup = useProductGroup();
  const inputRef = useRef();
  const [inputValues, setInputValues] = useState(initialState);
  const [btnGroupSelected, setBtnGroupSelected] = useState(false);

  const clickGroupHandler = () => {
    const status = !btnGroupSelected;
    setBtnGroupSelected(status);
  };
  useEffect(() => {
    setBtnGroupSelected(false);
  }, [productsGroup]);

  // const numberFormat = (value) =>
  //   new Intl.NumberFormat("fa-IR", { maximumSignificantDigits: 3 }).format(
  //     value
  //   );

  const changeHandler = (event) => {
    if (event.target.name === "price") {
      let newVal = parseInt(event.target.value.replace(/\D/g, ""), 10);
      let newVal2 = newVal.toLocaleString();
      setInputValues({ ...inputValues, price: newVal2 });
    } else {
      setInputValues({
        ...inputValues,
        [event.target.name]: event.target.value,
      });
    }
  };

  const addHandler = (e) => {
    e.preventDefault();
    if (inputValues.name !== "" && inputValues.price !== "") {
      productsDispatch({
        type: "add",
        value: {
          name: inputValues.name,
          price: parseInt(inputValues.price.replace(/\D/g, "")),
          groupId: parseInt(inputValues.groupId),
        },
      });
      inputRef.current.focus();
    }
    setInputValues(initialState);
  };
  return (
    <section className="">
      <div className="productsContainer">
        <h4>پنجره اضافه کردن کالا</h4>
        <form className="productForm" onSubmit={addHandler}>
          <section className="formlabel">
            <label style={{ marginLeft: "5px", marginBottom: "5px" }}>
              گروه کالا:
            </label>
            <label style={{ marginLeft: "5px", marginBottom: "5px" }}>
              نام کالا:
            </label>
            <label style={{ marginLeft: "5px", marginBottom: "5px" }}>
              قیمت (ریال):
            </label>
          </section>
          <section className="formInputs">
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
            <input
              ref={inputRef}
              type="text"
              name="name"
              className="formInput"
              value={inputValues.name}
              onChange={changeHandler}
            />
            <input
              type="text"
              name="price"
              className="formInput"
              value={inputValues.price}
              onChange={changeHandler}
            />

            <div className="rowFlexCenter">
              <button className="formButton" type="submit">
                اضافه کردن کالا
              </button>
            </div>
          </section>
          <section>
            <button
              className={btnGroupSelected ? "btn selected" : "btn"}
              onClick={clickGroupHandler}
            >
              {btnGroupSelected ? "بستن" : "گروه جدید"}
            </button>
          </section>
        </form>
        {btnGroupSelected && <section>{children}</section>}
      </div>
    </section>
  );
};

export default AddNewProduct;
