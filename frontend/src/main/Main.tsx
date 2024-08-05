import { Navigate, Route, Routes } from "react-router-dom";
import MasterLayout from "../layouts/MasterLayout";
import Home from "../pages/Home/Home";
import Iphone from "../pages/Iphone/Iphone";

function Main() {
  return (
    <Routes>
      <Route path="/" element={<MasterLayout />}>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/iphone" element={<Iphone />} />

        <Route path="*" element={<Navigate to="/home" />} />
      </Route>
    </Routes>
  );
}

export default Main;
