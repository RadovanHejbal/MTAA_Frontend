import { Pressable, Text, View, StyleSheet, Dimensions } from "react-native";
import colors from "../../variables/colors"; 

const AdminUserItem = (props) => {
    return (
        <Pressable onPress={props.func.bind(this, props.user)} style={styles.user}>
            <View>
                <Text style={{fontSize: 20, fontWeight: 'bold', fontStyle: 'italic'}}>{props.user.username}</Text>
            </View>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    user: {
        width: Dimensions.get('screen').width * 0.75,
        borderWidth: 2,
        borderColor: colors.green,
        borderRadius: 30,
        paddingVertical: '3%',
        marginBottom: '5%',
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default AdminUserItem;