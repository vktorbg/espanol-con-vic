import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Login from "../components/Login";

const LoginPage = () => {
  const [isOpen, setIsOpen] = useState(true); // Login modal opens immediately

  return (
    <>
      <Navbar />
      {isOpen && <Login onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default LoginPage;
