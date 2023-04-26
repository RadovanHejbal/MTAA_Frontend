import { useEffect, useState, useContext } from "react";
import { Pressable, SafeAreaView, Text, View, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import url from "../../variables/url";
import { AuthContext } from "../../contextapi/AuthContext";
import { AntDesign } from '@expo/vector-icons'; 
import colors from "../../variables/colors";

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
        <View style={styles.topSection}>
            <Pressable style={{height: '100%', width: '20%', justifyContent: 'center', alignItems: 'center', paddingTop: '5%'}} onPress={() => navigation.navigate("Coaches")}><AntDesign name="leftcircle" size={40} color="black" /></Pressable>
            <View style={{justifyContent: 'flex-end', alignItems: 'flex-end', width: '70%'}}>
                <Text style={{fontSize: 30, color: colors.black}}>{coach.firstname + " " + coach.lastname}</Text>
                <Text style={{fontSize: 15, color: colors.green, fontWeight: 'bold'}}>{coach.age + " years"}</Text>
            </View>
        </View>
        <View style={styles.specializaionSection}>
            <Text style={{fontWeight: 'bold'}}>Specialization: </Text>
            <Text style={{color: colors.green}}>{coach.specializaion}</Text>
        </View>
        <View style={styles.descriptionSection}>
            <Text style={{fontWeight: 'bold'}}>Description: </Text>
            <Text style={{flexWrap: 'wrap', fontSize: 18, fontStyle: 'italic'}}>{coach.description}</Text>
        </View>
        <View style={styles.buyButton}>
            <Pressable style={{paddingHorizontal: '10%', paddingVertical: '1%', backgroundColor: colors.green, borderRadius: 30}} onPress={buyCoach}><Text style={{fontWeight: 'bold', color: colors.white, fontSize: 20}}>BUY</Text></Pressable>
        </View>
    </SafeAreaView>
};

const styles = StyleSheet.create({
    topSection: {
        width: '100%',
        height: '12%',
        flexDirection: 'row',
        borderWidth: 1
    },
    specializaionSection: {
        width: '100%',
        height: '5%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: '2%',
        flexDirection: 'row'
    },
    descriptionSection:{
        width: '100%',
        height: '75%',
        padding: '2%'
    },
    buyButton: {
        width: '100%',
        height: '8%',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default CoachProfile;