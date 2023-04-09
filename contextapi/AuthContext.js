import React, { useState } from "react";

export const AuthContext = React.createContext({
  user: null,
  daily: null,
  isCoach: false,
  isAdmin: false,
  login: () => {},
  logout: () => {},
});

const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [daily, setDaily] = useState(null);
  const [isCoach, setIsCoach] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  function loginHandler(data) {
    setUser(data);
    if(data.role == "Admin") setIsAdmin(true);
    else if(data.role = "coach") setIsCoach(true);
  };

  const logoutHandler = () => {
    console.log("LOGOUT");
    setUser(null);
    setDaily(null);
    setIsCoach(false);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider
      value={{
        login: loginHandler,
        logout: logoutHandler,
        isAdmin,
        isCoach,
        user,
        daily,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
