import { Pressable, View, Text } from "react-native/types";

const NavBar = ({navigation}) => {
    return <View>
        <View><Pressable onPress={() => navigation.navigate('Home')}><Text>Home</Text></Pressable></View>
        <View><Pressable onPress={() => navigation.navigate('Coaches')}><Text>Coaches</Text></Pressable></View>
        <View><Pressable onPress={() => navigation.navigate('Recepies')}><Text>Recepies</Text></Pressable></View>
        <View><Pressable onPress={() => navigation.navigate('Forum')}><Text>Forum</Text></Pressable></View>
    </View>
}

export default NavBar;