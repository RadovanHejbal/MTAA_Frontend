import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, TextInput, Image } from 'react-native';
import { useState } from 'react';

export default function LoginScreen({ navigation }) {
  const [getEnteredUsername, setEnteredUsername] = useState('');
  const [getEnteredPassword, setEnteredPassword] = useState('');

  return (
    <View style={styles.LoginContainer}>
      <Image style={styles.Logo} source={require('../images/Logo.png')}/>
      <View style={styles.InputContainer}>
        <Text style={styles.Text}>FitMe</Text>
        <TextInput style={styles.Input} placeholder='Username' onChangeText={(enteredUsername) => {setEnteredUsername(enteredUsername)}}/>
        <TextInput style={styles.Input} placeholder='Password' onChangeText={(enteredPassword) => {setEnteredPassword(enteredPassword)}}/>
        
        {/* Buttons */}
        {/* Login */}
        <Pressable style={({pressed}) => [
        {
          backgroundColor: pressed ? 'black' : '#70B46C',
        }, styles.Button]}  
        onPress={() => {
          console.log("Username: " + getEnteredUsername);
          console.log("Password: " + getEnteredPassword);
        }}>
          <Text style={{color: '#E4E4E4'}}>Login</Text>
        </Pressable>

        {/* Signup */}
        <Pressable style={({pressed}) => [
          {
            backgroundColor: pressed ? 'black' : 'transparent',
          }, styles.Button]}
          onPress={() => navigation.navigate("SignUp")}>
          <Text style={{color: '#E4E4E4'}}>Sign up</Text>
        </Pressable>
      </View>

      <StatusBar style="auto"/>
    </View>
  );
}

const styles = StyleSheet.create({
  LoginContainer: {
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    backgroundColor: '#70B46C'
  },
  Logo: {
    resizeMode: 'contain',
    flex: 1,
    width: '75%',
    height: '75%',
    alignSelf: 'center'
  },
  InputContainer: {
    padding: '5%',
    width: '100%',
    height: '50%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: 'flex-start',
    backgroundColor: '#4B4843'
  },
  Input: {
    margin: '3%',
    padding: '3%',
    borderRadius: 15,
    color: 'black',
    backgroundColor: '#E4E4E4'
  },
  Text:{
    marginBottom: '3%',
    fontSize: 30,
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#70B46C'
  },
  Button: {
    margin: '3%',
    padding: '1.5%',
    width: '35%',
    borderRadius: 30,
    alignItems: 'center',
    alignSelf: 'center'
  }
});