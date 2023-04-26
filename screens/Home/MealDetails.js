import { useEffect, useState, useContext } from "react";
import { Alert, Pressable, SafeAreaView, Text, TextInput, View, StyleSheet } from "react-native";
import { useRoute } from '@react-navigation/native';
import axios from "axios";
import url from "../../variables/url";
import colors from "../../variables/colors";
import { AuthContext } from "../../contextapi/AuthContext";

const MealDetails = (props) => {
    const auth = useContext(AuthContext);
    const route = useRoute();
    const { id } = route.params;
    const [details, setDetails] = useState({
        title: "",
        kcal: 0,
        protein: 0,
        carbohydrates: 0,
        fat: 0,
        id: ""
    });
    const [grams, setGrams] = useState(100);

    function errorHandler() {
        props.navigation.navigate("Home");
    }

    useEffect(() => {
        axios.get(`${url}/meals/details/${id}`).then(response => {
            setDetails(response.data);
        }).catch(err => {
            Alert.alert('Something went wrong', 'Try to reload a page', 
            [{text: 'Okay', style: 'destructive', onPress: errorHandler}]);
        })
    }, []);

    function gramsChange(text) {
        setGrams(parseInt(text));
    }

    function addMeal() {
        if(!grams) {
            return;
        }
        axios.post(`${url}/meals/add`, {
            ownerId: auth.user.id,
            grams: grams,
            date: new Date(),
            mealId: id
        }).then(response => {
            auth.addMeal({kcal: response.data.grams * details.kcal, protein: response.data.grams * details.protein, fat: response.data.grams * details.fat, carbs: response.data.grams * details.carbohydrates, grams: response.data.grams, title: details.title, id: response.data.id});
            props.navigation.navigate("Home");
        }).catch(err => {
            console.log(err);
            Alert.alert('Something went wrong!', 'Try again please', [{text: 'Okay', style: 'destructive', onPress: errorHandler}]);
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>{details.title}</Text>
            <View>
                <Text style={styles.text}>{grams ? (details.kcal * grams).toFixed(0) : 0} kcal</Text>
                <View>
                    <Text style={styles.text}>{grams ? (details.protein * grams).toFixed(0) : 0} protein</Text>
                    <Text style={styles.text}>{grams ? (details.fat * grams).toFixed(0) : 0} fat</Text>
                    <Text style={styles.text}>{grams ? (details.carbohydrates * grams).toFixed(0) : 0} carbs</Text>
                </View>
            </View>
            <TextInput placeholder="Grams" keyboardType="numeric" onChangeText={gramsChange} style={styles.input} />
            <Pressable onPress={addMeal} style={styles.button}><Text style={styles.buttonText}>Add meal</Text></Pressable>
            <Pressable onPress={() => {props.navigation.navigate('SearchMeal')}} style={styles.cancel}><Text style={styles.cancelText}>Cancel</Text></Pressable>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
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

export default MealDetails;