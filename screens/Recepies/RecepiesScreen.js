import { View, Text, StyleSheet, SafeAreaView, Pressable, TextInput, FlatList, KeyboardAvoidingView } from "react-native";
import TopScreen from "../../components/TopScreen";
import NavBar from "../../components/NavBar";
import colors from "../../variables/colors";
import { Ionicons } from '@expo/vector-icons';
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import url from "../../variables/url";
import RecepieItem from "../../components/recepies/RecepieItem";
import { AuthContext } from "../../contextapi/AuthContext";
import { AntDesign } from '@expo/vector-icons'; 
import { Foundation } from '@expo/vector-icons';
import { LogBox } from 'react-native';

const RecepiesScreen = ({ navigation }) => {
  const [recepies, setRecepies] = useState([]);
  const [filteredRecepies, setFilteredRecepies] = useState([]);
  const auth = useContext(AuthContext);

  function LoadRecepies()
  {
    axios
      .get(`${url}/recepies`, {
      })
      .then(response => {
        setRecepies(response.data);
        setFilteredRecepies(response.data);
      })
      .catch(err => {
      console.log(err);
    });
  }
  useEffect(() => {
    LoadRecepies();
    LogBox.ignoreLogs([
      'Non-serializable values were found in the navigation state',
    ]);
  }, []);
  
  function searchRecepies(text){
    const filteredRecepies = recepies.filter((item) => {
      const title = item.title.toLowerCase(); // convert title to lowercase
      return title.includes(text.toLowerCase()); // convert text to lowercase and use includes method
    });
    setFilteredRecepies(filteredRecepies);
  }
  function GoToRecepieSection(recepieTitle, recepieId, process, image){
    navigation.navigate("RecepieSection", {title: recepieTitle, id: recepieId, process: process, image: image})
  }
  
  return (
    <SafeAreaView style={styles.container}> 
      {auth.isAdmin ? 
        <Pressable onPress={() => {navigation.navigate("AdminHome")}} style={{height: '10%', paddingLeft: '5%', justifyContent: 'flex-end'}}>
          <AntDesign name="leftcircle" size={40} color="black" />
        </Pressable> : <TopScreen navigation={navigation}/>}
      <View style={styles.recepieContainer}>
        <View style={styles.SectionContainer}>
            <Text style={styles.Section}>Recepies</Text>
        </View>
        <TextInput style={styles.Search} placeholder="SEARCH" onChangeText={searchRecepies}></TextInput>
        {
          recepies.length > 0 ?
            <View style={[styles.recepiesContainer, auth.isAdmin ? {height: '100%'} : {height: '74%'}]}>
              <FlatList
                data={filteredRecepies}
                renderItem={({item}) => {
                  if(item != null) return <RecepieItem func={LoadRecepies} navigation={navigation} id={item.id} title={item.title} process={item.process} image={item.picture} votes={item.upvotes} recepie={GoToRecepieSection}/>;
                }}
              />
            </View> :
            <View style={{height: '74%', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 18, color: 'lightgrey'}}>There is no created recepies</Text>
              <Foundation name="magnifying-glass" size={80} color="lightgrey" />
            </View>
        }
        { auth.isAdmin ? null :
          <Pressable onPress={() => {navigation.navigate("AddRecepie", { callback: { update: LoadRecepies }})}} style={styles.AddButton}>
              <Ionicons name="add-circle-sharp" size={48} color={colors.green} />
          </Pressable>
        }
      </View>
      {auth.isAdmin ? null : <NavBar navigation={navigation} current="Recepies" />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  recepieContainer: {
    height: '84%',
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
  Search: {
    marginHorizontal: '5%',
    padding: '2%',
    borderBottomWidth: 2,
    borderColor: colors.green,
    fontSize: 15
  },
  recepiesContainer: {
    width: '100%',
    padding: '5%',
    justifyContent: 'flex-start',
    alignItems: 'center', 
  },
  AddButton: {
    height: '11%',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center', 
  },
});

export default RecepiesScreen;
