import { message } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../apiCalls/Users";
import { HideLoading, ShowLoading } from "../redux/loaderSlice";
import { setUser as SetUser } from "../redux/userSlice";

export default function ProtectedRoute({ children }) {
  // High Order Component

  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function getPresentUser() {
    try {
      dispatch(ShowLoading());
      const response = await getCurrentUser();
      dispatch(HideLoading());
      if (response.success) {
        dispatch(SetUser(response.data));
      } else {
        dispatch(SetUser(null));
        message.error(response.message);
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (error) {
      dispatch(HideLoading());
      dispatch(SetUser(null));
      localStorage.removeItem("token");
      message.error(error.message);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getPresentUser(); // Get user information from server
    } else {
      navigate("/login");
    }
  }, []);

  return (
    user && (
      <div className="layout p-1">
        <div className="header bg-primary flex justify-between p-1">
          <div>
            <h1 className="text-2xl text-white cursor-pointer">
              Book My Show {user.isAdmin ? "(Admin)" : ""}
            </h1>
          </div>
          <div className="bg-white p-1 flex gap-1">
          <i className="ri-shield-user-line text-primary mt-1"></i>
            <h1
              className="text-sm underline"
              onClick={() => {
                if (user.isAdmin) {
                  navigate("/admin");
                } else {
                  navigate("/profile");
                }
              }}
            >
              {user.name}
            </h1>

            <i
              className="ri-logout-box-r-line mt-1"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            ></i>
          </div>
        </div>
        <div className="content mt-1 p-1">{children}</div>
      </div>
    )
  );
}
