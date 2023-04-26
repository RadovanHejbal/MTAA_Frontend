import { Pressable, View, Text, StyleSheet, Dimensions } from "react-native";
import colors from "../../variables/colors";

const CoachItem = (props) => {
    return <Pressable onPress={() => props.navigation.navigate('CoachProfile', {id: props.id})}>
            <View style={styles.constainer}>
                <Text style={{fontSize: 25, color: colors.darkgrey}}>{props.name}</Text>
                <Text style={{fontSize: 15, fontWeight: 'bold', color: colors.green}}>{props.specialization}</Text>
             </View>
        </Pressable>
}

const styles = StyleSheet.create({
    constainer: {
        width: Dimensions.get('screen').width * 0.8,
        height: Dimensions.get('screen').height * 0.1,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: colors.green,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: '5%',
        marginBottom: '5%'
    }
});

export default CoachItem;