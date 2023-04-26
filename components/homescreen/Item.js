import { Pressable, Text, StyleSheet } from "react-native";
import colors from "../../variables/colors";

const Item = (props) => {
    return <Pressable onPress={props.details.bind(this, props.id)} style={styles.button} >
        <Text style={styles.text} >{props.title}</Text>
    </Pressable>
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        padding: 8,
        marginBottom: 8,
        borderBottomWidth: 1,
        borderColor: colors.green
    },
    text: {
        fontWeight: 600
    }
})

export default Item;