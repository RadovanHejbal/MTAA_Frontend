import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, TextInput, Image } from 'react-native';
import { useState } from 'react';
import Axios from 'axios';
import colors from '../variables/colors';

const SignUpScreen = ({ navigation }) => {
  const [selectedButton, setSelectedButton] = useState(null);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [weight, setWeight] = useState(null);
  const [height, setHeight] = useState(null);
  const [age, setAge] = useState(null);
  const [gender, setGender] = useState(null);

  function signupHandler() {
    if(firstname.trim() == "" || lastname.trim() == "" || username.trim() == "" || email.trim() == "" || password.trim() == "" || !gender || !height || !weight || !age) {
      console.log("VYPLN VSETKO BRASKO");
      return;
    }
    Axios.post('/users/registration', {
      username,
      password,
      email,
      weight,
      height,
      gender,
      firstname,
      lastname,
      gender,
      age
    }).then(response => {
      console.log("success");
      navigation.navigate("Login");
    }).catch(err => {
      console.log(err);
    })
  }

  return (
    <View style={styles.SignUpContainer}>
      <Text style={styles.Text}>SIGN UP</Text>
      
      <View style={styles.Weight_Height}>
        <TextInput style={[styles.Input, {width: '30%', flex: 1}]} placeholder='First name' onChangeText={(enteredFullname) => {setFirstname(enteredFullname)}}/>
        <TextInput style={[styles.Input, {width: '30%', flex: 1}]} placeholder='Last name' onChangeText={(enteredFullname) => {setLastname(enteredFullname)}}/>
      </View>
      <TextInput style={styles.Input} placeholder='Username' onChangeText={(enteredUsername) => {setUsername(enteredUsername)}}/>
      <TextInput style={styles.Input} placeholder='Email' onChangeText={(enteredEmail) => {setEmail(enteredEmail)}}/>
      <TextInput style={styles.Input} placeholder='Password' onChangeText={(enteredPassword) => {setPassword(enteredPassword)}}/>
      <View style={styles.Weight_Height}>
        <TextInput style={[styles.Input, {width: '30%', flex: 1}]} placeholder='Weight' onChangeText={(enteredWeight) => {setWeight(enteredWeight)}}/>
        <TextInput style={[styles.Input, {width: '30%', flex: 1}]} placeholder='Height' onChangeText={(enteredHeight) => {setHeight(enteredHeight)}}/>
      </View>
      <TextInput style={[styles.Input, {width: '30%', flex: 1}]} placeholder='Age' onChangeText={(enteredHeight) => {setAge(enteredHeight)}}/>

      {/* WEIGHT AND HEIGHT BUTTON */}
      <View style={styles.ButtonContainer}>
        <Pressable
          style={[styles.Button, selectedButton === 1 && styles.SelectedButton]}
          onPress={() => {
            setSelectedButton(1);
            setGender('m');
          }}>
          <Text style={{textAlign: 'center'}}>Male</Text>
        </Pressable>
        <Pressable
          style={[styles.Button, selectedButton === 2 && styles.SelectedButton]}
          onPress={() => { 
            setSelectedButton(2);
            setGender('f');
          }}>
          <Text style={{textAlign: 'center'}}>Female</Text>
        </Pressable>
      </View>

      {/* IMAGE BUTTON */}
      <View style={styles.ImageButtonContainer}>
        <Pressable onPress={signupHandler} imageSource={require('../images/Icon.png')}> 
          <Image style={styles.Image} source={require('../images/Icon.png')}/>
        </Pressable>
      </View>
      <View style={styles.HaveAccount}>
        <Pressable onPress={() => navigation.navigate("Login")}><Text>I already have an account! Log in!</Text></Pressable>
      </View>
      <StatusBar style='auto'/>
    </View>
  );
}

export default SignUpScreen;

const styles = StyleSheet.create({
  SignUpContainer: {
    height: '100%',
    width: '100%',
    padding: '10%',
    marginTop: '10%',
    justifyContent: 'flex-start',
    backgroundColor: colors.lightgrey
  },
  Text: {
    marginBottom: '3%',
    fontSize: 30,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'center',
    color: colors.black
  }, 
  Input: {
    padding: '3%',
    margin: '5%',
    borderBottomWidth: 2,
    borderBottomColor: colors.green
  },
  Weight_Height: {
    flexDirection: "row",
  },
  ButtonContainer: {
    margin: '5%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  Button: {
    padding: '3%',
    width: '30%',
  },
  SelectedButton: {
    borderBottomWidth: 5,
    borderBottomColor: colors.green,
  },
  ImageButtonContainer: {
    flex: 1,
  },
  Image: {
    resizeMode: 'center',
    width: '100%',
    height: '100%',
  },
  HaveAccount: {
    flex: 1,
    alignItems: 'center'
  }
});