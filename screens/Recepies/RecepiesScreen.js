import { View, Text, StyleSheet, SafeAreaView, Pressable, TextInput, FlatList } from "react-native";
import TopScreen from "../../components/TopScreen";
import NavBar from "../../components/NavBar";
import colors from "../../variables/colors";
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import url from "../../variables/url";
import RecepieItem from "../../components/recepies/RecepieItem";

const RecepiesScreen = ({ navigation }) => {
  const [recepies, setRecepies] = useState([]);
  const [filteredRecepies, setFilteredRecepies] = useState([]);
  
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
  }, [recepies]);
  
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
      <TopScreen navigation={navigation}/>
      <View style={styles.recepieContainer}>
        <View style={styles.SectionContainer}>
            <Text style={styles.Section}>Recepies</Text>
        </View>
        <TextInput style={styles.Search} placeholder="SEARCH" onChangeText={searchRecepies}></TextInput>
        <View style={styles.recepiesContainer}>
          <FlatList
            data={filteredRecepies}
            renderItem={({item}) => {
              if(item != null) return <RecepieItem id={item.id} title={item.title} process={item.process} image={item.picture} votes={item.upvotes} recepie={GoToRecepieSection}/>;
            }}
          />
        </View>
        <Pressable onPress={() => {navigation.navigate("AddRecepie")}} style={styles.AddButton}>
            <Ionicons name="add-circle-sharp" size={48} color={colors.green} />
        </Pressable>
      </View>
      <NavBar navigation={navigation} current="Recepies" />
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
  AddButton: {
    position: 'absolute',
    marginTop: '160%',
    marginLeft: '85%',
  },
  recepiesContainer: {
    height: '85%',
    width: '100%',
    padding: '5%',
    justifyContent: 'flex-start',
    alignItems: 'center',
}});

export default RecepiesScreen;
