import MasterLayout from "../layouts/MasterLayout";
import Home from "../pages/Home/Home";
import { Navigate, Route, Routes } from "react-router-dom";

function Main() {
  return (
    <Routes>
      <Route path="/" element={<MasterLayout />}>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />

        <Route path="*" element={<Navigate to="/home" />} />
      </Route>
    </Routes>
  );
}

export default Main;
