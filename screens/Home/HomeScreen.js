import { View, StyleSheet, SafeAreaView, FlatList, Text, Pressable } from "react-native";
import { useContext, useState } from "react";
import { AuthContext } from "../../contextapi/AuthContext";
import TopScreen from "../../components/TopScreen";
import NavBar from "../../components/NavBar";
import DayInfo from "../../components/homescreen/DayInfo";
import OwnedItem from "../../components/homescreen/OwnedItem";
import axios from "axios";
import url from "../../variables/url";
import colors from "../../variables/colors";
import { AntDesign } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const auth = useContext(AuthContext);
  const [mealsVisible, setMealsVisible] = useState(false);
  const [acvtivityVisible, setActivityVisible] = useState(false);

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

  function DeleteActivity(activityToDelete){
    axios.delete(`${url}/activities/owned-activity/delete/${activityToDelete.id}`).then(response => {
      auth.deleteActivity(activityToDelete);
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
          <DayInfo title="BMI" subtitle={(auth.user.weight / ((auth.user.height / 100) * (auth.user.height / 100))).toFixed(0)} />
        </View>
        <View style={{paddingTop: '3%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', height: '20%', flexWrap: 'wrap', gap: 8}}>
          <View style={styles.infoTextContainer}>
            <Text style={{fontSize: 17, color: colors.white, fontStyle: 'italic'}}>Protein</Text>
            <Text style={{color: colors.green}}>{(auth.dailyMeals.protein - 0).toFixed(0) + " g"}</Text>
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={{fontSize: 17, color: colors.white, fontStyle: 'italic'}}>Fat</Text>
            <Text style={{color: colors.green}}>{(auth.dailyMeals.fat - 0).toFixed(0) + " g"}</Text>
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={{fontSize: 17, color: colors.white, fontStyle: 'italic'}}>Carbs</Text>
            <Text style={{color: colors.green}}>{(auth.dailyMeals.carbs - 0).toFixed(0) + " g"}</Text>
          </View>
          <View style={[styles.infoTextContainer , {width: '40%'}]}>
            <Text style={{fontSize: 17, color: colors.white, fontStyle: 'italic'}}>Sum</Text>
            <Text style={{color: colors.green}}>{(auth.dailyMeals.kcal - auth.dailyActivities.kcal).toFixed(0) + " kcal"}</Text>
          </View>
        </View>
        <View style={{height: '48%'}}>
          {/* MEALS */}
          <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: '5%', height: '10%', marginVertical: '3%', alignItems: 'center'}}>
            <Text style={styles.yourTitle}>Your today's meals</Text>
            <Pressable onPress={() => setMealsVisible(!mealsVisible)}>
              {mealsVisible? <AntDesign name="upcircle" size={35} color="black" /> :<AntDesign name="circledown" size={35} color={colors.green} />}
            </Pressable>
          </View>
          {
            mealsVisible?
              <View style={{alignItems: 'center', height: '75%'}}>
                <FlatList style={styles.ownedItem} data={auth.dailyMeals.meals} renderItem={({item}) => {
                  return <OwnedItem item={item} delete={deleteMeal} />
                }}/>
              </View>: null
          }

          {/* ACTIVITY */}
          <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: '5%', height: '10%', alignItems: 'center'}}>
            <Text style={styles.yourTitle}>Your today's activity</Text>
            <Pressable onPress={() => setActivityVisible(!acvtivityVisible)}>
              {acvtivityVisible? <AntDesign name="upcircle" size={35} color="black" /> :<AntDesign name="circledown" size={35} color={colors.green} />}
            </Pressable>
          </View>
          {
            acvtivityVisible?
              <View style={{alignItems: 'center', height: '70%'}}>
                <FlatList style={styles.ownedItem} data={auth.dailyActivities.activities} renderItem={({item}) => {
                  return <OwnedItem item={item} delete={DeleteActivity} />
                }}/>
              </View>: null
          }
        </View>
      </View>
      <NavBar navigation={navigation} current="Home" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
  dayInfoContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
    justifyContent: "center",
    height: '20%',
    width: '100%',
    marginVertical: '3%'
  },
  ownedItem: {
    paddingHorizontal: '3%',
    width: '95%',
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: colors.green,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  yourTitle: {
    fontSize: 20,
    fontWeight: '400',
    fontStyle: 'italic'
  },
  infoTextContainer: {
    width: '30%',
    height: '45%',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.darkgrey,
    borderRadius: 20,
  }
});

export default HomeScreen;
