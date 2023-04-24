import { Pressable, View, Text, StyleSheet } from "react-native";
import colors from "../../variables/colors";

const OwnedMeal = (props) => {
    return <View style={styles.container}>
        <Text style={styles.title}>{props.meal.title}</Text>
        <Text>{parseInt(props.meal.kcal).toFixed(0)} kcal</Text>
        <Pressable onPress={props.delete.bind(this, props.meal)}><Text>delete</Text></Pressable>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: colors.green,
        padding: 8
    },
    title: {
        width: '50%',
        overflow: 'hidden',
        fontWeight: 600
    }
})

export default OwnedMeal;