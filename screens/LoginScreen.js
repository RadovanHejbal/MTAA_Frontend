import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  Image,
  Alert,
} from "react-native";
import { useState, useContext, useEffect } from "react";
import colors from "../variables/colors";
import url from "../variables/url";
import Axios from "axios";
import { AuthContext } from "../contextapi/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [wrongInput, setWrongInput] = useState(false);
  const [loading, setLoading] = useState(true);
  const auth = useContext(AuthContext);

  async function isToken() {
    const token = await AsyncStorage.getItem("token");
    
    if (token) {
      try {
        const response = await Axios.get(`${url}/users/token/${token}`);
        console.log(response.data.user_id + " userId");
        return response.data.user_id;
      } catch (err) {
        console.log(err);
        return null;
      }
    } else {
      return null;
    }
  }

  function createToken(userId) {
    Axios.post(`${url}/users/token/create`, {
      id: userId,
      date: new Date(),
    })
      .then((response) => {
        AsyncStorage.setItem("token", response.data.id.toString());
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    async function initializing() {
      const userId = await isToken();

      if (!userId) {
        setLoading(false);
        return;
      }
      try {
        const response = await Axios.get(`${url}/users/get/${userId}`);
        if (response.data.role == "coach") {
          const coachId = await Axios.get(
            `${url}/coaches/is-coach/${response.data.id}`
          );
          auth.login({
            ...response.data,
            coachId: coachId.data.id,
            specialization: coachId.data.specializaion,
            description: coachId.data.description,
          });
        } else {
          auth.login(response.data);
        }
        setLoading(false);
        navigation.navigate("Loading");
      } catch (err) {
        setWrongInput(true);
      }
    }
    initializing();
  }, []);

  async function loginHandler() {
    if (enteredUsername.trim() == "" || enteredPassword.trim() == "") {
      setWrongInput(true);
      return;
    }
    try {
      const response = await Axios.post(`${url}/users/login`, {
        username: enteredUsername,
        password: enteredPassword,
      });
      if (response.data.role == "coach") {
        const coachId = await Axios.get(
          `${url}/coaches/is-coach/${response.data.id}`
        );
        auth.login({
          ...response.data,
          coachId: coachId.data.id,
          specialization: coachId.data.specializaion,
          description: coachId.data.description,
        });
      } else {
        auth.login(response.data);
      }
      createToken(response.data.id);
      navigation.navigate("Loading");
    } catch (err) {
      setWrongInput(true);
    }
  }

  if (loading) {
    return (
      <View
        style={{
          backgroundColor: colors.green,
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <Text style={{ color: colors.white }}>Loading Fitme</Text>
      </View>
    );
  }

  return (
    <View style={styles.LoginContainer}>
      <Image style={styles.Logo} source={require("../images/Logo.png")} />
      <View style={styles.InputContainer}>
        <Text style={styles.Text}>FitMe</Text>
        <TextInput
          value={enteredUsername}
          style={[styles.Input, wrongInput && styles.wrongInput]}
          placeholder="Username"
          onChangeText={(enteredUsername) => {
            if (wrongInput) setWrongInput(false);
            setEnteredUsername(enteredUsername);
          }}
        />
        <TextInput
          value={enteredPassword}
          autoCorrect={false}
          secureTextEntry
          style={[styles.Input, wrongInput && styles.wrongInput]}
          placeholder="Password"
          onChangeText={(enteredPassword) => {
            if (wrongInput) setWrongInput(false);
            setEnteredPassword(enteredPassword);
          }}
        />

        {/* Buttons */}
        {/* Login */}
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "black" : colors.green,
            },
            styles.Button,
          ]}
          onPress={loginHandler}
        >
          <Text style={{ color: colors.lightgrey }}>Login</Text>
        </Pressable>

        {/* Signup */}
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "black" : "transparent",
            },
            styles.Button,
          ]}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text style={{ color: colors.lightgrey }}>Sign up</Text>
        </Pressable>
      </View>

      <StatusBar style="auto" />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  LoginContainer: {
    height: "100%",
    width: "100%",
    justifyContent: "flex-end",
    backgroundColor: colors.green,
  },
  Logo: {
    resizeMode: "contain",
    flex: 1,
    width: "75%",
    height: "75%",
    alignSelf: "center",
  },
  InputContainer: {
    padding: "5%",
    width: "100%",
    height: "50%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: "flex-start",
    backgroundColor: colors.darkgrey,
  },
  Input: {
    margin: "3%",
    padding: "3%",
    borderRadius: 15,
    color: colors.black,
    backgroundColor: colors.lightgrey,
  },
  Text: {
    marginBottom: "3%",
    fontSize: 30,
    fontWeight: "bold",
    fontStyle: "italic",
    textAlign: "center",
    color: colors.green,
  },
  Button: {
    margin: "3%",
    padding: "1.5%",
    width: "35%",
    borderRadius: 30,
    alignItems: "center",
    alignSelf: "center",
  },
  wrongInput: {
    borderWidth: 1,
    borderColor: "red",
  },
});
