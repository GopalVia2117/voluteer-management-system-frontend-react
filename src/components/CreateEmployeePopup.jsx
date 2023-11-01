import React, { useEffect, useState } from "react";
import http from "../services/http";
import { createPortal } from "react-dom";
import { Person } from "@mui/icons-material";
import { Cancel } from "@mui/icons-material";
import { Create } from "@mui/icons-material";

const CreateEmployeePopup = ({
  show,
  closeModal,
  employees,
  setEmployees,
  totalCount,
  setTotalCount,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const reset = () => {
    setName("");
    setEmail("");
    setPhone("");
    setCity("");
    setState("");
  };

  const SERVER_URL = process.env.REACT_APP_SERVER_API;

  const createEmployee = async () => {
    const newEmployeeCredentials = {
      name,
      email,
      phone,
      city,
      state,
    };

    const originalEmployees = [...employees];
    try {
      if ((name, email, phone, city, state)) {
        let newEmployees = employees;
        newEmployees.unshift(newEmployeeCredentials);
        setEmployees(newEmployees);
        setTotalCount(totalCount + 1);

        const { data } = await http.post(
          `${SERVER_URL}/employees/create.php`,
          newEmployeeCredentials
        );

        let postUpdateEmployees = [...originalEmployees];
        postUpdateEmployees.unshift(data.data);
        setEmployees(postUpdateEmployees);

        reset();
        closeModal();
      } else {
        alert("Missing attribute Error");
      }
    } catch (error) {
      setEmployees(originalEmployees);
      alert(error.message);
    }
  };

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
            <button onClick={createEmployee} className="btn-primary">
              <Create /> Create
            </button>
          </div>
          <button
            className="absolute right-2 top-2"
            onClick={() => {
              reset();
              closeModal();
            }}
          >
            <Cancel />
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("popup")
  );
};

export default CreateEmployeePopup;
