import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import Card from "./Card";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [preferrence, setPreferrence] = useState(user?.preferrence || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [about, setAbout] = useState(user?.about || "");
  const [err, setErr] = useState("");
  const [notification, setNotification] = useState("");
  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, gender, preferrence, photoUrl, about },
        { withCredentials: true }
      );
      if (res?.data?.data) {
        dispatch(addUser(res?.data?.data));
        setErr("");
        setNotification("Updated Succesfully");
        setTimeout(() => {
          setNotification("");
        }, 3000);
      }
    } catch (err) {
      setErr(err?.response?.data);
      console.log(err?.response?.data);
    }
  };
  return (
    <div className="flex justify-center ">
      {notification && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-info">
            <span>{notification}.</span>
          </div>
        </div>
      )}
      <fieldset className="fieldset bg-base-300 border-base-300 rounded-box w-[400px] border p-4 m-4 mt-6">
        <legend className="fieldset-legend text-2xl">Edit Profile</legend>

        <label className="label text-xl">First Name</label>
        <input
          type="text"
          className="input w-[300px]"
          placeholder="Type here..."
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label className="label text-xl">Last Name</label>
        <input
          type="text"
          className="input w-[300px]"
          placeholder="Type here..."
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <label className="label text-xl">Age</label>
        <input
          type="text"
          className="input w-[300px]"
          placeholder="Type here..."
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <label className="label text-xl">Photo URL</label>
        <input
          type="text"
          className="input w-[300px]"
          placeholder="Type here..."
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
        />
        <legend className="fieldset-legend text-xl m-2">Gender</legend>
        <select
          className="select w-[300px] text-lg"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <legend className="fieldset-legend text-xl m-2">Preference</legend>
        <select
          className="select w-[300px] text-lg"
          value={preferrence}
          onChange={(e) => setPreferrence(e.target.value)}
        >
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
          <option>All</option>
        </select>

        <legend className="fieldset-legend text-xl m-2">Your bio</legend>
        <textarea
          className="textarea h-[100px] w-[300px] text-lg"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          placeholder="Bio"
        ></textarea>
        {err && <div className="text-lg text-red-600">{err} </div>}
        <div className="flex justify-center mt-4">
          <button
            className="btn btn-soft btn-secondary text-lg"
            onClick={saveProfile}
          >
            Save Profile
          </button>
        </div>
      </fieldset>
      <Card
        user={{
          firstName,
          lastName,
          age,
          gender,
          preferrence,
          photoUrl,
          about,
        }}
      />
    </div>
  );
};

export default EditProfile;
