import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contextapi/AuthContext";
import TopScreen from '../components/TopScreen';
import NavBar from '../components/NavBar';

const HomeScreen = ({ navigation }) => {
    const auth = useContext(AuthContext);

    useEffect(() => {
        console.log(auth.dailyMeals);
        console.log(auth.dailyActivities);
    })
    return <SafeAreaView style={styles.container}>
        <TopScreen />
        <View>
            <View>
                <View></View>
                <View></View>
                <View></View>
                <View></View>
            </View>
            <View>
                <View></View>
                <View></View>
                <View></View>
                <View></View>
            </View>
        </View>
        <NavBar navigation={navigation} />
    </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%'
    }
})

export default HomeScreen;