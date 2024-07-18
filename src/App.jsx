import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import SignUp from "./pages/Auth/SignUp";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/Dashboard/Dashboard"
import AdminRoute from "./components/layout/adminRoutes";
const App = () => {
  return (
    <>
      <Router>
        <Routes>
        {/* <Route path="/" element={<SignUp />} /> */}
        <Route path="/" element={<Login />} />
          <Route path="/admin" element={<AdminRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
