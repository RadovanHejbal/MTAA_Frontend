import { View, Text, StyleSheet, SafeAreaView, Pressable, TextInput, Dimensions, Image } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import colors from "../../variables/colors";
import { AntDesign } from '@expo/vector-icons';
import { useContext, useEffect, useState } from "react";
import PickFromGalery from "../../components/Galery";
import PickFromCamera from "../../components/Camera";
import axios from "axios";
import url from "../../variables/url";
import { AuthContext } from "../../contextapi/AuthContext";

const RecepieAddScreen = ({ navigation }) => {
  const [recepieName, setRecepieName] = useState('');
  const [recepieProcess, setRecepieProcess] = useState('');
  const [visible, setVisible] = useState(false);
  const [image, setImage] = useState(null);
  const auth = useContext(AuthContext);

  function AddRecepie(){
    if(recepieName.trim() == "" || recepieProcess.trim() == ""){
        console.log("nechyba ti nieco?");
        return;
    }
    axios
      .post(`${url}/recepies/recepie-create`, {
        title: recepieName,
        process: recepieProcess,
        picture: image,
        ownerId: auth.user.id
      })
      .then(response => {
        console.log("success");
      })
      .catch(err => {
        console.log(err);
    });
    navigation.navigate("Recepies")
  }
  useEffect(() => {
  }, [image]);

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.topSection}>
          <View style={styles.addPhoto}>
            <Pressable onPress={() => setVisible(true)}>
                {image != null? (<Image source={{uri: image}} style={{ borderWidth: 10, width: Dimensions.get('window').width * 0.31, height: Dimensions.get('window').width * 0.31, resizeMode: 'center', borderRadius: 20}}></Image>):(<MaterialIcons name="add-a-photo" size={70} color="black" />)}
            </Pressable>
          </View>
          <View style={styles.rightTopSection}>
            <View style={styles.returnButton}>
              <Pressable onPress={() => {navigation.navigate("Recepies")}}><AntDesign name="closecircle" size={45} color="black" /></Pressable>
            </View>
            <View style={styles.nameSection}>
              <TextInput maxLength={10} style={{fontSize: 20, color: colors.black}} placeholder="Name . . ." onChangeText={(text) => {setRecepieName(text)}}></TextInput>
            </View>
          </View>
        </View>
        <View style={styles.midSection}>
            <View style={{width: '100%', borderBottomWidth: 2, borderColor: colors.green}}>
                <Text style={{fontSize: 20}}>Process</Text>
            </View>
            <View style={styles.inputProcessSection}>
                <TextInput 
                  maxLength={250} 
                  keyboardType="default" 
                  returnKeyType="done" 
                  multiline={true} 
                  blurOnSubmit={true} 
                  placeholder="Process . . ." 
                  style={{width: '100%', height: '100%', color: colors.black, textAlignVertical: 'top', fontSize: 15}}
                  onChangeText={(text) => {setRecepieProcess(text)}}></TextInput>
            </View>
        </View>
        <View style={styles.bottomSection}>
            <Pressable onPress={AddRecepie} style={{width: '30%', height: '50%', backgroundColor: colors.green, borderRadius: 30, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 20, color: colors.white, fontWeight: 'bold'}}>ADD</Text>
            </Pressable>
        </View>
        {visible? (
            <View style={styles.chooseSection}>
                <View style={styles.chooseButton}>
                    <Pressable onPress={async () => {setImage(await PickFromCamera()); setVisible(false)}}><Text style={{fontSize: 15, color: colors.white}}>Camera</Text></Pressable>
                </View>
                <View style={styles.chooseButton}>
                    <Pressable onPress={async () => {setImage(await PickFromGalery()); setVisible(false)}}><Text style={{fontSize: 15, color: colors.white}}>Galery</Text></Pressable>
                </View>
                <View style={{marginLeft: '2%'}}>
                    <Pressable onPress={() => setVisible(false)}><AntDesign name="closecircle" size={30} color="black" /></Pressable>
                </View>
            </View>) : null
        }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        padding: '5%',
    },
    topSection: {
        width: '100%',
        height: '20%',
        paddingTop: '7%',
        paddingBottom: '3%',
        paddingHorizontal: '3%',
        flexDirection: 'row'
    },
    addPhoto: {
        height: '100%',
        width: '35%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#B0B0B0',
        borderRadius: 20,
        marginRight: '3%'
    },
    rightTopSection: {
        height: '100%',
        width: '62%'
    },
    returnButton: {
        width: '100%',
        height: '60%',
        alignItems: 'flex-end',
        marginLeft: '5%'
    },
    nameSection: {
        height: '40%',
        justifyContent: 'flex-end',
        borderBottomWidth: 2,
        borderColor: colors.green
    },
    midSection: {
        padding: '3%',
        width: '100%',
        height: '70%',
    },
    inputProcessSection: {
        borderWidth: 2,
        borderRadius: 20,
        width: '100%',
        marginTop: '5%',
        padding: '5%',
        height: '90%',
    },
    bottomSection: {
        width: '100%',
        height: '10%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    chooseSection: {
        position: 'absolute',
        width: '100%',
        height: '10%',
        marginTop: Dimensions.get('window').height * 0.22,
        marginLeft: Dimensions.get('window').width * 0.05,
        backgroundColor: colors.green,
        borderRadius: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    chooseButton: {
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: colors.darkgrey,
        borderRadius: 30,
        width: '35%',
        height: '50%',
        marginRight: '3%'
    },
});

export default RecepieAddScreen;
