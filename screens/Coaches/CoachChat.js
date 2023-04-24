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

let socket;

const CoachChat = ({navigation}) => {
    const { id, name, specialization } = useRoute().params;
    const [messages, setMessages] = useState([]);
    const [sendingMessages, setSendingMessages] = useState([]);
    const [message, setMessage] = useState("");
    const auth = useContext(AuthContext);

    useEffect(() => {
        axios.get(`${url}/coaches/conversation-messages/${id}`).then(response => {
            setMessages(response.data);
        }).catch(err => {
            console.log(err);
        })

        socket = io(url);
        socket.emit('join', {relationId: id});
        socket.on('message', (data) => {
            if(auth.user.id != data.userId) {
                setMessages(previous => {
                    return [data, ...previous];
                })
            }else {
                console.log(data);
            }
        })

        return () => {
            socket.off('message');
            socket.disconnect();
        }

    }, [navigation])

    function sendMessage() {
        const uu = uuid.v4();
        const date = new Date();

        socket.emit('message', {text: message, relationId: id, userId: auth.user.id, uuid: uu, date: date});
        setMessages(previous => {
            return [...previous, {id: uu, text: message, relation_id: id, owner_id: auth.user.id, date: date}];
        })
        setMessage("");
    }

    console.log(messages);

    return <SafeAreaView style={styles.container} >
        <View style={styles.topView}>
            <Pressable onPress={() => navigation.navigate("MyCoaches")}><Text>{`<-`}</Text></Pressable>
            <View>
                <Text>{name}</Text>
                <Text>{specialization}</Text>
            </View>        
        </View>
        <FlatList style={styles.list} contentContainerStyle={{alignItems: 'flex-end'}} data={messages} keyExtractor={item => item.id} renderItem={({item}) => {
            return <Message item={item} id={auth.user.id} />
        }} />
        <View style={styles.inputView}>
            <TextInput value={message} placeholder="..." onChangeText={(text) => setMessage(text)} style={styles.input} />
            <Pressable onPress={sendMessage} style={styles.send}><Text>send</Text></Pressable>
        </View>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    list: {
        height: '81%',
        flexDirection: 'column',
    },
    topView: {
        height: '10%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    inputView: {
        height: '9%',
        flexDirection: 'row',
    },
    input: {
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        width: '90%'
    },
    send: {
        width: '10%'
    }
})

export default CoachChat;