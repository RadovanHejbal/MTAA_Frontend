import { useEffect, useState, useContext } from "react";
import { Alert, Pressable, SafeAreaView, Text, TextInput, View, StyleSheet } from "react-native";
import { useRoute } from '@react-navigation/native';
import axios from "axios";
import url from "../../variables/url";
import colors from "../../variables/colors";
import { AuthContext } from "../../contextapi/AuthContext";

const ActivityDetails = (props) => {
    const auth = useContext(AuthContext);
    const route = useRoute();
    const { id } = route.params;
    const [details, setDetails] = useState({
        title: "",
        kcal: 0,
        id: ""
    });
    const [time, setTime] = useState(30);

    function errorHandler() {
        props.navigation.navigate("Home");
    }

    useEffect(() => {
        axios.get(`${url}/activities/details/${id}`).then(response => {
            setDetails(response.data);
        }).catch(err => {
            Alert.alert('Something went wrong', 'Try to reload a page', 
            [{text: 'Okay', style: 'destructive', onPress: errorHandler}]);
        })
    }, []);

    function timeChange(text) {
        setTime(parseInt(text));
    }

    function addActivity() {
        if(!time) {
            return;
        }
        axios.post(`${url}/activities/add`, {
            ownerId: auth.user.id,
            time: time,
            date: new Date(),
            activityId: id
        }).then(response => {
            auth.addActivity({kcal: response.data.time_amount * details.kcal, title: details.title, id: response.data.id, time: response.data.time_amount});
            props.navigation.navigate("Home");
        }).catch(err => {
            console.log(err);
            Alert.alert('Something went wrong!', 'Try again please', [{text: 'Okay', style: 'destructive', onPress: errorHandler}]);
        })
    }

    return <SafeAreaView style={styles.container}>
        <Text style={styles.title}>{details.title}</Text>
        <View>
            <Text style={styles.text}>{time ? (details.kcal * time).toFixed(0) : 0} kcal</Text>
        </View>
        <TextInput placeholder="Sec" keyboardType="numeric" onChangeText={timeChange} style={styles.input} />
        <Pressable onPress={addActivity} style={styles.button}><Text style={styles.buttonText}>Add activity</Text></Pressable>
        <Pressable onPress={() => {props.navigation.navigate('SearchActivity')}} style={styles.cancel}><Text style={styles.cancelText}>Cancel</Text></Pressable>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: '5%',
        borderBottomWidth: 2,
        borderColor: colors.green
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: colors.green,
        fontSize: 16,
        paddingVertical: '3%',
        paddingHorizontal: '5%'
    },
    button: {
        backgroundColor: colors.green,
        borderRadius: 30,
        paddingVertical: '3%',
        paddingHorizontal: '5%',
        marginVertical: '5%'
    },
    buttonText: {
        color: colors.white,
        fontSize: 16,
    },
    text: {
        marginBottom: 8,
        fontSize: 16,
        fontWeight: 600
    },
    cancel: {
        backgroundColor: colors.darkgrey,
        borderRadius: 30,
        paddingVertical: '3%',
        paddingHorizontal: '5%'
    },
    cancelText: {
        color: colors.white,
        fontSize: 16
    },
})

export default ActivityDetails;