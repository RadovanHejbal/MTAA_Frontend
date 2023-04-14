import { Pressable, Text, View } from "react-native";

const Item = (props) => {
    return <Pressable onPress={props.details.bind(props.id)}>
        <Text>{props.title}</Text>
    </Pressable>
}

export default Item;