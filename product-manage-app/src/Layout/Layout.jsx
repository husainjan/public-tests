import Footer from "./Footer";
import Header from "./Header";
import "./Layout.css";
import ProductList from "../components/ProductList/ProductList";
import ProductsProvider from "../components/Providers/ProductsProvider";
import ProductGroupsProvider from "../components/Providers/ProductGroupsProvider";

const Layout = () => {
  return (
    <section className="layout">
      <Header />
      <main className="main">
        <ProductsProvider>
          <ProductGroupsProvider>
            <ProductList />
          </ProductGroupsProvider>
        </ProductsProvider>
      </main>
      <Footer />
    </section>
  );
};

export default Layout;
