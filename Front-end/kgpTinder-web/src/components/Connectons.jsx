import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import { useNavigate } from "react-router-dom";

const Connectons = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);
  const navigate = useNavigate()
  useEffect(() => {
    const getConnections = async () => {
      try {
        const res = await axios.get(BASE_URL + "/user/connections", {
          withCredentials: true,
        });
        const connections = res?.data?.data;
        dispatch(addConnection(connections));
      } catch (err) {
        console.error(err);
        if (err.response?.status === 401) {
            navigate("/login", { replace: true });
          }
      }
    };
    getConnections();
  }, [dispatch , navigate]);
  if (!connections || connections.length === 0)
    return <div className="flex justify-center items-center min-h-screen"><span className="loading loading-spinner loading-lg text-accent"></span></div>;

  return (
    <div>
      <div className=" flex justify-center">
        <h1 className="p-2 text-3xl text-rose-400 font-bold">Your Connections</h1>
      </div>
      <div>
        {connections.map((connection) => {
          const { _id, firstName, lastName, gender, age, photoUrl , about , preferrence} =connection;
          return (
            <div key={_id} className="flex justify-center">
            <div  className="bg-neutral-900 rounded-3xl p-2 my-5 shadow-lg flex w-5/12 ">
              <div className="avatar py-3 px-4">
                <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2">
                  <img src={photoUrl} />
                </div>
              </div>
              <ul className="px-4">
                <li className="text-xl p-0.5 ">{firstName + " " + lastName}</li>
                <li className="text-xl p-0.5 ">{age + " , " +gender}</li>
                <li className="text-xl p-0.5">Preference : {preferrence}</li>
                {about && <li className="text-xl p-0.5 ">About : {about}</li>}

              </ul>
              
            </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connectons;
