import { Flowbite } from "flowbite-react";
import { Provider } from "react-redux";
import AppRoutes from "../src/routers/AppRoutes";
import { store } from "./appdata/store";

function App() {
  return (
    <Provider store={store}>
      <Flowbite>
        <AppRoutes />
      </Flowbite>
    </Provider>
  );
}

export default App;
