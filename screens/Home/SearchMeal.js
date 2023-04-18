import { useEffect, useState } from "react";
import { SafeAreaView, TextInput, FlatList, StyleSheet } from "react-native";
import url from "../../variables/url";
import colors from "../../variables/colors";
import axios from "axios";
import Item from "../../components/homescreen/Item";

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
    <SafeAreaView style={styles.container}>
      <TextInput placeholder="search" onChangeText={searchMeal} style={styles.search} />
      <FlatList
        style={styles.mealsContainer}
        data={filteredMeals}
        renderItem={({ item }) => {
          return <Item title={item.title} details={goToDetails} id={item.id} />;
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  search: {
    borderBottomWidth: 2,
    borderColor: colors.green,
    fontSize: 24,
    width: '70%',
    padding: 8,
    marginVertical: 24
  },
  mealsContainer: {
    width: '90%'
  }
})

export default SearchMeal;
