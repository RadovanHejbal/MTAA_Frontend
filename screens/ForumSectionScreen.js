import React, {useContext, useEffect, useState} from "react";
import { useRoute } from "@react-navigation/native";
import { View, Text, StyleSheet, SafeAreaView, Pressable, TextInput, FlatList } from "react-native";
import { AntDesign } from '@expo/vector-icons'; 
import colors from "../variables/colors";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { AuthContext } from "../contextapi/AuthContext";
import axios from "axios";
import url from "../variables/url";
import MessageItem from "../components/forums/MessageItem";

const ForumSectionScreen = ({ navigation }) => {
  const route = useRoute();
  const [message, setMessage] = useState('');
  const [forumMessages, setforumMessages] = useState([]);
  const [coachId, setCoachId] = useState(null);
  const auth = useContext(AuthContext);
  this.TextInput = React.createRef(); 

  function LoadMessages()
  {
    axios
      .get(`${url}/forums/get-messages/${route.params.id}`)
      .then(response => {
        setforumMessages(response.data);
      })
      .catch(err => {
      console.log(err);
    });
  }
  useEffect(() => {
    LoadMessages();
  }, []);

  function SendMessage() {
    if(message.length > 250){
      console.log("Moc dlhe");
      return;
    }
    if(message.length == 0)
    {
      console.log("Moc kratke");
      return;
    }
    
    var coachIdFromJSON = "";

    if(auth.isCoach){
      axios
      .get(`${url}/coaches/relations/${auth.user.id}`, {})
      .then(response => {
        setCoachId(response.data);
      })  
      .catch(err => {
        console.log(err);
      });
      coachIdFromJSON = coachId[0]['coach_id'];
    }
   
    axios
      .post(`${url}/forums/add-message`, {
        forumid: route.params.id,
        userid: auth.user.id,
        text: message,
        coache_id: coachIdFromJSON
      })
      .then(response => {
        setforumMessages(response.data);
      })
      .catch(err => {
      console.log(err);
    });

    LoadMessages();
    setMessage('');
    this.TextInput.current.clear();
  }
  
  return (
   <View style={styles.container}>
    <View style={styles.topSectionContainer}>
      <View style={styles.buttonContainer}>
        <Pressable onPress={() => {navigation.navigate("Forums")}}><AntDesign name="leftcircle" size={40} color="black" /></Pressable>
      </View>
      <View style={styles.titleContainer}>
        <View style={styles.section}>
          <Text style={{fontSize: 20, color: colors.black, fontWeight: 'bold'}}>SECTION</Text>
        </View>
        <View style={styles.title}>
          <Text style={{fontSize: 20, color: colors.darkgrey, fontWeight: 'bold', borderBottomWidth: 2, borderColor: colors.green, textTransform: 'uppercase'}}>{route.params.title}</Text>
        </View>
      </View>
    </View>
    <View style={styles.messagesContainer}>
      <FlatList
        data={forumMessages}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => {
          if(item != null) return <MessageItem message={item.text} userId={auth.user.id} messageUserId={item.user_id} coache_id={item.coach_id}/>;
        }}
      />
    </View>
    <View style={styles.inputMessageContainer}>
      <TextInput ref={this.TextInput} style={{fontSize: 15, width: '80%', height: '100%'}} placeholder="Aa . . ." onChangeText={(text) => setMessage(text)}></TextInput>
      <Pressable onPress={SendMessage} style={{width: '20%', height: '100%', justifyContent: 'center', alignItems: 'center'}}><MaterialCommunityIcons name="send-circle" size={50} color="black" /></Pressable>
    </View>
   </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  topSectionContainer: {
    height: '15%',
    flexDirection: 'row',
  },
  buttonContainer: {
    paddingTop: '10%',
    width: '20%',
    padding: '5%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleContainer: {
    width: '100%',
    paddingRight: '20%',
    paddingTop: '10%',
  },
  section: {
    alignItems: 'flex-start',
    height: '50%',
    justifyContent: 'center'
  },
  title: {
    alignItems: 'flex-start',
    paddingLeft: '15%',
    height: '50%',
  },
  messagesContainer: {
    height: '78%',
    paddingTop: '5%',
  },
  inputMessageContainer: {
    backgroundColor: colors.lightgrey,
    borderTopWidth: 2,
    borderColor: colors.green,
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    height: '7%',
    paddingLeft: '5%',
    flexDirection: 'row'
  }
});

export default ForumSectionScreen;
