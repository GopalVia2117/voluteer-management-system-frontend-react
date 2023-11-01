import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";

const EmployeesDetailTable = ({
  employees,
  setCurrentEmployee,
  totalCount,
  perPage,
  setPerPage,
  page,
  setPage,
}) => {
  return (
    <section className="w-full antialiased bg-gray-100 text-gray-600">
      {employees && employees.length > 0 && (
        <div className="flex flex-col h-full">
          <div className="w-full mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
            <header className="p-3 border-b border-gray-100 flex flex-col lg:flex-row justify-between">
              <h2 className="font-semibold text-gray-800">Employees</h2>
              <Pagination
                totalCount={totalCount}
                perPage={perPage}
                page={page}
                setPerPage={setPerPage}
                setPage={setPage}
              />
            </header>
            <div className="p-3">
              <div className="overflow-x-auto">
                <table className="table-auto w-full">
                  <thead className="text-xs font-semibold uppercase text-secondary bg-gray-50">
                    <tr>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Name</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Email</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Phone</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">City</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">State</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-100">
                    {employees &&
                      employees.map((employee, index) => (
                        <tr
                          key={index}
                          className="hover:bg-gray-50 cursor-pointer"
                          onClick={() => setCurrentEmployee(employee)}
                        >
                          <td className="p-2 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="font-medium text-gray-800">
                                {employee.name}
                              </div>
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-left">{employee.email}</div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-left text-primary">
                              {employee.phone}
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-center">{employee.city}</div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-center">{employee.state}</div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {employees && employees.length == 0 && (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-6xl text-secondary p-2">No Record Found</div>
        </div>
      )}
    </section>
  );
};

{
  /* <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                          <img
                            className="rounded-full"
                            src="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-05.jpg"
                            width="40"
                            height="40"
                            alt="Alex Shatov"
                          />
                        </div> */
}

export default EmployeesDetailTable;
