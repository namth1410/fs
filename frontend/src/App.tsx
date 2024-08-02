import { Provider } from "react-redux";
import AppRoutes from "../src/routers/AppRoutes";
import { store } from "./appdata/store";

function App() {
  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  );
}

export default App;
