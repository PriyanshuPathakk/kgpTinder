import React from "react";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [emailID , setEmailID] = useState("shruti@gmail.com");
    const [password , setPassword] = useState("Shruti@123");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLoginRequest = async () => {
        try {
            const response = await axios.post("http://localhost:3333/login" , {
                emailID,
                password
            },
        {withCredentials : true})
            
            dispatch(addUser(response?.data?.data[0]));
            navigate("/")
        }
        
        
        catch (err) {
            console.error(err)
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
          <div className="card-actions justify-center mt-5">
            <button className="btn text-xl text-white" onClick={handleLoginRequest}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
