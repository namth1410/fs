import { Route, Routes } from "react-router-dom";
import Admin from "../admin/Admin";
import Main from "../main/Main";
import ConnectRedirect from "../pages/ConnectRedirect/ConnectRedirect";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/admin/*" element={<Admin />} />
      <Route path="/connect/google/redirect" element={<ConnectRedirect />} />
      <Route path="*" element={<Main />} />
    </Routes>
  );
}

export default AppRoutes;
