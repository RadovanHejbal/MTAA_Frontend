import { View, Text, StyleSheet, SafeAreaView, Pressable, TextInput, Alert } from "react-native";
import TopScreen from "../components/TopScreen";
import NavBar from "../components/NavBar";
import colors from "../variables/colors";
import { FontAwesome5 } from '@expo/vector-icons';
import { useContext, useState } from "react";
import { AuthContext } from "../contextapi/AuthContext";
import url from "../variables/url";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const auth = useContext(AuthContext);

  function UpdateProfile(){
    if((username === auth.user.username || username.trim() === "") && (password === auth.user.password || password.trim() === "") && (email === auth.user.email || email.trim() === "") && 
    (weight === auth.user.weight || weight === null) && (height === auth.user.height || height === null))
    {
      return;
    }
    axios
      .put(`${url}/users/update-user/${auth.user.id}`, {
        username: username === ''? auth.user.username : username,
        email: email === ''? auth.user.email : email,
        password: password === ''? auth.user.password : password,
        height: height === null? auth.user.height : height,
        weight: weight === null? auth.user.weight : weight
      })
      .then(response => {
        auth.update(username, email, password, height, weight);
        setUsername('');
        setPassword('');
        setEmail('');
        setWeight(null);
        setHeight(null);
      })
      .catch(err => {
        console.log(err);
        Alert.alert(
          'Used username',
          `Username "${username}" already exists`,
          [
            {
              text: 'OK'
            }
          ],
          { cancelable: false }
        );
      })
  }
  function LogOut(){
    auth.logout();
    navigation.replace("Login"); 
  }

  return (
    <SafeAreaView style={styles.container}>
      <TopScreen navigation={navigation}/>
      <View style={styles.SectionContainer}>
        <Text style={styles.Section}>Profile</Text>
      </View>
      <View style={styles.infoSection}>
        <View style={styles.longTextInput}>
          <TextInput style={{fontSize: 15, width: '90%'}} placeholder={`Username: ${auth.user.username}`} value={username} onChangeText={(text) => setUsername(text)} />
          <FontAwesome5 name="pen" size={30} color={colors.green} />
        </View>
        <View style={styles.longTextInput}>
          <TextInput style={{fontSize: 15, width: '90%'}} placeholder={`Email: ${auth.user.email}`} value={email} onChangeText={(text) => setEmail(text)} />
          <FontAwesome5 name="pen" size={30} color={colors.green} />
        </View>
        <View style={styles.longTextInput}>
          <TextInput style={{fontSize: 15, width: '90%'}} placeholder={`Password: ${auth.user.password}`} value={password} onChangeText={(text) => setPassword(text)} />
          <FontAwesome5 name="pen" size={30} color={colors.green} />
        </View>
        <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
          <View style={styles.shortTextInput}>
            <TextInput keyboardType="numeric" style={{fontSize: 15, width: '80%'}} placeholder={`Height: ${auth.user.height}`} value={height} onChangeText={(text) => setHeight(text)} />
            <FontAwesome5 name="pen" size={30} color={colors.green} />
          </View>
          <View style={styles.shortTextInput}>
            <TextInput keyboardType="numeric" style={{fontSize: 15, width: '80%'}} placeholder={`Weight: ${auth.user.weight}`} value={weight} onChangeText={(text) => setWeight(text)} />
            <FontAwesome5 name="pen" size={30} color={colors.green} />
          </View>
        </View>
        <View style={{width: '50%', marginLeft: '25%', marginTop: '10%', paddingHorizontal: '5%', paddingVertical: '2%', backgroundColor: colors.green, borderRadius: 30, alignItems: 'center'}}>
          <Pressable onPress={UpdateProfile}><Text style={{fontSize: 15, color: colors.white}}>UPDATE</Text></Pressable>
        </View>
        <View style={{width: '100%', marginTop: '20%', paddingHorizontal: '5%', paddingVertical: '2%', backgroundColor: colors.green, borderRadius: 30, alignItems: 'center'}}>
          <Pressable onPress={LogOut}><Text style={{fontSize: 15, color: colors.white}}>LOG OUT</Text></Pressable>
        </View>
      </View>
      <NavBar navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  SectionContainer: {
    width:'100%',
    alignItems: 'center',
    padding: '5%'
  },
  Section: {
    fontSize: 25,
    fontStyle: 'italic',
    color: colors.darkgrey
  },
  infoSection: {
    padding: '5%',
    width: '100%',
    height: '70%'
  },
  longTextInput: {
    width: '100%',
    marginBottom: '7%',
    backgroundColor: colors.lightgrey,
    borderRadius: 20,
    padding: '5%',
    flexDirection: 'row'
  },
  shortTextInput: {
    backgroundColor: colors.lightgrey,
    borderRadius: 20,
    width: '48%',
    paddingVertical: '5%',
    paddingHorizontal: '3%',
    justifyContent: 'flex-start',
    flexDirection: 'row'
  }
});

export default ProfileScreen;
