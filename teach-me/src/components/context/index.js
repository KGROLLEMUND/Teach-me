import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

import useFetch from "@/util/useFetch";

const UserContext = createContext({
  isLogged: false,
  user: {},
});

export default UserContext;

export const UserContextProvider = ({ children }) => {
  const router = useRouter();

  const [user, setUser] = useState({});
  const [isLogged, setIsLogged] = useState(false);

  const [loading, setLoading] = useState(false);

  const [fetchUser, setUserFetch] = useFetch({
    url: "/user",
    method: "GET",
    body: null,
    token: null,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        setUserFetch({ ...fetchUser.fetchProps, token: token });
      }
    }
  }, [router]);

  useEffect(() => {
    if (fetchUser.fetchProps.token && !isLogged) {
      fetchUser.fetchData();
    }
  }, [fetchUser, isLogged]);

  useEffect(() => {
    if (fetchUser.data && fetchUser.data.success) {
      login(fetchUser.data.user);
    }
  }, [fetchUser.data]);

  useEffect(() => {
    if (fetchUser.error) {
      logout();
    }
  }, [fetchUser.error]);

  useEffect(() => {
    setLoading(fetchUser.loading);
  }, [fetchUser.loading]);

  const login = (data) => {
    setUser(data);
    setIsLogged(true);
  };

  const logout = () => {
    setUser({});
    setIsLogged(false);
    setUserFetch({ ...fetchUser.fetchProps, token: null });
    localStorage.removeItem("token");
    router.push("/");
  };

  const updateUser = (data) => {
    setUser(data);
  };

  const context = {
    login,
    logout,
    user,
    isLogged,
    updateUser,
    loading,
  };

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
};
