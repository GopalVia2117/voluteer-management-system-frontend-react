import React from "react";

const TotalEmployee = ({ totalCount }) => {
  return (
    <div className="bg-white w-full p-4">
      <div className="flex flex-col">
        <span className="text-secondary text-xl">Total Employees: </span>
        <span className="text-accent text-4xl font-bold">{totalCount}</span>
      </div>
    </div>
  );
};

export default TotalEmployee;
