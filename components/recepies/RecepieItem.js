import { Pressable, Text, View, StyleSheet, Dimensions, Image } from "react-native";
import { useContext, useState } from "react";
import colors from "../../variables/colors"; 
import axios from "axios";
import url from "../../variables/url";
import { MaterialIcons } from '@expo/vector-icons';
import { AuthContext } from "../../contextapi/AuthContext";
import { AntDesign } from '@expo/vector-icons';

const RecepieItem = (props) => {
    const [upPressed, setUpPressed] = useState(false);
    const [downPressed, setDownPressed] = useState(false);
    const auth = useContext(AuthContext);

    function DeleteRecepies(){
        axios
        .delete(`${url}/recepies/recepie-delete/${props.id}`, {})
          .then(response => {
            props.func();
          })
          .catch(err => {
            console.log(err);
        });
    }

    function UpdateVotes(votes) {
        axios
        .put(`${url}/recepies/vote-update/${props.id}`, {
            votes: votes
          })
          .then(response => {})
          .catch(err => {
            console.log(err);
        });
    }

    function UpVote()
    {
        if(upPressed) return;
        props.votes += 1;
        if(downPressed) {
            setDownPressed(false);
        }
        else {
            setDownPressed(false);
            setUpPressed(true);
        }
        UpdateVotes(props.votes);
    }
    function DownVote()
    {
        if(downPressed) return;
        props.votes -= 1;
        if(upPressed){
            setUpPressed(false)
        }
        else{
            setUpPressed(false);
            setDownPressed(true);
        }
        UpdateVotes(props.votes);
    }

    return (
        <Pressable onPress={props.recepie.bind(this, props.title, props.id, props.process, props.image)} style={styles.Recepie}>
            <View style={{width: '100%', height: '100%', flexDirection: 'row'}}>
                {props.image != null? (<Image style={{width: '40%', height: '100%', resizeMode: 'center', borderRadius: 25}} source={{uri: props.image}}></Image>): 
                (<View style={{width: '40%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightgrey', borderRadius: 25}}><MaterialIcons name="no-photography" size={80} color="black" /></View>)}
                <View style={{flexDirection: 'column', width: '60%', justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{borderWidth: 2, justifyContent: 'center', alignItems: 'center', padding: '5%', paddingHorizontal: '10%', borderRadius: 30, borderColor: colors.green, maxWidth: '90%', maxHeight: '60%'}}>
                        <Text style={{fontWeight: 'bold'}}>{props.title}</Text>
                    </View>
                    <View style={{marginTop: '5%'}}>
                        <Text style={{fontSize: 12}}>{props.votes}</Text>
                    </View>
                </View>
            </View>
            {auth.isAdmin ? 
                <View style={{position: 'absolute', marginLeft: '90.5%', marginTop: '-1%'}}>
                    <Pressable onPress={DeleteRecepies}><AntDesign name="closecircle" size={30} color="black" /></Pressable>
                </View> : null
            }
            <View style={styles.votes}>
                <Pressable onPress={UpVote} style={[styles.button, {backgroundColor: colors.green, marginRight: '10%'}]}><Text style={{color: colors.white, fontSize: 15}}>+</Text></Pressable>
                <Pressable onPress={DownVote} style={[styles.button, {backgroundColor: colors.darkgrey}]}><Text style={{color: colors.white, fontSize: 20}}>-</Text></Pressable>
            </View>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    Recepie: {
        marginBottom: '10%',
        borderRadius: 30,
        borderWidth: 3,
        marginHorizontal: '5%',
        width: Dimensions.get('window').width * 0.8,
        height: Dimensions.get('window').height * 0.15,
        borderColor: colors.green,
        flexDirection: 'row',
    },
    votes: {
        position: 'absolute',
        flexDirection: 'row',
        width: '30%',
        marginTop: '4%',
        marginLeft: '2%',
        padding: '5%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    button: {
        width: '40%', 
        height: '30%', 
        borderRadius: 30, 
        justifyContent: 'center', 
        alignItems: 'center'
    }
});

export default RecepieItem;