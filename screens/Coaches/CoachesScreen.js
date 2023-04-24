import { SafeAreaView, View, Text, Pressable, StyleSheet, FlatList } from "react-native";
import NavBar from "../../components/NavBar";
import TopScreen from "../../components/TopScreen";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contextapi/AuthContext";
import CoachItem from "../../components/coaches/CoachItem";
import colors from "../../variables/colors";
import axios from "axios";
import url from "../../variables/url";

const CoachesScreen = ({navigation}) => {
  const [coaches, setCoaches] = useState([]);
  const auth = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`${url}/coaches`)
      .then((response) => {
        setCoaches(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function openCoachHandler(id) {

  }

  return (
    <SafeAreaView style={styles.container}>
      <TopScreen navigation={navigation} />
      <View style={styles.SectionContainer}>
        <Text style={styles.Section}>Coaches</Text>
      </View>
      {coaches.length > 0 ? (
        <FlatList
          data={coaches}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return <CoachItem name={item.firstname + " " + item.lastname} id={item.id} specialization={item.specializaion} navigation={navigation} />
          }}
        />
      ) : (
        <Text>There are no more coaches available for you</Text>
      )}
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
  SectionContainer: {
    width: "100%",
    alignItems: "center",
    padding: "5%",
  },
  Section: {
    fontSize: 25,
    fontStyle: "italic",
    color: colors.darkgrey,
  },
});

export default CoachesScreen;
