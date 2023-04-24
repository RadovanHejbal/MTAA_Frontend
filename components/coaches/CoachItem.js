import { Pressable, View, Text } from "react-native";

const CoachItem = (props) => {
    return <View>
        <View>
            <Text>{props.name}</Text>
            <Text>{props.specialization}</Text>
        </View>
        <Pressable onPress={() => props.navigation.navigate('CoachProfile', {id: props.id})}><Text>{`->`}</Text></Pressable>
    </View>
}

export default CoachItem;