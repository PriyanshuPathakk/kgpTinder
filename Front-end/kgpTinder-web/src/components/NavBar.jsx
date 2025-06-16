import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.User);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async ()=>{
    try{
    await axios.post(BASE_URL + "/logout" , null , {withCredentials: true});
    dispatch(removeUser())
    return navigate("/login" , {replace : true})
  }
  catch(err){
    console.error(err.message)
  }
  }

  return (
    <div className="navbar bg-base-300 shadow-sm !h-28">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">KGP Sparks</a>
      </div>
      <div className="flex gap-2">
        <div className="dropdown dropdown-end mx-4">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar  w-16 h-16"
          >
            <div className="w-16 object-cover h-16 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src={
                  user?.photoUrl ||
                  "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                }
              />
            </div>
          </div>
          <div className="w-24 truncate">
            {(user && user?.firstName + " " + user?.lastName) || ""}
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to={"/profile"} className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <Link to={"/connections"}>Connections</Link>
            </li>
             <li>
              <Link to={"/requests"}>Requests</Link>
            </li>
            <li>
              <a onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default NavBar;
