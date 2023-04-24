import React, { useState } from "react";
import axios from "axios";
import url from "../variables/url";

export const AuthContext = React.createContext({
  user: null,
  dailyMeals: null,
  dailyActivities: null,
  isCoach: false,
  isAdmin: false,
  login: () => {},
  logout: () => {},
  daily: () => {},
  addMeal: () => {},
  deleteMeal: () => {},
  addActivity: () => {}
});

const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [dailyMeals, setDailyMeals] = useState(null);
  const [dailyActivities, setDailyActivities] = useState(null);
  const [isCoach, setIsCoach] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);


  function loginHandler(data) {
    if(data.role == "coach") {
      setIsCoach(true);
    }else if(data.role == "Admin") {
      setIsAdmin(true);
    }
    setUser(data);
  };

  function logoutHandler() {
    setUser(null);
    setDailyActivities(null);
    setDailyMeals(null);
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

  function addMeal(meal) {
    setDailyMeals({fat: dailyMeals.fat + meal.fat, carbs: dailyMeals.carbs + meal.carbs, protein: dailyMeals.protein + meal.protein, kcal: dailyMeals.kcal + meal.kcal, meals: [...dailyMeals.meals, meal]});
  }

  function deleteMeal(meal) {
    setDailyMeals({fat: dailyMeals.fat - meal.fat, carbs: dailyMeals.carbs - meal.carbs, protein: dailyMeals.protein - meal.protein, kcal: dailyMeals.kcal - meal.kcal, meals: dailyMeals.meals.filter(el => el.id != meal.id)});
  }

  function addActivity(activity) {
    setDailyActivities({kcal: dailyActivities.kcal + activity.kcal, activities: [...dailyActivities.activities, activity]});
  }

  return (
    <AuthContext.Provider
      value={{
        login: loginHandler,
        logout: logoutHandler,
        daily: loginDailyHandler,
        addMeal,
        deleteMeal,
        addActivity,
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
