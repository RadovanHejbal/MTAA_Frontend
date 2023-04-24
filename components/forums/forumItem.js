import { Pressable, Text, View, StyleSheet, Dimensions } from "react-native";
import { useState } from "react";
import { AntDesign } from '@expo/vector-icons';
import colors from "../../variables/colors"; 
import axios from "axios";
import url from "../../variables/url";

const ForumItem = (props) => {
    const [upPressed, setUpPressed] = useState(false);
    const [downPressed, setDownPressed] = useState(false);

    function UpdateVotes(votes) {
        axios
        .put(`${url}/forums/vote-update/${props.id}`, {
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
        <Pressable onPress={props.section.bind(this, props.title, props.id, props.closed_at, props.owner_id)} style={styles.Forum}>
            <View style={{justifyContent: 'center', width: '15%'}}><Text style={{textAlign: 'center', fontSize: 15, fontWeight: 'bold'}}>{props.votes}</Text></View>
            <View style={styles.votes}>
                <Pressable onPress={UpVote}><AntDesign style={{marginVertical: '10%'}} name="upcircle" size={35} color={colors.green} /></Pressable>
                <Pressable onPress={DownVote}><AntDesign style={{marginVertical: '10%'}} name="downcircle" size={35} color="black" /></Pressable>
            </View>
            <View style={{justifyContent:'center'}}>
                <Text style={styles.ForumTitle}>{props.title}</Text>
            </View>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    Forum: {
      marginBottom: '5%',
      marginHorizontal: '5%',
      borderRadius: 30,
      borderWidth: 3,
      width: Dimensions.get('window').width * 0.8,
      borderColor: colors.green,
      flexDirection: 'row',
    },
    ForumTitle: {
      alignSelf: 'center',
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.darkgrey,
    },
    votes: {
      marginRight: '5%',
      marginVertical: '1%',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }
  });

export default ForumItem;