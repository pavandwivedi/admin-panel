import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: ""
  });

  // Set default axios authorization header
  axios.defaults.headers.common['Authorization'] = auth?.token;

  useEffect(() => {
    const data = localStorage.getItem('auth');
    if (data) {
      const parsedData = JSON.parse(data);
      setAuth({
        user: parsedData.user,
        token: parsedData.token
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
const useAuth = () => {
  return useContext(AuthContext);
};

export { useAuth, AuthProvider };
