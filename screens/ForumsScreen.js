import React, {useState} from "react";
import { View, Text, StyleSheet, SafeAreaView, Pressable, TextInput, ScrollView } from "react-native";
import TopScreen from "../components/TopScreen";
import NavBar from "../components/NavBar";
import colors from "../variables/colors";
import { Ionicons } from '@expo/vector-icons';
import Axios from 'axios';
import { AuthContext } from "../contextapi/AuthContext";
import { useContext } from "react";
import url from '../variables/url';
import { AntDesign } from '@expo/vector-icons'; 

var once = true;
var key = 0;

const ForumsScreen = ({ navigation }) => {
    const [visible, setVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [forums, setForums] = useState([]);
    const auth = useContext(AuthContext);
    
    function LoadTitles()
    {
        Axios.get(`${url}/forums`, {
            }).then(response => {
            console.log(response.data);
            }).catch(err => {
            console.log(err);
        });
    }
    if (once) {
        LoadTitles(); 
        once = false;
    }

    function AddForum(){
        if (title.trim() == "") {
            console.log("NAZOV CHYYYYYYYYYYYYYYYBA");
            return;
        }
        Axios.post(`${url}/forums/create`, {
            title: title,
            owner_id: auth.user.id,
            opened_at: new Date(),
            closed_at: null,
            theme_id: null,
        }).then(response => {
            console.log("success");
        }).catch(err => {
            console.log(err);
        });
        setForums((currentForumTitles) => [
            ...currentForumTitles,
            title
        ]);
        setVisible(!visible)
    }
    function UpVote(){
        console.log("UP");
    }
    function DownVote(){
        console.log("down");
    }
  return (
    <SafeAreaView style={styles.container}>
      <TopScreen navigation={navigation}/>
      <View style={styles.forumContainer}>
        <View style={styles.SectionContainer}>
            <Text style={styles.Section}>Forums</Text>
        </View>
        <TextInput style={styles.Search} placeholder="SEARCH"></TextInput>
        <ScrollView>
        <View style={styles.ForumsContainer}>
            {forums.map((forum) => <Pressable onPress={() => navigation.navigate("ForumSection", {title: "nieco"})} style={styles.Forum} key={key++}>
                <View style={{justifyContent: 'center', width: '15%'}}><Text style={{textAlign: 'center', fontSize: 15, fontWeight: 'bold'}}>0</Text></View>
                <View style={styles.votes}>
                    <Pressable onPress={UpVote}><AntDesign style={{marginVertical: '10%'}} name="upcircle" size={35} color={colors.green} /></Pressable>
                    <Pressable onPress={DownVote}><AntDesign style={{marginVertical: '10%'}} name="downcircle" size={35} color="black" /></Pressable>
                </View>
                <View style={{justifyContent:'center'}}>
                    <Text style={styles.ForumTitle}>{forum}</Text>
                </View>
                </Pressable>)}
        </View>
        </ScrollView>
        {visible? (
            <View style={styles.AddMenu}>
                <Text style={{color: colors.white, fontSize: 20, fontWeight: 'bold', borderBottomColor: colors.green, borderBottomWidth: 2}}>ADD FORUM</Text>
                <TextInput onChangeText={(title) => {setTitle(title)}} style={{marginTop: '10%', backgroundColor: colors.white, fontSize: 15, width: '100%', textAlign: 'center', borderRadius: 30}} placeholder="TITLE"></TextInput>
                <Pressable onPress={AddForum} style={{marginTop: '10%', backgroundColor: colors.green, width: '20%', borderRadius: 30}}><Text style={{textAlign: 'center', color: colors.white, fontSize: 15, fontWeight: 'bold'}}>ADD</Text></Pressable>
            </View>
        ) :null}
        <Pressable onPress={() => setVisible(!visible)} style={styles.AddButton}>
            <Ionicons name="add-circle-sharp" size={48} color={colors.green} />
        </Pressable>
      </View>
      <NavBar navigation={navigation}/>
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
  AddButton: {
    position: 'absolute',
    marginTop: '160%',
    marginLeft: '85%',
  },
  ForumsContainer: {
    height: '100%',
    width: '100%',
    padding: '5%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  Forum: {
    marginBottom: '7%',
    borderRadius: 30,
    borderWidth: 3,
    borderColor: colors.green,
    width: '90%',
    flexDirection: 'row',
  },
  ForumTitle: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.darkgrey,

  },
  votes: {
    marginRight: '5%',
    marginVertical: '1%',
    flexDirection: 'column',
    justifyContent: 'space-between'
  }
});

export default ForumsScreen;
