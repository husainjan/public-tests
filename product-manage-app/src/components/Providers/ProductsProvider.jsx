import { createContext, useContext, useReducer } from "react";
// const productsInitialState = [
//   {
//     id: 1,
//     name: "فشارسنج بی ول B.Well",
//     price: 5000000,
//     groupId: 2,
//   },
//   {
//     id: 2,
//     name: "ماست پرچرب کاله 500 گرمی",
//     price: 120000,
//     groupId: 1,
//   },
// ];
let productsInitialState = [];

const ProductContext = createContext();
const ProductContextDispatcher = createContext();

const ProductsProvider = ({ children }) => {
  if (localStorage.getItem("products")) {
    productsInitialState = [...JSON.parse(localStorage.getItem("products"))];
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case "add": {
        let lastId = 0;
        if (state && state.length > 0) {
          lastId = state[state.length - 1].id;
        }
        console.log(lastId);
        const newProduct = { ...action.value, id: lastId + 1 };
        let newState = [...state];
        newState.push(newProduct);
        localStorage.setItem("products", JSON.stringify(newState));
        return newState;
      }
      case "edit": {
        let Items = [...state];
        const index = Items.findIndex((p) => p.id === action.value.id);
        Items[index] = { ...action.value };
        localStorage.setItem("products", JSON.stringify(Items));
        return Items;
      }
      case "delete": {
        const newState = state.filter((p) => p.id !== action.value.id);
        localStorage.setItem("products", JSON.stringify(newState));
        return newState;
      }
      default:
        return productsInitialState;
    }
  };

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
