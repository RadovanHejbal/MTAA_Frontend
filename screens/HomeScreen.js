import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../contextapi/AuthContext";
import TopScreen from '../components/TopScreen';
import NavBar from '../components/NavBar';

const HomeScreen = ({ navigation }) => {
    const auth = useContext(AuthContext);
    return <SafeAreaView style={styles.container}>
        <TopScreen />
        <Text>Home screen brasko ${auth.user.username}</Text>
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