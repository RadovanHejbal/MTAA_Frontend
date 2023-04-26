import { SafeAreaView, View, FlatList, Text, StyleSheet } from "react-native";
import TopScreen from "../../components/TopScreen";
import NavBar from "../../components/NavBar";
import MyCoachItem from "../../components/coaches/MyCoachItem";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contextapi/AuthContext";
import colors from "../../variables/colors";
import axios from "axios";
import url from "../../variables/url";
import { Foundation } from '@expo/vector-icons';

const ClientsScreen = ({ navigation }) => {
    const [clients, setClients] = useState([]);
  const auth = useContext(AuthContext);

  useEffect(() => {
    axios.get(`${url}/coaches/owned-clients/${auth.user.coachId}`).then(response => {
      setClients(response.data);
    }).catch(err => {
      console.log(err);
    })
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <TopScreen navigation={navigation} />
      <View style={styles.SectionContainer}>
        <Text style={styles.Section}>Clients</Text>
      </View>
      <View style={styles.MyClients}>
        {
          clients.length > 0 ? 
          (
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
            <View style={{height: '50%', justifyContent: 'flex-end', alignItems: 'center'}}>
              <Text style={{fontSize: 18, color: 'lightgrey'}}>You dont have any clients yet</Text>
              <Foundation name="magnifying-glass" size={80} color="lightgrey" />
            </View>
          )
        }
      </View>
      <NavBar navigation={navigation} current={"Clients"} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
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
    },
    MyClients: {
      width: '100%', 
      height: '74%', 
      justifyContent: 'flex-start',
      alignItems: 'center'
    },
  });

export default ClientsScreen;
