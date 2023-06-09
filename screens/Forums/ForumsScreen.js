import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, SafeAreaView, Pressable, TextInput, ScrollView, FlatList } from "react-native";
import TopScreen from "../../components/TopScreen";
import NavBar from "../../components/NavBar";
import colors from "../../variables/colors";
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { AuthContext } from "../../contextapi/AuthContext";
import { useContext } from "react";
import url from '../../variables/url';
import ForumItem from "../../components/forums/ForumItem";
import { Foundation } from '@expo/vector-icons';

const ForumsScreen = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const [forumTitle, setForumTitle] = useState('');
  const [forums, setForums] = useState([]);
  const [filteredForums, setFilteredForums] = useState([]);
  const auth = useContext(AuthContext);
  
  function LoadForums()
  {
    axios
      .get(`${url}/forums`, {
      })
      .then(response => {
        setForums(response.data);
        setFilteredForums(response.data);
      })
      .catch(err => {
      console.log(err);
    });
  }

  useEffect(() => {
    LoadForums();
  }, []);

  function AddForum(){
    if(forumTitle.trim() == ""){
      console.log("NAZOV TREBA DEBILKO");
      return;
    }
    setVisible(false);

    axios
      .post(`${url}/forums/create`, {
        title: forumTitle,
        owner_id: auth.user.id,
        opened_at: new Date()
      })
      .then(response => {
        setForumTitle("");
        LoadForums();
      })
      .catch(err => {
        console.log(err);
      });
  }

  function searchForums(text){
    const filteredForums = forums.filter((item) => {
      const title = item.title.toLowerCase(); // convert title to lowercase
      return title.includes(text.toLowerCase()); // convert text to lowercase and use includes method
    });
    setFilteredForums(filteredForums);
  }

  function goToForumSection(forumTitle, forumId, closed_at, owner_id){
    navigation.navigate("ForumSection", {
      title: forumTitle, 
      id: forumId, 
      closed_at: closed_at, 
      owner_id: owner_id,
      reloud: LoadForums
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <TopScreen navigation={navigation}/>
      <View style={styles.forumContainer}>
        <View style={styles.SectionContainer}>
            <Text style={styles.Section}>Forums</Text>
        </View>
        <TextInput style={styles.Search} placeholder="SEARCH" onChangeText={searchForums}></TextInput>
        {
          forums.length > 0 ?
            <View style={styles.ForumsContainer}>
              <FlatList
                data={filteredForums}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => {
                  return <ForumItem title={item.title} id={item.id} votes={item.upvotes} section={goToForumSection} closed_at={item.closed_at} owner_id={item.owner_id}/>;
                }} 
              />
            </View> :
            <View style={{height: '84%', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 18, color: 'lightgrey'}}>There is no created forums</Text>
              <Foundation name="magnifying-glass" size={80} color="lightgrey" />
            </View>
        }
        {visible? (
            <View style={styles.AddMenu}>
                <Text style={{color: colors.white, fontSize: 20, fontWeight: 'bold', borderBottomColor: colors.green, borderBottomWidth: 2}}>ADD FORUM</Text>
                <TextInput maxLength={16} onChangeText={(text) => {setForumTitle(text)}} style={{marginTop: '10%', backgroundColor: colors.white, fontSize: 15, width: '100%', textAlign: 'center', borderRadius: 30}} placeholder="TITLE"></TextInput>
                <Pressable onPress={AddForum} style={{marginTop: '10%', backgroundColor: colors.green, width: '20%', borderRadius: 30}}><Text style={{textAlign: 'center', color: colors.white, fontSize: 15, fontWeight: 'bold'}}>ADD</Text></Pressable>
            </View> 
        ) :null}
        <Pressable onPress={() => setVisible(!visible)} style={styles.AddButton}>
            {visible? <Ionicons name="close-circle" size={48} color="red" /> : <Ionicons name="add-circle-sharp" size={48} color={colors.green} />}
        </Pressable>
      </View>
      <NavBar navigation={navigation} current="Forums" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  forumContainer: {
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
  AddMenu: {
    position: 'absolute',
    width: '100%',
    height: '30%',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: colors.darkgrey,
    padding: '5%',
    alignItems: 'center',
  },
  ForumsContainer: {
    height: '74%',
    width: '100%',
    paddingTop: '5%',
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

export default ForumsScreen;
