import { View, Text, StyleSheet } from "react-native";
import colors from "../../variables/colors";

const Message = (props) => {
    return <View style={[styles.messageContainer, props.id == props.item.owner_id ? {alignSelf: 'flex-end'} : {alignSelf: 'flex-start', backgroundColor: colors.darkgrey}]}>
                <Text style={{fontSize: 15, color: colors.white, flex: 1, flexWrap: 'wrap'}}>{props.item.text}</Text>
            </View>
}

const styles = StyleSheet.create({
    messageContainer: {
        marginHorizontal: '5%',
        paddingVertical: '3%',
        paddingHorizontal: '7%',
        flex: 1,
        marginBottom: '3%',
        borderRadius: 30,
        backgroundColor: colors.green,
        maxWidth: '70%'
    }
})

export default Message;