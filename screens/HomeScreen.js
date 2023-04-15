import { View, Text, StyleSheet, SafeAreaView, Pressable } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../contextapi/AuthContext";
import TopScreen from "../components/TopScreen";
import NavBar from "../components/NavBar";
import DayInfo from "../components/homescreen/DayInfo";

const HomeScreen = ({ navigation }) => {
  const auth = useContext(AuthContext);

  function addMeal() {
    navigation.navigate("SearchMeal");
  }

  function addActivity() {
    console.log("ADD ACTIVITY");
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
            subtitle={`${parseInt(auth.dailyActivities.kcal).toFixed(0)} kcal`}
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
      </View>
      <NavBar navigation={navigation} />
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
});

export default HomeScreen;
