import { useEffect, useState, useContext } from "react";
import { Alert, Pressable, SafeAreaView, Text, TextInput, View, StyleSheet } from "react-native";
import { useRoute } from '@react-navigation/native';
import axios from "axios";
import url from "../variables/url";
import colors from "../variables/colors";
import { AuthContext } from "../contextapi/AuthContext";

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
            props.navigation.navigate("Home");
        }).catch(err => {
            console.log(err);
            Alert.alert('Something went wrong!', 'Try again please', [{text: 'Okay', style: 'destructive', onPress: errorHandler}]);
        })
    }

    return <SafeAreaView>
        <Text style={styles.title}>{details.title}</Text>
        <View>
            <Text>{grams ? (details.kcal * grams).toFixed(2) : 0} kcal</Text>
            <View>
                <Text>{grams ? (details.protein * grams).toFixed(2) : 0} protein</Text>
                <Text>{grams ? (details.fat * grams).toFixed(2) : 0} fat</Text>
                <Text>{grams ? (details.carbohydrates * grams).toFixed(2) : 0} carbs</Text>
            </View>
        </View>
        <TextInput keyboardType="numeric" onChangeText={gramsChange} style={styles.input} />
        <Pressable onPress={addMeal} style={styles.button}><Text style={styles.buttonText}>Add meal</Text></Pressable>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 32
    },
    input: {
        borderWidth: 1,
        borderColor: colors.black
    },
    button: {
        backgroundColor: colors.green
    },
    buttonText: {
        color: colors.white
    }
})

export default MealDetails;