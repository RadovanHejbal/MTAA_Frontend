import { useEffect, useState, useContext } from "react";
import { Pressable, SafeAreaView, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import url from "../../variables/url";
import { AuthContext } from "../../contextapi/AuthContext";

const CoachProfile = ({navigation}) => {
    const {id} = useRoute().params;
    const [loading, setLoading] = useState(true);
    const [coach, setCoach] = useState(null);
    const auth = useContext(AuthContext);

    useEffect(() => {
        axios.get(`${url}/coaches/details/${id}`).then(response => {
            setCoach(response.data);
            setLoading(false);
        }).catch(err => {
            console.log(err);
        })
    })

    function buyCoach() {
        axios.post(`${url}/coaches/owned-coaches/add`, {
            coachId: coach.id,
            userId: auth.user.id
        }).then(response => {
            navigation.navigate('MyCoaches');
        }).catch(err => {
            console.log(err);
        })
    }

    if(loading) {
        return <SafeAreaView><Text>Loading</Text></SafeAreaView>
    }

    return <SafeAreaView>
        <View>
            <Pressable></Pressable>
            <View>
                <Text>{coach.firstname + " " + coach.lastname}</Text>
                <Text>{coach.age + " years"}</Text>
            </View>
        </View>
        <View>
            <Text>{coach.specializaion}</Text>
            <Text>{coach.description}</Text>
        </View>
        <Pressable onPress={buyCoach}><Text>Buy</Text></Pressable>
    </SafeAreaView>
}

export default CoachProfile;