import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Dashboard = ({ setAuth }) => {
  const [user, setUser] = useState("");

  const getProfile = async () => {
    try {
      const res = await fetch("https://gray-quaint-jay.cyclic.app/dashboard", {
        method: "POST",
        headers: { token: localStorage.token }
      });

      const parseData = await res.json();
      setUser(parseData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Logout successfully");
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <Fragment>
      <h1 className="mt-5">Dashboard</h1>
      <h2>Welcome {user.username}</h2>
      <p>Email: {user.email}</p>
      <p>City: {user.city}</p>
      <button onClick={e => logout(e)} className="btn btn-primary">
        Logout
      </button>
      <Link to="/">Todos</Link>
    </Fragment>
  );
};

export default Dashboard;
