import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import colors from "../variables/colors";

const TopScreen = () => {
    return <View style={styles.container}>
        <View style={styles.item}>
            <View style={styles.logo}></View>
        </View>
        <View style={styles.middleItem}>
            <Text style={styles.middleText}>FitMe</Text>
        </View>
        <View style={styles.item}>
            <MaterialIcons name="fitness-center" size={48} color="black" />
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        height: '9%',
        alignItems: 'flex-end'
    },
    middleItem: {
        flex: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 4,
        borderBottomColor: colors.green
    },
    middleText: {
        fontSize: 40,
        alignItems: 'center'
    },
    item: {
        flex: 2,
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    gyms: {
        flex: 1
    },
    logo: {
        width: 48,
        height: 48,
        borderRadius: '50%',
        backgroundColor: 'black',
    },
})

export default TopScreen;