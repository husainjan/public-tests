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
    if (event.target.name === "price") {
      if (isNaN(event.target.value)) {
        event.target.value = "";
      }
    }
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
          price: inputValues.price,
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
              <button
                className={btnGroupSelected ? "btn selected" : "btn"}
                onClick={clickGroupHandler}
              >
                {btnGroupSelected ? "بستن" : "گروه جدید"}
              </button>
              {btnGroupSelected && <section>{children}</section>}
              {/* {btnGroupSelected && <label className="groupLabel"></label>} */}
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
                type="text"
                name="price"
                className="formInput2"
                value={inputValues.price}
                onChange={changeHandler}
                onFocus={(e) => (e.target.value = "")}
                placeholder="قیمت نمی تواند خالی باشد"
              />
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
