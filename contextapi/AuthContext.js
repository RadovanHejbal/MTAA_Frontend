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
    console.log("SOM TU");
    setUser(data.user);
    setDaily(data.daily);
    setIsCoach(data.isCoach);
    setIsAdmin(data.isAdmin);
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
