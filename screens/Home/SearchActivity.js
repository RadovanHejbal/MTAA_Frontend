import { useEffect, useState } from "react";
import { SafeAreaView, TextInput, FlatList, StyleSheet, Pressable, View } from "react-native";
import url from "../../variables/url";
import colors from "../../variables/colors";
import axios from "axios";
import Item from "../../components/homescreen/Item";
import { AntDesign } from '@expo/vector-icons'; 

const SearchActivity = ({ navigation }) => {
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);

  useEffect(() => {
    axios
      .get(`${url}/activities`)
      .then((response) => {
        setActivities(response.data);
        setFilteredActivities(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function searchActivity(text) {
    const filteredItems = activities.filter((item) => {
      const title = item.title.toLowerCase(); // convert title to lowercase
      return title.includes(text.toLowerCase()); // convert text to lowercase and use includes method
    });
    setFilteredActivities(filteredItems);
  }

  function goToDetails(activityId) {
    navigation.navigate("ActivityDetails", { id: activityId });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.back}>
        <Pressable onPress={() => {navigation.navigate('Home')}}><AntDesign name="leftcircle" size={40} color="black" /></Pressable>
      </View>
      <View style={styles.search}>
        <TextInput style={{fontSize: 30}} placeholder="Search" onChangeText={searchActivity} />
      </View>
      <View style={{width: '100%', height: '75%', alignItems: 'center'}}>
        <FlatList
          style={styles.activitiesContainer}
          data={filteredActivities}
          renderItem={({ item }) => {
            return <Item title={item.title} details={goToDetails} id={item.id} />;
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  back: {
    width: '100%',
    height: '10%',
    justifyContent: 'flex-end',
    paddingLeft: '5%'
  },
  search: {
    borderBottomWidth: 2,
    borderColor: colors.green,
    width: '90%',
    height: '5%',
    justifyContent: 'flex-end',
    marginTop: '15%',
    marginBottom: '5%'
  },
  activitiesContainer: {
    width: '90%',
  },
})

export default SearchActivity;