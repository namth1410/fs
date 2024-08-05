import { useEffect } from "react";
import { getProducts } from "../../appdata/productsSlice";
import { useAppDispatch } from "../../appdata/store";
import { useNavigate } from "react-router-dom";

function Home() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProducts());
    // eslint-disable-next-line
  }, []);

  return (
    <div className="dark:bg-slate-400">
      Home{" "}
      <button
        onClick={() => {
          navigate("/iphone");
        }}
      >
        hihi
      </button>
    </div>
  );
}

export default Home;
