import EditProfile from "./EditProfile";

import { useSelector } from "react-redux";

const Profile = () => {
  //const [user , setUser] = useState(null);
  const user = useSelector((store) => store?.User);

  return (
    user && (
      <div>
        <EditProfile user={user} />
      </div>
    )
  );
};

export default Profile;
