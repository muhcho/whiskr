import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import User from "../components/User";

export default function UpdatePage() {
  const { id } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    const data = localStorage.getItem("users"); // get data from local storage
    const usersData = JSON.parse(data) || []; // parse the data from string to javascript array
    const user = usersData.find(user => user.id === id); // find the user with the id from the params
    console.log(user);
    setUser(user); // set the user state with the data from local storage
  }, [id]); // <--- "[id]" VERY IMPORTANT!!!

  return (
    <div id="user-page" className="page">
      <div className="container">
        <h1>{user.name}</h1>
        <User user={user} />
        <div className="btns">
          <button className="btn-cancel">Delete user</button>
          <button>Update user</button>
        </div>
      </div>
    </div>
  );
}
