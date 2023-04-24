import { Pressable, View, Text } from "react-native";

const MyCoachItem = (props) => {
    return <Pressable onPress={() => props.navigation.navigate('CoachChat', {id: props.id, specialization: props.specialization, name: props.name})}>
        <View>
            <Text>{props.name}</Text>
            <Text>{props.specialization}</Text>
        </View>
    </Pressable>
}

export default MyCoachItem;