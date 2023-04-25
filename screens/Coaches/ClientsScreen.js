import { SafeAreaView, View, FlatList, Text, StyleSheet } from "react-native";
import TopScreen from "../../components/TopScreen";
import NavBar from "../../components/NavBar";
import MyCoachItem from "../../components/coaches/MyCoachItem";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contextapi/AuthContext";
import colors from "../../variables/colors";
import axios from "axios";
import url from "../../variables/url";

const ClientsScreen = ({ navigation }) => {
    const [clients, setClients] = useState([]);
  const auth = useContext(AuthContext);

  useEffect(() => {
    axios.get(`${url}/coaches/owned-clients/${auth.user.coachId}`).then(response => {
        console.log(response.data);
      setClients(response.data);
    }).catch(err => {
      console.log(err);
    })
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <TopScreen navigation={navigation} />
      <View style={styles.SectionContainer}>
        <Text style={styles.Section}>My Clients</Text>
      </View>
      {clients.length > 0 ? (
        <FlatList
          data={clients}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <MyCoachItem
                name={item.firstname + " " + item.lastname}
                id={item.id}
                specialization={item.specializaion}
                navigation={navigation}
              />
            );
          }}
        />
      ) : (
        <Text>You dont have any client yet.</Text>
      )}
      <NavBar navigation={navigation} current={"Clients"} />
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
      width:'100%',
      alignItems: 'center',
      padding: '5%'
    },
    Section: {
      fontSize: 25,
      fontStyle: 'italic',
      color: colors.darkgrey
    }
  });

export default ClientsScreen;
