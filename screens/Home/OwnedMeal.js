import { Pressable, View, Text, StyleSheet } from "react-native";

const OwnedMeal = (props) => {
    return <View style={styles.container}>
        <Text>{props.meal.title}</Text>
        <Text>{parseInt(props.meal.kcal).toFixed(0)} kcal</Text>
        <Pressable onPress={props.delete.bind(this, props.meal)}><Text>delete</Text></Pressable>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

export default OwnedMeal;