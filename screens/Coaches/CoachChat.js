import { useEffect, useState, useContext } from "react";
import { Alert, Pressable, SafeAreaView, Text, TextInput, View, StyleSheet, FlatList } from "react-native";
import { useRoute } from '@react-navigation/native';
import axios from "axios";
import uuid from 'react-native-uuid';
import io from 'socket.io-client';
import url from "../../variables/url";
import colors from "../../variables/colors";
import { AuthContext } from "../../contextapi/AuthContext";
import Message from "../../components/coaches/Message";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

let socket;

const CoachChat = ({navigation}) => {
    const { id, name, specialization } = useRoute().params;
    const [messages, setMessages] = useState([]);
    const [sendingMessages, setSendingMessages] = useState([]);
    const [message, setMessage] = useState("");
    const auth = useContext(AuthContext);

    async function storeData (data) {
        try {
            const dataToStore = JSON.stringify(data);
            await AsyncStorage.setItem(`${id}`, dataToStore);
            getData();
        } catch (error) {
            console.log(error);
        }
    };
    async function getData () {
        try {
            const dataFromStorage = await AsyncStorage.getItem(`${id}`);
            const data = dataFromStorage != null ? JSON.parse(dataFromStorage) : null;
            setMessages(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        axios.get(`${url}/coaches/conversation-messages/${id}`).then(response => {
            storeData(response.data)
        }).catch(err => {
            console.log(err);
        })
        getData();

        Notifications.setNotificationHandler({
            handleNotification: async () => {
              return {
                shouldPlaySound: false,
                shouldSetBadge: false,
                shouldShowAlert: false,
              }
            }
          })

        socket = io(url);
        socket.emit('join', {relationId: id});
        socket.on('message', (data) => {
            if(auth.user.id != data.userId) {
                setMessages(previous => {
                    return [...previous, data];
                })
            }else {
                //console.log(data);
            }
        })

        return () => {
            socket.off('message');
            socket.disconnect();
            Notifications.setNotificationHandler({
                handleNotification: async () => {
                  return {
                    shouldPlaySound: false,
                    shouldSetBadge: false,
                    shouldShowAlert: true,
                  }
                }
              })
        }

    }, [navigation])

    function SendMessage() {
        if(message.trim() == "") {
            return;
        }
        const uu = uuid.v4();
        const date = new Date();

        socket.emit('message', {text: message, relationId: id, userId: auth.user.id, uuid: uu, date: date});
        setMessages(previous => {
            return [...previous, {id: uu, text: message, relation_id: id, owner_id: auth.user.id, date: date}];
        });
        setMessage("");
    }

    return <SafeAreaView style={styles.container}>
        <View style={styles.topSection}>
            <Pressable style={{height: '100%', width: '15%', justifyContent: 'center', alignItems: 'center'}} 
                onPress={() => auth.isCoach ? navigation.replace("Clients") : navigation.replace("MyCoaches")}>
                    <AntDesign name="leftcircle" size={40} color="black" />
            </Pressable>
            <View style={{justifyContent: 'center', alignItems: 'flex-end', width: '80%'}}>
                <Text style={{fontSize: 30, color: colors.black}}>{name}</Text>
                { auth.isCoach ? null : <Text style={{fontSize: 15, color: colors.green, fontWeight: 'bold'}}>{specialization}</Text> }
            </View>
        </View>
        <View style={styles.conversationContainer}>
            <FlatList 
                data={messages} 
                keyExtractor={item => item.id} 
                renderItem={({item}) => {
                    return <Message item={item} id={auth.user.id} />
            }} />
        </View>
        <View style={styles.inputMessageContainer}>
          <TextInput maxLength={250} style={{fontSize: 18, width: '80%', height: '100%'}} placeholder="Aa . . ." value={message} onChangeText={(text) => setMessage(text)}></TextInput>
          <Pressable onPress={SendMessage} style={{width: '20%', height: '100%', justifyContent: 'center', alignItems: 'center'}}><MaterialCommunityIcons name="send-circle" size={50} color="black" /></Pressable>
        </View>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        paddingTop: '7%'
    },
    topSection: {
        width: '100%',
        height: '10%',
        flexDirection: 'row',
        borderBottomWidth: 2
    },
    conversationContainer: {
        height: '81%',
        paddingVertical: '5%'
    },
    inputMessageContainer: {
        backgroundColor: 'lightgrey',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '100%',
        height: '9%',
        paddingLeft: '5%',
        flexDirection: 'row'
    },
})

export default CoachChat;