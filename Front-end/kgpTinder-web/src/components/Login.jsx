import React from "react";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
    const [emailID , setEmailID] = useState("shruti@gmail.com");
    const [password , setPassword] = useState("Shruti@123");
    const [err , setErr] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLoginRequest = async () => {
        try {
            const response = await axios.post(BASE_URL + "/login" , {
                emailID,
                password
            },
        {withCredentials : true})
            
            dispatch(addUser(response?.data?.data[0]));
            navigate("/feed")
        }
        
        
        catch (err) {
            setErr(err.response.data);
        }
    }
  return (
    <div className="flex justify-center py-20">
      <div className="card bg-primary text-primary-content w-96 ">
        <div className="card-body">
          <h2 className="card-title text-3xl">LOGIN</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend pt-2 text-xl">Email ID</legend>
            <input type="text" className="input mt-1 text-white w-80 mb-5" value={emailID} onChange={(e)=> (setEmailID(e.target.value))} placeholder="Type here" />
            {/* <p className="label">Optional</p> */}
            <legend className="fieldset-legend pt-2 text-xl">Password</legend>
            <input type="text" className="input mt-1 text-white w-80 mb-2" value={password} onChange={(e)=> (setPassword(e.target.value))} placeholder="Type here" />
          </fieldset>
          <div className="text-lg text-red-700">{err}</div>
          <div className="card-actions justify-center mt-5">
            <button className="btn text-xl text-white" onClick={handleLoginRequest}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
