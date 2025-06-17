import axios from 'axios'
import React, { useEffect , useState } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest, removeRequest } from '../utils/requestSlice'

const Requests = () => {
    const dispatch = useDispatch();
    const data = useSelector((store) => store.request)
const [isLoading, setIsLoading] = useState(true);
    const handleRequest = async (status , userId) => {
        try {
            const res = await axios.post(BASE_URL + "/request/review/" + status +"/"+ userId ,{} , {withCredentials : true})
            dispatch(removeRequest(res?.data?.data?._id/**here we send the req id */))
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(()=>{
        const fetchRequest = async () => {
        
        try {
            const res = await axios.get(BASE_URL + "/user/request/pending" , {withCredentials : true});
            dispatch(addRequest(res?.data?.data))
        } catch (err) {
            console.error(err);
        }finally{
            setIsLoading(false)
        }
    }
        fetchRequest();
    } , [dispatch]);
    if (isLoading)
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg text-accent"></span>
            </div>
        );

    if (!data || data.length === 0)
        return (
            <div className="flex justify-center items-center min-h-screen">
                <h2 className="text-2xl text-gray-400">No Pending Requests</h2>
            </div>
        );

  return (
    <div>
      <div className=" flex justify-center">
        <h1 className="p-2 text-3xl text-rose-400 font-bold">Pending Requests</h1>
      </div>
      <div>
        {data.map((element) => {
          const { _id, firstName, lastName, gender, age , photoUrl , about , preferrence} = element.fromUserId;
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
              <div className='flex items-center ml-auto space-x-4 p-8 ]'>
              <button className="btn btn-secondary ml-4 text-lg" onClick={()=>handleRequest("accepted" , _id)}>Accept</button>
              <button className="btn btn-accent ml-4 text-lg" onClick={()=>handleRequest("rejected" , _id)}>Reject</button>
              </div>
            </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Requests