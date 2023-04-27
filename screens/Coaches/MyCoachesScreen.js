import { View, Text, StyleSheet, SafeAreaView, Pressable, FlatList } from "react-native";
import TopScreen from "../../components/TopScreen";
import NavBar from "../../components/NavBar";
import colors from "../../variables/colors";
import { useEffect, useState, useContext } from "react";
import axios from 'axios';
import url from '../../variables/url';
import { AuthContext} from '../../contextapi/AuthContext';
import MyCoachItem from "../../components/coaches/MyCoachItem";
import { Foundation } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyCoachesScreen = ({ navigation }) => {
  const [myCoaches, setMyCoaches] = useState([]);
  const auth = useContext(AuthContext);
  const StoreData = async (data) => {
    try {
      const dataToStore = JSON.stringify(data);
      await AsyncStorage.setItem('myCoaches', dataToStore);
      GetData();
    } catch (error) {
      console.log(error);
    }
  };
  const GetData = async () => {
    try {
      const dataFromStorage = await AsyncStorage.getItem('myCoaches');
      const data = dataFromStorage != null ? JSON.parse(dataFromStorage) : null;
      setMyCoaches(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    axios.get(`${url}/coaches/owned-coaches/${auth.user.id}`)
      .then(response => {
        {/* STORE MY COACHES */}
        StoreData(response.data);
      }).catch(err => {
        console.log(err);
      })
    {/* GET MY COACHES */}
    GetData();
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <TopScreen navigation={navigation}/>
      <View style={styles.SectionContainer}>
        <Text style={styles.Section}>My Coaches</Text>
      </View>
      <View style={{width: '100%', height: '74%'}}>
        <View style={styles.BuyedCoachesContainer}>
          {
            myCoaches !== null && myCoaches.length > 0 ? 
              <FlatList data={myCoaches} keyExtractor={item => item.id} renderItem={({item}) => {
                return <MyCoachItem name={item.firstname + " " + item.lastname} id={item.id} specialization={item.specializaion} navigation={navigation} />
              }} /> : 
              <View style={{height: '60%', justifyContent: 'flex-end', alignItems: 'center'}}>
                <Text style={{fontSize: 18, color: 'lightgrey'}}>You dont have any coach</Text>
                <Foundation name="magnifying-glass" size={80} color="lightgrey" />
              </View>
          }
        </View>
        <View style={styles.BuyButton}>
          <Pressable style={{paddingHorizontal: '10%', paddingVertical: '1%', backgroundColor: colors.green, borderRadius: 30}} onPress={() => navigation.navigate("Coaches")}>
            <Text style={{fontSize: 18, fontWeight: 'bold', color: colors.white}}>BUY</Text>
          </Pressable>
        </View>
      </View>
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
  BuyedCoachesContainer: {
    width: '100%', 
    height: '91%', 
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  BuyButton: {
    width: '100%',
    height: '8%',
    justifyContent: 'center',
    alignItems: 'center'
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
