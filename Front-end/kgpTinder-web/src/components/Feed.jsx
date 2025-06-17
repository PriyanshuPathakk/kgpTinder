import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import Card from "./Card";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";

const Feed = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!feed || feed.length === 0) {
      const getFeed = async () => {
        try {
          setIsLoading(true);
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
        } finally {
          setIsLoading(false);
        }
      };
      getFeed();
    }
  }, [navigate, dispatch]);
  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-accent"></span>
      </div>
    );

  if (feed.length === 0) return <div className="flex items-center justify-center text-3xl min-h-screen">No more profiles left</div>;
  return (
    <div>
      {feed && feed.length > 0 ? <Card user={feed[0]} /> : <p>Loading...</p>}
    </div>
  );
};
export default Feed;
