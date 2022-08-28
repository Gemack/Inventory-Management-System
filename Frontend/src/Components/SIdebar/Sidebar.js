import React from "react";
import { Link } from "react-router-dom";
import { AiFillFolderAdd } from "react-icons/ai";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <Link to="/add" className="AddLink">
      <AiFillFolderAdd size={50} /> New Products
    </Link>
  );
};

export default Sidebar;
