import { SafeAreaView, View, Text, Pressable, StyleSheet, FlatList } from "react-native";
import NavBar from "../../components/NavBar";
import TopScreen from "../../components/TopScreen";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contextapi/AuthContext";
import CoachItem from "../../components/coaches/CoachItem";
import colors from "../../variables/colors";
import axios from "axios";
import url from "../../variables/url";
import { Foundation } from '@expo/vector-icons';

const CoachesScreen = ({navigation}) => {
  const [coaches, setCoaches] = useState([]);
  const auth = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`${url}/coaches/${auth.user.id}`)
      .then((response) => {
        setCoaches(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TopScreen navigation={navigation} />
      <View style={styles.SectionContainer}>
        <View style={{width: '100%', alignItems: 'center'}}>
          <Text style={styles.Section}>Coaches</Text>
        </View>
      </View>
      <View style={styles.CoachesContainer}>
        {
          coaches.length > 0 ? 
          (
            <FlatList
              data={coaches}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                return <CoachItem name={item.firstname + " " + item.lastname} id={item.id} specialization={item.specializaion} navigation={navigation} />
              }}
            />
          ) : (
                <View style={{height: '50%', justifyContent: 'flex-end', alignItems: 'center'}}>
                  <Text style={{fontSize: 15, color: 'lightgrey'}}>No trainers are currently registered</Text>
                  <Foundation name="magnifying-glass" size={70} color="lightgrey" />
                </View>
              )
        }
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
  SectionContainer: {
    width: "100%",
    alignItems: "center",
    padding: "5%",
    flexDirection: 'row',
  },
  Section: {
    fontSize: 25,
    fontStyle: "italic",
    color: colors.darkgrey,
  },
  CoachesContainer: {
    width: '100%', 
    height: '74%', 
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
});

export default CoachesScreen;
