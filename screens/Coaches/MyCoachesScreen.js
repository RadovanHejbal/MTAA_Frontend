import { View, Text, StyleSheet, SafeAreaView, Pressable, FlatList, Alert } from "react-native";
import TopScreen from "../../components/TopScreen";
import NavBar from "../../components/NavBar";
import colors from "../../variables/colors";
import { useEffect, useState, useContext } from "react";
import axios from 'axios';
import url from '../../variables/url';
import { AuthContext} from '../../contextapi/AuthContext';
import MyCoachItem from "../../components/coaches/MyCoachItem";

const MyCoachesScreen = ({ navigation }) => {
  const [myCoaches, setMyCoaches] = useState([]);
  const auth = useContext(AuthContext);

  useEffect(() => {
    axios.get(`${url}/coaches/owned-coaches/${auth.user.id}`).then(response => {
      setMyCoaches(response.data);
    }).catch(err => {
      console.log(err);
    })
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <TopScreen navigation={navigation}/>
      <View style={styles.SectionContainer}>
        <Text style={styles.Section}>My Coaches</Text>
      </View>
      <Pressable onPress={() => navigation.navigate("Coaches")}><Text>Buy a coach!</Text></Pressable>
      {myCoaches.length > 0 ? <FlatList data={myCoaches} keyExtractor={item => item.id} renderItem={({item}) => {
        return <MyCoachItem name={item.firstname + " " + item.lastname} id={item.id} specialization={item.specializaion} navigation={navigation} />
      }} /> : <Text>You dont have any coach. Try and buy one.</Text>}
      <NavBar navigation={navigation} current="Coaches" />
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

export default MyCoachesScreen;
