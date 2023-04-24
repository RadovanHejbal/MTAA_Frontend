import { Pressable, Text, View, StyleSheet } from "react-native";
import colors from "../../variables/colors";

const MessageItem = (props) => {
    
    if(props.coache_id != null){
        return (
            <View style={[styles.coacheMessage, props.userId == props.messageUserId ? {alignSelf: 'flex-end'} : {alignSelf: 'flex-start'}]}>
                <Pressable onPress={props.navigation.navigate('CoachProfile', {id: props.coache_id})}><Text style={{fontSize: 15, color: colors.white, flex: 1, flexWrap: 'wrap'}}>{props.message}</Text></Pressable>
            </View>
        )
    }
    else{
        return (
            <View style={[styles.userMessage, props.userId == props.messageUserId ? {alignSelf: 'flex-end'} : {alignSelf: 'flex-start'}]}>
                <Text style={{fontSize: 15, color: colors.white, flex: 1, flexWrap: 'wrap'}}>{props.message}</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    coacheMessage: {
        paddingVertical: '3%',
        marginHorizontal: '5%',
        paddingHorizontal: '7%',
        flex: 1,
        marginBottom: '3%',
        borderRadius: 30,
        backgroundColor: colors.darkgrey,
    },
    userMessage: {
        marginHorizontal: '5%',
        paddingVertical: '3%',
        paddingHorizontal: '7%',
        flex: 1,
        marginBottom: '3%',
        borderRadius: 30,
        backgroundColor: colors.green,
    }
  });

export default MessageItem;