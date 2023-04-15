import React, { useState } from "react";

export const AuthContext = React.createContext({
  user: null,
  dailyMeals: null,
  dailyActivities: null,
  isCoach: false,
  isAdmin: false,
  login: () => {},
  logout: () => {},
  daily: () => {}
});

const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [dailyMeals, setDailyMeals] = useState(null);
  const [dailyActivities, setDailyActivities] = useState(null);
  const [isCoach, setIsCoach] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  function loginHandler(data) {
    setUser(data);
    if(data.role == "Admin") setIsAdmin(true);
    else if(data.role == "coach") setIsCoach(true);
  };

  function logoutHandler() {
    setUser(null);
    setDaily(null);
    setIsCoach(false);
    setIsAdmin(false);
  };

  function loginDailyHandler(data) {
    setDailyMeals(data.meals);
    setDailyActivities(data.activities);
    if(!data.meals) {
      setDailyMeals({kcal: 0, protein: 0, fat: 0, carbs: 0, meals: []})
    }
    if(!data.activities) {
      setDailyActivities({activities: [], kcal: 0});
    }
  }

  return (
    <AuthContext.Provider
      value={{
        login: loginHandler,
        logout: logoutHandler,
        daily: loginDailyHandler,
        isAdmin,
        isCoach,
        user,
        dailyMeals,
        dailyActivities
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
