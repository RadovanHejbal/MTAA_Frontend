import { Pressable, Text, View, StyleSheet, Dimensions, Image, TextComponent, Linking } from "react-native";
import colors from "../../variables/colors";
import { Ionicons } from '@expo/vector-icons';

const FitnessCentrumItem = (props) => {
    function OpenGoogleMap(gymLat, gymLon, lat, lon){
        const start = `${lat},${lon}`;
        const dest = `${gymLat},${gymLon}`;
        const url = `https://www.google.com/maps/dir/?api=1&origin=${start}&destination=${dest}`;
        Linking.openURL(url);
    }
    return (
        <Pressable>
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={{color: colors.white}}>{props.name}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <Pressable onPress={() => OpenGoogleMap(props.gymLat, props.gymLon, props.lat, props.lon) }><Ionicons name="navigate-circle" size={40} color={colors.black} /></Pressable>
                </View>
            </View>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        marginBottom: '5%',
        paddingVertical: '3%',
        paddingHorizontal: '5%',
        borderRadius: 30,
        borderColor: colors.green,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textContainer: {
        width: '80%',
    },
    buttonContainer: {
        width: '20%',
        justifyContent: 'center',
        alignItems: 'flex-end',
    }
});

export default FitnessCentrumItem;