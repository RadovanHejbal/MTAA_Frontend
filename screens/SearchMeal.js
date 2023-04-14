import { useEffect, useState } from "react";
import { SafeAreaView, TextInput, FlatList } from "react-native";
import url from "../variables/url";
import axios from "axios";
import Item from "../components/search/Item";

const SearchMeal = ({ navigation }) => {
  const [meals, setMeals] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);

  useEffect(() => {
    axios
      .get(`${url}/meals`)
      .then((response) => {
        setMeals(response.data);
        setFilteredMeals(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function searchMeal(text) {
    const filteredItems = meals.filter((item) => {
      const title = item.title.toLowerCase(); // convert title to lowercase
      return title.includes(text.toLowerCase()); // convert text to lowercase and use includes method
    });
    setFilteredMeals(filteredItems);
  }

  function goToDetails(mealId) {
    navigation.navigate("MealDetails", { id: mealId });
  }

  return (
    <SafeAreaView>
      <TextInput placeholder="search" onChangeText={searchMeal} />
      <FlatList
        data={filteredMeals}
        renderItem={({ item }) => {
          return <Item title={item.title} details={goToDetails} id={item.id} />;
        }}
      />
    </SafeAreaView>
  );
};

export default SearchMeal;
