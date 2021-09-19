import { useContext, useReducer, createContext } from "react";

let productGroupInitialState = [
  {
    id: 1,
    name: "لبنیات",
  },
  {
    id: 2,
    name: "تجهیزات پزشکی",
  },
];

const ProductGroupContext = createContext();
const ProductGroupContextDispatcher = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "add":
      const lastId = state[state.length - 1].id;
      const newGroup = { id: lastId + 1, name: action.value };
      let newState = [...state];
      newState.push(newGroup);
      localStorage.setItem("groups", JSON.stringify(newState));
      return newState;
    default:
      return productGroupInitialState;
  }
};

const ProductGroupsProvider = ({ children }) => {
  if (localStorage.getItem("groups")) {
    productGroupInitialState = [...JSON.parse(localStorage.getItem("groups"))];
  }
  const [productGroupState, productGroupDispatch] = useReducer(
    reducer,
    productGroupInitialState
  );

  return (
    <ProductGroupContext.Provider value={productGroupState}>
      <ProductGroupContextDispatcher.Provider value={productGroupDispatch}>
        {children}
      </ProductGroupContextDispatcher.Provider>
    </ProductGroupContext.Provider>
  );
};

export default ProductGroupsProvider;

export const useProductGroup = () => useContext(ProductGroupContext);
export const useProductGroupActions = () =>
  useContext(ProductGroupContextDispatcher);
