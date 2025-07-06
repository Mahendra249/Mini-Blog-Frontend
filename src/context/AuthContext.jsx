import { createContext, useContext, useEffect, useState } from "react";
import { fetchData } from "../api/ClientFunction";
import useSWR from "swr";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const token = localStorage.getItem("token");
  const isLogin = !!token;

  const { data, isLoading, error } = useSWR(
    isLogin ? "/auth/userinfo" : null, // <--- this disables SWR if not logged in
    fetchData
  );

  useEffect(() => {
    setUser(data?.user);
  }, [data?.user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
