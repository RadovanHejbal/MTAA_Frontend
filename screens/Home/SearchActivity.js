import { useEffect, useState } from "react";
import { SafeAreaView, TextInput, FlatList, StyleSheet, Pressable, Text } from "react-native";
import url from "../../variables/url";
import colors from "../../variables/colors";
import axios from "axios";
import Item from "../../components/homescreen/Item";

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
      <Pressable style={styles.back} onPress={() => {navigation.navigate('Home')}}><Text>back</Text></Pressable>
      <TextInput placeholder="search" onChangeText={searchActivity} style={styles.search} />
      <FlatList
        style={styles.mealsContainer}
        data={filteredActivities}
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
  },
  back: {
    padding: 16,
    width: '100%',
  }
})

export default SearchActivity;