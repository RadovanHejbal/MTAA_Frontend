import { Pressable, View, Text, StyleSheet } from "react-native";
import colors from "../../variables/colors";
import { Ionicons } from '@expo/vector-icons';

const OwnedItem = (props) => {
    return (
        <View style={styles.container}>
            <View style={{width: '50%', justifyContent: 'center'}}>
                <Text style={{fontWeight: '500'}}>{props.item.title}</Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingLeft: '5%', alignItems: 'center'}}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 12}}>{parseInt(props.item.kcal).toFixed(0)} kcal</Text>
                    <Text style={{fontSize: 12}}> {props.item.grams === undefined ? parseInt(props.item.time / 60).toFixed(0) + " min" :  parseInt(props.item.grams).toFixed(0) + " g"}</Text>
                </View>
                <Pressable onPress={props.delete.bind(this, props.item)}><Ionicons name="close-circle" size={40} color={colors.green} /></Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: colors.green,
        padding: '2%',
    },
})

export default OwnedItem;