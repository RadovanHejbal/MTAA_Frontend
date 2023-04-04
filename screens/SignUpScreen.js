import { setStatusBarBackgroundColor, StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, TextInput, Image } from 'react-native';
import { useState } from 'react';

export default function SignUpScreen({ navigation }) {
  const [selectedButton, setSelectedButton] = useState(null);
  const [getEnteredFullname, setEnteredFullname] = useState('');
  const [getEnteredUsername, setEnteredUsername] = useState('');
  const [getEnteredEmail, setEnteredEmail] = useState('');
  const [getEnteredPassword, setEnteredPassword] = useState('');
  const [getEnteredWeight, setEnteredWeight] = useState(null);
  const [getEnteredHeight, setEnteredHeight] = useState(null);
  const [getEnteredGender, setEnteredGender] = useState(null);

  return (
    <View style={styles.SignUpContainer}>
      <Text style={styles.Text}>SIGN UP</Text>
      
      <TextInput style={styles.Input} placeholder='Full name' onChangeText={(enteredFullname) => {setEnteredFullname(enteredFullname)}}/>
      <TextInput style={styles.Input} placeholder='Username' onChangeText={(enteredUsername) => {setEnteredUsername(enteredUsername)}}/>
      <TextInput style={styles.Input} placeholder='Email' onChangeText={(enteredEmail) => {setEnteredEmail(enteredEmail)}}/>
      <TextInput style={styles.Input} placeholder='Password' onChangeText={(enteredPassword) => {setEnteredPassword(enteredPassword)}}/>
      <View style={styles.Weight_Height}>
        <TextInput style={[styles.Input, {width: '30%', flex: 1}]} placeholder='Weight' onChangeText={(enteredWeight) => {setEnteredWeight(enteredWeight)}}/>
        <TextInput style={[styles.Input, {width: '30%', flex: 1}]} placeholder='Height' onChangeText={(enteredHeight) => {setEnteredHeight(enteredHeight)}}/>
      </View>

      {/* WEIGHT AND HEIGHT BUTTON */}
      <View style={styles.ButtonContainer}>
        <Pressable
          style={[styles.Button, selectedButton === 1 && styles.SelectedButton]}
          onPress={() => {
            setSelectedButton(1);
            setEnteredGender('M');
          }}>
          <Text style={{textAlign: 'center'}}>Male</Text>
        </Pressable>
        <Pressable
          style={[styles.Button, selectedButton === 2 && styles.SelectedButton]}
          onPress={() => { 
            setSelectedButton(2);
            setEnteredGender('F');
          }}>
          <Text style={{textAlign: 'center'}}>Female</Text>
        </Pressable>
      </View>

      {/* IMAGE BUTTON */}
      <View style={styles.ImageButtonContainer}>
        <Pressable onPress={() => console.log(getEnteredFullname + "\n" + getEnteredUsername + "\n" + getEnteredEmail + "\n" + getEnteredPassword + "\n" + getEnteredWeight + "\n" + getEnteredHeight + "\n" + getEnteredGender)} imageSource={require('../images/Icon.png')}> 
          <Image style={styles.Image} source={require('../images/Icon.png')}/>
        </Pressable>
      </View>
      <StatusBar style='auto'/>
    </View>
  );
}

const styles = StyleSheet.create({
  SignUpContainer: {
    height: '100%',
    width: '100%',
    padding: '10%',
    marginTop: '10%',
    justifyContent: 'flex-start',
    backgroundColor: '#E4E4E4'
  },
  Text: {
    marginBottom: '3%',
    fontSize: 30,
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'center',
    color: 'black'
  }, 
  Input: {
    padding: '3%',
    margin: '5%',
    borderBottomWidth: 2,
    borderBottomColor: '#70B46C'
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
    borderBottomColor: '#70B46C',
  },
  ImageButtonContainer: {
    justifyContent: 'flex-start',
    flex: 1,
  },
  Image: {
    resizeMode: 'center',
    width: '100%',
    height: '100%',
  }
});