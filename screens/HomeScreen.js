import { View, Text } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../contextapi/AuthContext";

const HomeScreen = () => {
    const auth = useContext(AuthContext);
    return <View>
        <Text>Home screen brasko ${auth.user.username}</Text>
    </View>
}

export default HomeScreen;