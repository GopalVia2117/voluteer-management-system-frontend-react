import React from "react";
import { Add } from "@mui/icons-material";

const Navbar = ({ setShowCreateModal }) => {
  return (
    <nav className="w-full max-h-24 flex justify-between bg-white p-4">
      <div>
        <h1 className="text-2xl font-bold">VMS</h1>
      </div>
      <div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="btn-primary"
        >
          Create A Member <Add />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
