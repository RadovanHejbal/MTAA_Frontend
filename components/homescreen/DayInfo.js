import { Pressable, Text, View, StyleSheet } from "react-native";
import colors from "../../variables/colors";
import { Ionicons } from '@expo/vector-icons'; 

const DayInfo = (props) => {
    return <View style={styles.container}>
    <Text style={[styles.text, styles.title]}>{props.title}</Text>
    <Text style={styles.text}>{props.subtitle}</Text>
    {props.add ? <View><Pressable onPress={props.add}><Ionicons name="add-circle" size={40} color="black" /></Pressable></View> : null}
</View>
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.green,
        borderRadius: 8, 
        width: '42%',
        padding: 8,
        alignItems: 'center'       
    },
    text: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold'
    },
    title: {
        fontSize: 24
    }
})

export default DayInfo;