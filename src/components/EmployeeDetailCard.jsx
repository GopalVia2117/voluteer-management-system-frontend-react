import React from "react";
import { Update, Delete } from "@mui/icons-material";
import { Person } from "@mui/icons-material";
import http from "../services/http";

const SERVER_URL = process.env.REACT_APP_SERVER_API;

const EmployeeDetailCard = ({
  employee,
  setShow,
  employees,
  setEmployees,
  totalCount,
  setTotalCount,
}) => {
  const deleteEmployee = async () => {
    if (employee) {
      let originalEmployees = employees;
      const prevCount = totalCount;
      try {
        const updatedEmployees = employees.filter((e) => e.id !== employee.id);
        setEmployees(updatedEmployees);
        if (totalCount > 0) setTotalCount(totalCount - 1);
        const { data } = await http.delete(
          `${SERVER_URL}/employees/delete.php?id=${employee.id}`
        );
      } catch (error) {
        setEmployees(originalEmployees);
        setTotalCount(prevCount);
        alert(error.message);
      }
    }
  };

  return (
    <div className="w-full flex justify-center bg-secondary flex-grow">
      {employee && (
        <div className="w-full flex flex-col gap-2 items-start justify-center p-4 bg-white">
          <div>
            <Person />
          </div>
          <div className="flex flex-col">
            <span className="text-secondary">Name:</span>
            <span>{employee.name}</span>
          </div>
          <hr className="h-[1px] bg-secondary w-full" />
          <div className="flex flex-col">
            <span className="text-secondary">Email:</span>
            <span>{employee.email}</span>
          </div>
          <hr className="h-[1px] bg-secondary w-full" />

          <div className="flex flex-col">
            <span className="text-secondary">Phone:</span>
            <span>{employee.phone}</span>
          </div>
          <hr className="h-[1px] bg-secondary w-full" />

          <div className="flex flex-col">
            <span className="text-secondary">City:</span>
            <span>{employee.city}</span>
          </div>
          <hr className="h-[1px] bg-secondary w-full" />

          <div className="flex flex-col">
            <span className="text-secondary">State:</span>
            <span>{employee.state}</span>
          </div>
          <hr className="h-[1px] bg-secondary w-full" />

          <div className="flex gap-2">
            <button onClick={setShow} className="btn-primary">
              <Update /> Update
            </button>
            <button
              className="btn-primary bg-red-600 hover:bg-red-500"
              onClick={deleteEmployee}
            >
              <Delete /> Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeDetailCard;
