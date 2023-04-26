import { Pressable, Text, View, StyleSheet } from "react-native";
import colors from "../../variables/colors";
import { Ionicons } from '@expo/vector-icons'; 

const DayInfo = (props) => {
    return (
        <View style={styles.container}>
            <View style={{justifyContent: 'center', alignItems: 'center', width: props.add ? '70%' : '100%'}}>
                <Text style={[styles.text, styles.title]}>{props.title}</Text>
                <Text style={[styles.text, {color: colors.black}]}>{props.subtitle}</Text>
            </View>
            {props.add ?
                <View style={{justifyContent: 'center', alignItems: 'center', width: '30%'}}>
                    <Pressable onPress={props.add}><Ionicons name="add-circle" size={40} color={colors.black} /></Pressable>
                </View>: null
            }
        </View>
)}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.green,
        borderRadius: 8, 
        width: '45%',
        paddingVertical: '2%',
        alignItems: 'center',
        flexDirection: 'row'   
    },
    text: {
        color: colors.white,
        fontSize: 15,
        fontWeight: 'bold'
    },
    title: {
        fontSize: 18
    }
})

export default DayInfo;