import React from "react";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailID, setEmailID] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [err, setErr] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [gender , setGender] = useState("male")
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUpRequest = async () => {

    if (!firstName || !lastName || !age || !emailID || !password || !gender) {
    setErr("All fields are required");
    return;}
    try {
      
      const res = await axios.post(
        `${BASE_URL}/signUp`,
        {
          firstName,
          lastName,
          age,
          emailID,
          password,
          gender
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data))
      navigate("/profile");
    } catch (error) {
      setErr(error.response.data);
    }
  };

  const handleLoginRequest = async () => {

    if (!emailID || !password ) {
    setErr("All fields are required");
    return;}
    try {
      const response = await axios.post(
        BASE_URL + "/login",
        {
          emailID,
          password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(response?.data?.data[0]));
      navigate("/feed");
    } catch (err) {
      setErr(err.response.data);
    }
  };
  return (
    <div className="flex justify-center py-20">
      <div className="card bg-primary text-primary-content w-96 ">
        <div className="card-body">
          <h2 className="card-title text-3xl">
            {isLogin ? "LOGIN" : "SIGN UP"}
          </h2>
          <fieldset className="fieldset">
            {!isLogin && (
              <>
                <legend className="fieldset-legend pt-2 text-xl py-1">
                  First Name
                </legend>
                <input
                  type="text"
                  className="input mt-1 text-white w-80 mb-5"
                  placeholder="Type here"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <legend className="fieldset-legend pt-2 text-xl py-1">
                  Last Name
                </legend>
                <input
                  type="text"
                  className="input mt-1 text-white w-80 mb-5"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Type here"
                />
                <legend className="fieldset-legend pt-2 text-xl">Age</legend>
                <input
                  type="number"
                  className="input mt-1 text-white w-80 mb-5"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Type here"
                />
                <legend className="fieldset-legend text-xl py-1 ">Gender</legend>
                <select
                  
                  className="select w-[320px] text-lg text-white mb-5 text-opacity-50"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value={""}>Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </>
            )}
            <legend className="fieldset-legend pt-2 text-xl">Email ID</legend>
            <input
              type="email"
              className="input mt-1 text-white w-80 mb-5"
              value={emailID}
              onChange={(e) => setEmailID(e.target.value)}
              placeholder="Type here"
            />
            {/* <p className="label">Optional</p> */}
            <legend className="fieldset-legend pt-2 text-xl">Password</legend>
            <input
              type="password"
              className="input mt-1 text-white w-80 mb-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Type here"
            />
          </fieldset>
          {isLogin && (
            <p>
              <span className="text-lg">Don't have an account? </span>
              <span
                className="text-lg text-pink-600 hover:text-pink-300 hover:cursor-pointer"
                onClick={() => setIsLogin(false)}
              >
                Sign Up here
              </span>
            </p>
          )}
          <div className="text-lg text-red-600">{err}</div>
          <div className="card-actions justify-center mt-5">
            <button
              className="btn text-xl text-white"
              onClick={isLogin ? handleLoginRequest : handleSignUpRequest}
            >
              {isLogin ? "LOGIN" : "SIGN UP"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
