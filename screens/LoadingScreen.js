import { View, StyleSheet, Text } from "react-native";
import { useEffect, useContext } from "react";
import Axios from "axios";
import { AuthContext } from "../contextapi/AuthContext";
import colors from "../variables/colors";
import url from "../variables/url";

const LoadingScreen = ({navigation}) => {
    const auth = useContext(AuthContext);
    useEffect(() => {
        async function fetchData() {
            try {
              const currentDate = new Date();
              const mealsResponse = await Axios.get(`${url}/users/daily/meals/${currentDate}/${auth.user.id}`);
        
              const activitiesResponse = await Axios.get(`${url}/users/daily/activities/${currentDate}/${auth.user.id}`);
              auth.daily({meals: mealsResponse.data, activities: activitiesResponse.data});
                    
            } catch (err) {
              console.log(err);
              // SOMETHING WENT WRONG, GET ME BACK TO LOGIN PAGE WITH ERROR MESSAGE
            }
          };
        
          fetchData().then(() => {
            navigation.navigate("Home");
          });
    }, [])

    return <View style={styles.container}>
        <Text style={styles.text}>Loading...</Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.green,
        flex: 1,
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: colors.white,
        fontSize: 32
    }
})

export default LoadingScreen;