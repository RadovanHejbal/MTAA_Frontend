import { View, Text, StyleSheet } from "react-native";
import colors from "../../variables/colors";

const Message = (props) => {
    return <View style={styles.container}>
        <View style={[props.id == props.item.owner_id ? styles.end : styles.start]}>
            <View style={[props.id == props.item.owner_id ? {backgroundColor: colors.green} : {backgroundColor: colors.darkgrey} ,styles.messageContainer]}><Text style={styles.text}>{props.item.text}</Text></View>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        
    },
    messageContainer: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 16,
        marginBottom: 16
    },
    text: {
        color: colors.white
    },
    end: {
        alignItems: 'flex-end',
    },
    start: {
        alignItems: 'flex-start'
    },
})

export default Message;