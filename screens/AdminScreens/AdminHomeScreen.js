import { View, StyleSheet, SafeAreaView, FlatList, Text, Pressable, useColorScheme } from "react-native";
import colors from "../../variables/colors";
import { useContext } from "react";
import { AuthContext } from "../../contextapi/AuthContext";

const AdminHomeScreen = ({ navigation }) => {
  const auth = useContext(AuthContext)

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.optionsContainer}>
        <View style={{width: '100%', alignItems: 'center', marginBottom: '20%'}}><Text style={{fontSize: 30, fontWeight: 'bold', color: colors.green}}>ADMIN</Text></View>
        <Pressable onPress={() => navigation.navigate("Recepies")} style={styles.optionSection}><Text style={{fontSize: 30, fontWeight: 'bold', color: colors.white}}>RECEPIES</Text></Pressable>
        <Pressable onPress={() => navigation.navigate("AdminCoaches")} style={styles.optionSection}><Text style={{fontSize: 30, fontWeight: 'bold', color: colors.white}}>ADD COACHE</Text></Pressable>
        <Pressable 
          onPress={() => {
            auth.logout();
            navigation.navigate("Login");
          }}
          style={{marginTop: '20%', paddingVertical: '2%', backgroundColor: colors.green, borderRadius: 30, alignItems: 'center'}}>
            <Text style={{fontSize: 15, fontWeight: 'bold', color: colors.white}}>LOG OUT</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingVertical: '20%',
    paddingHorizontal: '15%'
  },
  optionsContainer: {
    borderRadius: 30,
    height: '80%',
    justifyContent: 'center',
    alignContent: 'center'
  },
  optionSection: {
    width: '100%',
    height: '20%',
    marginBottom: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: colors.darkgrey
  }
});

export default AdminHomeScreen;
