import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, TextInput, Image } from 'react-native';
import { useState, useContext } from 'react';
import colors from '../variables/colors';
import url from '../variables/url';
import Axios from 'axios';
import { AuthContext } from '../contextapi/AuthContext';

const LoginScreen = ({ navigation }) => {
  const [enteredUsername, setEnteredUsername] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const auth = useContext(AuthContext);

  async function loginHandler() {
    Axios.post(`${url}/users/login`, {
      username: enteredUsername,
      password: enteredPassword
    })
    .then(response => {
      auth.login(response.data);
      navigation.navigate("Home");
    })
    .catch(error => {
      console.log(error);
    });
  }

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
          backgroundColor: pressed ? 'black' : colors.green,
        }, styles.Button]}  
        onPress={loginHandler}>
          <Text style={{color: colors.lightgrey}}>Login</Text>
        </Pressable>

        {/* Signup */}
        <Pressable style={({pressed}) => [
          {
            backgroundColor: pressed ? 'black' : 'transparent',
          }, styles.Button]}
          onPress={() => navigation.navigate("SignUp")}>
          <Text style={{color: colors.lightgrey}}>Sign up</Text>
        </Pressable>
      </View>

      <StatusBar style="auto"/>
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  LoginContainer: {
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    backgroundColor: colors.green
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
    backgroundColor: colors.darkgrey
  },
  Input: {
    margin: '3%',
    padding: '3%',
    borderRadius: 15,
    color: colors.black,
    backgroundColor: colors.lightgrey
  },
  Text:{
    marginBottom: '3%',
    fontSize: 30,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'center',
    color: colors.green
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