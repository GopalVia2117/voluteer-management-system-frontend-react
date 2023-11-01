import React, { useEffect, useState } from "react";
import { Person2 } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import http from "../services/http";
import bgImage from "../assets/images/wave-haikei.svg";

const SERVER_URL = process.env.REACT_APP_SERVER_API;
const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const doSubmit = async (e) => {
    e.preventDefault();
    try {
      if (username && password) {
        const { data } = await http.post(`${SERVER_URL}/auth/login.php`, {
          name: username,
          password: password,
        });
        console.log(data);
        setUser(data.data);
        navigate("/");
      } else {
        alert("Missing credentials error");
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="w-full min-h-screen flex justify-center items-center"
    >
      <div className="flex flex-col md:flex-row shadow-md">
        <div className="w-80 flex flex-col items-center justify-center gap-4 shadow-sm p-4 bg-primary text-white rounded-t-md md:rounded-l-md">
          <h1 className="text-4xl font-semibold">Login System</h1>
          <h2 className="hidden md:block text-2xl text-center">
            Imagination Triumphs Vision
          </h2>
        </div>
        <form
          onSubmit={doSubmit}
          encType="multipart/form-data"
          className="w-80 flex flex-col items-center justify-center gap-4 shadow-sm p-4 bg-white rounded-b-md md:rounded-r-md"
        >
          <span className="text-8xl relative text-accent rounded-full shadow-lg bg-transparent">
            <Person2 fontSize="inherit" />
          </span>
          <div className="relative w-full">
            <input
              className="w-full border border-solid border-secondary px-2 py-2 rounded-md outline-none hover:border-gray-500
              focus:border-gray-500"
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.currentTarget.value)}
            />
          </div>
          <div className="relative w-full">
            <input
              className="w-full border border-solid border-secondary px-2 py-2 rounded-md outline-none hover:border-gray-500
              focus:border-gray-500"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
          </div>
          <button type="submit" className="btn-primary">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
