import { createContext, useContext, useReducer } from "react";
const productsInitialState = [
  {
    id: 1,
    name: "فشارسنج دکتر بل",
    price: 5000000,
    groupId: 2,
  },
  {
    id: 2,
    name: "ماست پرچرب کاله 500 گرمی",
    price: 120000,
    groupId: 1,
  },
];

const ProductContext = createContext();
const ProductContextDispatcher = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "add":
      const lastId = state[state.length - 1].id;
      const newProduct = { ...action.value, id: lastId + 1 };
      let newState = [...state];
      newState.push(newProduct);
      return newState;
    default:
      return productsInitialState;
  }
};

const ProductsProvider = ({ children }) => {
  const [productState, productDispatch] = useReducer(
    reducer,
    productsInitialState
  );

  return (
    <ProductContext.Provider value={productState}>
      <ProductContextDispatcher.Provider value={productDispatch}>
        {children}
      </ProductContextDispatcher.Provider>
    </ProductContext.Provider>
  );
};

export default ProductsProvider;

export const useProducts = () => useContext(ProductContext);
export const useProductsActions = () => useContext(ProductContextDispatcher);
