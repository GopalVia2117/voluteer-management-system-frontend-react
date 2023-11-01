import React, { useState, useEffect } from "react";
import EmployeeDetailCard from "../components/EmployeeDetailCard";
import EmployeesDetailTable from "../components/EmployeesDetailTable";
import TotalEmployee from "../components/TotalEmployee";
import Navbar from "../components/Navbar";
import http from "../services/http";
import PopUp from "../components/popup";
import CreateEmployeePopup from "../components/CreateEmployeePopup";

const AdminPanel = () => {
  const SERVER_API_URL = process.env.REACT_APP_SERVER_API;
  const [employees, setEmployees] = useState([]);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [show, setShow] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(
    JSON.parse(localStorage.getItem("per_pages")) || 25
  );

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const { data } = await http.get(
          `${SERVER_API_URL}/employees/read.php?offset=${
            (page - 1) * perPage
          }&limit=${perPage}`
        );
        console.log(data);
        setTotalCount(data.totalCount);
        setEmployees(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEmployees();
  }, [page, perPage]);

  useEffect(() => {
    console.log(employees.length);
    console.log(page);
    if (totalCount > 0 && employees.length === 0) {
      setPage(1);
    }
    if (totalCount > 0) {
      setCurrentEmployee(employees[0]);
    }
  }, [employees]);

  return (
    <div className="bg-secondary">
      <div>
        <Navbar setShowCreateModal={setShowCreateModal} />
      </div>
      <div className="flex flex-col lg:flex-row gap-2 p-2">
        <div
          // style={{ height: "calc(100vh - 6rem)" }}
          className="w-full lg:h-[calc(100vh-6rem)] lg:w-1/4 flex flex-col gap-2 overflow-y-auto"
        >
          <TotalEmployee totalCount={totalCount} />
          {employees && employees.length > 0 && (
            <EmployeeDetailCard
              employee={currentEmployee}
              setShow={setShow}
              employees={employees}
              setEmployees={setEmployees}
              totalCount={totalCount}
              setTotalCount={setTotalCount}
            />
          )}
        </div>
        <div
          style={{ height: "calc(100vh - 6rem)" }}
          className="w-full lg:w-3/4 h-full overflow-y-auto"
        >
          <EmployeesDetailTable
            employees={employees}
            setCurrentEmployee={setCurrentEmployee}
            totalCount={totalCount}
            page={page}
            setPage={setPage}
            perPage={perPage}
            setPerPage={setPerPage}
          />
        </div>
      </div>
      {/* employee update model  */}
      <PopUp
        show={show}
        closeModal={() => setShow(false)}
        employee={currentEmployee}
        employees={employees}
        setEmployees={setEmployees}
      />
      {/* employee create model  */}
      <CreateEmployeePopup
        show={showCreateModal}
        closeModal={() => setShowCreateModal(false)}
        totalCount={totalCount}
        setTotalCount={setTotalCount}
        employees={employees}
        setEmployees={setEmployees}
      />
    </div>
  );
};

export default AdminPanel;
