import React, {useContext, useEffect, useLayoutEffect, useState} from "react";
import { useRoute } from "@react-navigation/native";
import { View, Text, StyleSheet, SafeAreaView, Pressable, TextInput, FlatList, Alert } from "react-native";
import { AntDesign } from '@expo/vector-icons'; 
import colors from "../../variables/colors";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { AuthContext } from "../../contextapi/AuthContext";
import axios from "axios";
import url from "../../variables/url";
import MessageItem from "../../components/forums/MessageItem";

const ForumSectionScreen = ({ navigation }) => {
  const route = useRoute();
  const [message, setMessage] = useState('');
  const [forumMessages, setforumMessages] = useState([]);
  const auth = useContext(AuthContext);

  function CloseForum(){
    Alert.alert(
      'Close forum',
      "Are you sure you want to close this forum?",
      [
        {
          text: 'No',
          style: 'cancel'
        },
        {
          text: 'Yes',
          onPress: () => {
            axios
              .put(`${url}/forums/close/${route.params.id}`, {
                closed_at: new Date()
              })
              .then(response => {
                route.params.reloud();
                navigation.navigate("Forums");
              })
              .catch(err => {
                console.log(err);
              })
          }
        }
      ],
      { cancelable: false }
  );
  }

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

  async function SendMessage() {
    if(message.length == 0) {
      return;
    }
   
    await axios
      .post(`${url}/forums/add-message`, {
        forumid: route.params.id,
        userid: auth.user.id,
        text: message,
        coache_id: auth.isCoach ? auth.user.coachId : ""
      })
      .then(response => {
        setforumMessages(response.data);
      })
      .catch(err => {
      console.log(err);
    });

    LoadMessages();
    setMessage('');
  }

  console.log(forumMessages);
  
  return (
   <SafeAreaView style={styles.container}>
    <View style={styles.topSectionContainer}>
      <View style={styles.buttonContainer}>
        <Pressable onPress={() => {navigation.navigate("Forums")}}><AntDesign name="leftcircle" size={40} color="black" /></Pressable>
      </View>
      <View style={styles.titleContainer}>
        <View style={styles.section}>
          <Text style={{fontSize: 20, color: colors.black, fontWeight: 'bold'}}>SECTION</Text>
        </View>
        <View style={styles.title}>
          <Text style={{fontSize: 25, color: colors.darkgrey, fontWeight: 'bold', borderBottomWidth: 2, borderColor: colors.green, textTransform: 'uppercase'}}>{route.params.title}</Text>
        </View>
      </View>
    </View>
    <View style={[{paddingTop: '5%'}, route.params.closed_at === null? (route.params.owner_id === auth.user.id ? {height: '75%'} : {height: '82%'}) : {height: '90%'}]}>
      <FlatList
        data={forumMessages}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => {
          return <MessageItem message={item.text} userId={auth.user.id} messageUserId={item.user_id} coache_id={item.coach_id} navigation={navigation}/>;
        }}
      />
    </View>
    {route.params.closed_at === null && route.params.owner_id === auth.user.id ? 
      (
        <Pressable onPress={CloseForum} style={styles.CloseButton}>
          <AntDesign name="checkcircle" size={45} color={colors.black} />
        </Pressable>
      ): null}
    {route.params.closed_at === null ? 
      (
        <View style={styles.inputMessageContainer}>
          <TextInput maxLength={250} style={{fontSize: 15, width: '80%', height: '100%'}} placeholder="Aa . . ." value={message} onChangeText={(text) => setMessage(text)}></TextInput>
          <Pressable onPress={SendMessage} style={{width: '20%', height: '100%', justifyContent: 'center', alignItems: 'center'}}><MaterialCommunityIcons name="send-circle" size={50} color="black" /></Pressable>
        </View>
      ): null}
    
   </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    paddingTop: '10%'
  },
  topSectionContainer: {
    height: '10%',
    flexDirection: 'row',
  },
  buttonContainer: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: '5%'
  },
  titleContainer: {
    justifyContent: 'flex-start',
    width: '80%',
    paddingRight: '20%',
  },
  section: {
    alignItems: 'flex-start',
    height: '50%',
    justifyContent: 'center',
  },
  title: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '50%',
  },
  inputMessageContainer: {
    backgroundColor: colors.lightgrey,
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    height: '8%',
    paddingLeft: '5%',
    flexDirection: 'row'
  },
  CloseButton: {
    width: '100%',
    height: '7%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ForumSectionScreen;
