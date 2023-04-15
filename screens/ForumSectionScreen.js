import React, {useState} from "react";
import { useRoute } from "@react-navigation/native";
import { View, Text, StyleSheet, SafeAreaView, Pressable, TextInput } from "react-native";
import TopScreen from "../components/TopScreen";
import NavBar from "../components/NavBar";

const ForumSectionScreen = ({ navigation }) => {
    const route = useRoute();
  return (
   <View style={styles.container}>
    <Text>{route.params.title}</Text>
   </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: '5%'
  },
});

export default ForumSectionScreen;
