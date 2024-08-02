import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";

function MasterLayout() {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
      }}
    >
      <Header></Header>
      <Outlet />
    </div>
  );
}

export default MasterLayout;
