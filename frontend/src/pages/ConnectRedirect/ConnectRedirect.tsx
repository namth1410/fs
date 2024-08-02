import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import { setUser } from "../../appdata/myselfSlice";

const ConnectRedirect: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const accessToken = urlParams.get("access_token");

    if (accessToken) {
      fetch(
        `${process.env.REACT_APP_API_URL}/api/auth/google/callback?access_token=${accessToken}`
      )
        .then((response) => response.json())
        .then((data) => {
          dispatch(setUser({ user: data.user, token: data.jwt }));
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.jwt);
          navigate("/home");
        })
        .catch((error) => {
          console.error("Error during authentication callback:", error);
          navigate("/error");
        });
    }
  }, [location.search, navigate, dispatch]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <BeatLoader color="#36d7b7" />
        <p className="mt-4 text-lg text-gray-700">
          Đang chuyển hướng, vui lòng chờ...
        </p>
      </div>
    </div>
  );
};

export default ConnectRedirect;
