import { View, Text, StyleSheet, SafeAreaView, Pressable } from "react-native";
import TopScreen from "../components/TopScreen";
import NavBar from "../components/NavBar";
import colors from "../variables/colors";

const ProfileScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <TopScreen navigation={navigation}/>
      <View style={styles.SectionContainer}>
        <Text style={styles.Section}>Profile</Text>
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
  }
});

export default ProfileScreen;
