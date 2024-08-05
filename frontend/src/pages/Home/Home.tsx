import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="dark:bg-slate-400">
      Home{" "}
      <button
        onClick={() => {
          navigate("/product-list/iPad");
        }}
      >
        hihi
      </button>
    </div>
  );
}

export default Home;
