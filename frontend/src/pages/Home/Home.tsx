import { useEffect } from "react";
import { useAppDispatch } from "../../appdata/store";
import { getProducts } from "../../appdata/productsSlice";

function Home() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProducts());
    // eslint-disable-next-line
  }, []);

  return <div className="dark:bg-slate-400">Home</div>;
}

export default Home;
