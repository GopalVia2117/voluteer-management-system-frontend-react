import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Update, Delete } from "@mui/icons-material";
import { Person } from "@mui/icons-material";
import { Cancel } from "@mui/icons-material";
import http from "../services/http";

const PopUp = ({ show, closeModal, employee, employees, setEmployees }) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const reset = () => {
    setId("");
    setName("");
    setEmail("");
    setPhone("");
    setCity("");
    setState("");
  };

  const SERVER_URL = process.env.REACT_APP_SERVER_API;

  const updateEmployee = async () => {
    if (employee) {
      const updatedEmployeeCredentials = {
        id,
        name,
        email,
        phone,
        city,
        state,
      };

      let originalEmployees = employees;

      try {
        if ((name, email, phone, city, state)) {
          const updatedEmployees = employees.map((e) =>
            e.id === id ? (e = updatedEmployeeCredentials) : e
          );
          setEmployees(updatedEmployees);

          const { data } = await http.put(
            `${SERVER_URL}/employees/update.php?id=${id}`,
            updatedEmployeeCredentials
          );
          reset();
          closeModal();
        } else {
          alert("Missing attribute Error");
        }
      } catch (error) {
        setEmployees(originalEmployees);
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    if (employee) {
      setId(employee.id);
      setName(employee.name);
      setEmail(employee.email);
      setPhone(employee.phone);
      setCity(employee.city);
      setState(employee.state);
    }
  }, [employee]);

  if (!show) return null;
  return createPortal(
    <div
      className="w-full h-screen absolute top-0 left-0 bg-gray-900/70
    backdrop-blur-md flex justify-center items-center"
    >
      <div className="w-80 relative">
        <div className="w-full flex flex-col gap-2 items-start justify-center p-4 bg-white">
          <div>
            <Person />
          </div>
          <div className="flex flex-col">
            <span className="text-secondary">Name:</span>
            <input
              autoFocus={true}
              type="text"
              value={name}
              className="outline-none"
              onChange={(e) => setName(e.currentTarget.value)}
            />
          </div>
          <hr className="h-[1px] bg-secondary w-full" />
          <div className="flex flex-col">
            <span className="text-secondary">Email:</span>
            <input
              type="text"
              value={email}
              className="outline-none"
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
          </div>
          <hr className="h-[1px] bg-secondary w-full" />

          <div className="flex flex-col">
            <span className="text-secondary">Phone:</span>
            <input
              type="text"
              value={phone}
              className="outline-none"
              onChange={(e) => setPhone(e.currentTarget.value)}
            />
          </div>
          <hr className="h-[1px] bg-secondary w-full" />

          <div className="flex flex-col">
            <span className="text-secondary">City:</span>
            <input
              type="text"
              value={city}
              className="outline-none"
              onChange={(e) => setCity(e.currentTarget.value)}
            />
          </div>
          <hr className="h-[1px] bg-secondary w-full" />

          <div className="flex flex-col">
            <span className="text-secondary">State:</span>
            <input
              type="text"
              value={state}
              className="outline-none"
              onChange={(e) => setState(e.currentTarget.value)}
            />
          </div>
          <hr className="h-[1px] bg-secondary w-full" />

          <div className="flex gap-2">
            <button onClick={updateEmployee} className="btn-primary">
              <Update /> Update
            </button>
          </div>
          <button className="absolute right-2 top-2" onClick={closeModal}>
            <Cancel />
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("popup")
  );
};

export default PopUp;
