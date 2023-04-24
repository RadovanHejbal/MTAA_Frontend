import { View, Text, StyleSheet, Pressable } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import colors, { black } from "../variables/colors";
import { FontAwesome } from '@expo/vector-icons'; 

const TopScreen = ( {navigation} ) => {
    return <View style={styles.container}>
        <Pressable onPress={() => navigation.navigate("Profile")} style={styles.item}>
            <FontAwesome name="user" size={48} color="black" />
        </Pressable>
        <View style={styles.middleItem}>
            <Text style={styles.middleText}>FitMe</Text>
        </View>
        <Pressable onPress={() => navigation.navigate("Fitness")} style={styles.item}>
            <MaterialIcons name="fitness-center" size={48} color="black" />
        </Pressable>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
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
        fontStyle: 'italic',
        fontWeight: 'bold'
    },
    item: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export default TopScreen;