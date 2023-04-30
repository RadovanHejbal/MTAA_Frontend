import { View, Text, StyleSheet, Pressable } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import colors, { black } from "../variables/colors";
import { FontAwesome } from '@expo/vector-icons'; 
import {useNetInfo} from '@react-native-community/netinfo';

const TopScreen = ( {navigation} ) => {
    return <View style={styles.container}>
        <Pressable onPress={() => navigation.replace("Profile")} style={styles.item}>
            <FontAwesome name="user" size={48} color="black" />
        </Pressable> 
        <View style={styles.middleItem}>
            {useNetInfo().isConnected ? <Text style={styles.middleText}>FitMe</Text> : <Text style={[styles.middleText, {color: 'red'}]}>Offline</Text>}
        </View>
        <Pressable onPress={() => navigation.navigate("Fitness")} style={styles.item}>
            <MaterialIcons name="fitness-center" size={48} color="black" />
        </Pressable>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        width: '100%',
        height: '10%',
    },
    middleItem: {
        flex: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 4,
        borderBottomColor: colors.green
    },
    middleText: {
        fontSize: 30,
        alignItems: 'center',
        fontStyle: 'normal',
        fontWeight: 'bold'
    },
    item: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export default TopScreen;