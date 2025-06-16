const Card = ({user}) => {
  return (
    <div className="flex justify-center mt-10">
    <div className="card bg-slate-950 w-96 shadow-xl py-6 px-6">
      <figure>
        <img className="rounded-xl w-96 object-contain"
          src = {user?.photoUrl}
          alt="User"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-2xl">{user?.firstName + " " + user?.lastName}</h2>
        <div className="text-lg">Age : {user?.age} years</div>
        <div className="text-lg">Gender : {user?.gender}</div>
        <div className="text-lg">Preference : {user?.preferrence}</div>
        <p className="text-lg">
          About : {user?.about || "Not Provided"}
        </p>
        <div className="card-actions justify-between">
          <button className="btn btn-primary w-20 text-xl p-2 mt-4">Pass</button>
          <button className="btn btn-secondary w-25 text-xl p-2 mt-4">Interested</button>
        </div>
      </div>
    </div>
    </div>
  );
};
export default Card;
