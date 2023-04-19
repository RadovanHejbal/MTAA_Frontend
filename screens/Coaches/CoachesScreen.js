import { View, Text, StyleSheet, SafeAreaView, Pressable, FlatList } from "react-native";
import TopScreen from "../../components/TopScreen";
import NavBar from "../../components/NavBar";
import colors from "../../variables/colors";
import { useEffect, useState, useContext } from "react";
import axios from 'axios';
import url from '../../variables/url';
import { AuthContext} from '../../contextapi/AuthContext';

const CoachesScreen = ({ navigation }) => {
  const [myCoaches, setMyCoaches] = useState([]);
  const auth = useContext(AuthContext);

  useEffect(() => {
    axios.get(`${url}/coaches/relations/${auth.user.id}`).then(response => {
      setMyCoaches(response.data);
    }).catch(err => {
      console.log(err);
    })
  })

  return (
    <SafeAreaView style={styles.container}>
      <TopScreen navigation={navigation}/>
      <View style={styles.SectionContainer}>
        <Text style={styles.Section}>Coaches</Text>
      </View>
      <Pressable><Text>Buy a coach!</Text></Pressable>
      {myCoaches.length > 0 ? <FlatList data={myCoaches} keyExtractor={item => item.id} renderItem={({item}) => {
        return 
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

export default CoachesScreen;
