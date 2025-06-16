import React, { useEffect } from "react";
import NavBar from "./NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store)=> store.user)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(BASE_URL + "/profile", {
          withCredentials: true,
        });
        const user = response?.data?.data;
        dispatch(addUser(user));
      } catch (err) {
        if ((err.response && err.response.status === 401)) {
          navigate("/login" , { replace: true });
        }
      }
    };
    if(!user) fetchUser();
  },[navigate , dispatch , user]);


  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Body;
