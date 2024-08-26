import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";

function MasterLayout() {
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <Header></Header>
      <Outlet />
    </div>
  );
}

export default MasterLayout;
