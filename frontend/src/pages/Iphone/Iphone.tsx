import { useEffect } from "react";
import { getProducts } from "../../appdata/productsSlice";
import { useAppDispatch } from "../../appdata/store";

function Iphone() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProducts());
    // eslint-disable-next-line
  }, []);

  return <div className="dark:bg-slate-400">Iphone</div>;
}

export default Iphone;
