import { View, StyleSheet, Text } from "react-native";
import { useEffect, useContext } from "react";
import Axios from "axios";
import { AuthContext } from "../contextapi/AuthContext";
import colors from "../variables/colors";
import url from "../variables/url";
import AnimatedLottieView from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
              AsyncStorage.clear();
              navigation.navigate('Login');
            }
          };
        
          fetchData().then(() => {
            setTimeout(() => {
              auth.isAdmin ? navigation.navigate("AdminHome") : navigation.navigate("Home");
            }, 1000);
          });
    }, [])

    return <View style={styles.container}>
      <View style={styles.loadingContainer}>
          <AnimatedLottieView source={require('../assets/Loading.json')} autoPlay loop />
          <View style={styles.loadingTextContainer}>
            <Text style={styles.text}>LOADING</Text>
          </View>
      </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    loadingContainer: {
      width: '100%',
      height: '30%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingTextContainer: {
      marginTop: '20%',
      width: '100%',
      height: '20%',
      alignItems: 'center',
    },
    text: {
        color: colors.darkgrey,
        fontSize: 32,
        fontStyle: 'italic',
        fontWeight: 'bold'
    }
})

export default LoadingScreen;