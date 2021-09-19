import { useState, useRef, useEffect } from "react";
import "./AddNewGroup.css";
import { useProductGroupActions } from "../Providers/ProductGroupsProvider";

const AddNewGroup = () => {
  const productGroupDispatch = useProductGroupActions();
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const changeHandler = (event) => {
    setInputValue(event.target.value);
  };

  const addHandler = (e) => {
    e.preventDefault();
    if (inputValue !== "") {
      productGroupDispatch({ type: "add", value: inputValue });
      inputRef.current.focus();
    }
    setInputValue("");
  };

  return (
    <section>
      <div className="GroupsContainer">
        <h5>اضافه کردن گروه کالا</h5>
        <form style={{ padding: "5px 15px" }} onSubmit={addHandler}>
          <label style={{ marginLeft: "5px" }}>نام گروه کالا:</label>
          <input
            ref={inputRef}
            type="text"
            className="formInput"
            value={inputValue}
            onChange={changeHandler}
          />
          <button className="formGroupButton" type="submit">
            افزودن گروه
          </button>
        </form>

        {/* <div className="productGroupList">
          {productsGroup.map((pg) => {
            return (
              <div key={pg.id} style={{ padding: "5px 10px" }}>
                <p className="group">
                  <span>{pg.id}- </span>
                  {pg.name}
                </p>
              </div>
            );
          })}
        </div> */}
      </div>
    </section>
  );
};

export default AddNewGroup;
