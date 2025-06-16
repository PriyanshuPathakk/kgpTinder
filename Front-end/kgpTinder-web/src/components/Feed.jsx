import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import Card from "./Card";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";

const Feed = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  useEffect(() => {
    if (!feed || feed.length === 0) {
      const getFeed = async () => {
        try {
          const res = await axios.get(BASE_URL + "/feed", {
            withCredentials: true,
          });
          const feed = res?.data?.data;
          dispatch(addFeed(feed));
        } catch (error) {
          console.error(error.message);
          if (error.response?.status === 401) {
            navigate("/login", { replace: true });
          }
        }
      };
      getFeed();
    }
  }, [navigate, dispatch]);
  return (
    <div>
      {feed && feed.length > 0 ? <Card user={feed[0]} /> : <p>Loading...</p>}
    </div>
  );
};
export default Feed;
