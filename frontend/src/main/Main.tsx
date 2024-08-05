import { Navigate, Route, Routes } from "react-router-dom";
import MasterLayout from "../layouts/MasterLayout";
import Home from "../pages/Home/Home";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import ProductList from "../pages/ProductList/ProductList";

function Main() {
  return (
    <Routes>
      <Route path="/" element={<MasterLayout />}>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/product-list/:productType" element={<ProductList />} />
        <Route path="/product-details/:id/:slug" element={<ProductDetails />} />

        <Route path="*" element={<Navigate to="/home" />} />
      </Route>
    </Routes>
  );
}

export default Main;
