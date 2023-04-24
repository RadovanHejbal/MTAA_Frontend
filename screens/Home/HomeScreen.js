import { View, StyleSheet, SafeAreaView, FlatList, Text } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../../contextapi/AuthContext";
import TopScreen from "../../components/TopScreen";
import NavBar from "../../components/NavBar";
import DayInfo from "../../components/homescreen/DayInfo";
import OwnedMeal from "./OwnedMeal";
import axios from "axios";
import url from "../../variables/url";

const HomeScreen = ({ navigation }) => {
  const auth = useContext(AuthContext);

  function addMeal() {
    navigation.navigate("SearchMeal");
  }

  function addActivity() {
    navigation.navigate("SearchActivity");
  }

  function deleteMeal(mealToDelete) {
    axios.delete(`${url}/meals/owned-meals/delete/${mealToDelete.id}`).then(response => {
      auth.deleteMeal(mealToDelete);
    }).catch(err => {
      console.log(err);
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <TopScreen navigation={navigation} />
      <View>
        <View style={styles.dayInfoContainer}>
          <DayInfo
            title="Calories"
            subtitle={`${parseInt(auth.dailyMeals.kcal).toFixed(0)} kcal`}
            add={addMeal}
          />
          <DayInfo
            title="Activities"
            subtitle={`-${parseInt(auth.dailyActivities.kcal).toFixed(0)} kcal`}
            add={addActivity}
          />
          <DayInfo title="Weight" subtitle={`${auth.user.weight} kg`} />
        </View>
        <View>
          <View></View>
          <View></View>
          <View></View>
          <View></View>
        </View>
        <Text style={styles.yourTitle}>Your meals today</Text>
        <FlatList style={styles.ownedMeals} data={auth.dailyMeals.meals} renderItem={({item}) => {
          return <OwnedMeal meal={item} delete={deleteMeal} />
        }} />
      </View>
      <NavBar navigation={navigation} current="Home" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  dayInfoContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    justifyContent: "center",
    marginTop: 24,
  },
  ownedMeals: {
    padding: 24
  },
  yourTitle: {
    fontWeight: 700,
    paddingTop: 24,
    paddingLeft: 24,
    fontSize: 24
  }
});

export default HomeScreen;
