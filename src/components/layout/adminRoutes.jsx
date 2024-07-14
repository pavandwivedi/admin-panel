import React, { useEffect, useState } from "react";
import { useAuth } from "./context";
import axios from "axios";
import { Outlet } from "react-router-dom";
import Spinner from "./spinner";

const AdminRoute = () => {
  const [ok, setOk] = useState(false);
  const { auth } = useAuth();
  

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get("http://157.173.222.27:5000/api/v1/admin", {
          headers: { Authorization: `Bearer ${auth.token}` }
        });
        if (res.data.admin.role==="admin") {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        console.error("Error checking auth:", error);
        setOk(false);
      }
    };

    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner path=" "/>;
};

export default AdminRoute;
