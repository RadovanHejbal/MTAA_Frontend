import { Pressable, View, Text, StyleSheet } from "react-native";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

const NavBar = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Pressable onPress={() => navigation.navigate("Home")}>
          <View style={styles.icon}>
            <Ionicons name="ios-home-sharp" size={24} color="white" />
          </View>
          <Text style={styles.text}>Home</Text>
        </Pressable>
      </View>
      <View style={styles.item}>
        <Pressable onPress={() => navigation.navigate("Coaches")}>
          <View style={styles.icon}>
            <FontAwesome5
              style={styles.icon}
              name="chalkboard-teacher"
              size={24}
              color="white"
            />
          </View>
          <Text style={styles.text}>Coaches</Text>
        </Pressable>
      </View>
      <View style={styles.item}>
        <Pressable onPress={() => navigation.navigate("Recepies")}>
          <View style={styles.icon}>
            <Ionicons name="fast-food" size={24} color="white" />
          </View>
          <Text style={styles.text}>Recepies</Text>
        </Pressable>
      </View>
      <View style={styles.item}>
        <Pressable onPress={() => navigation.navigate("Forum")}>
          <View style={styles.icon}>
            <MaterialIcons name="forum" size={24} color="white" />
          </View>
          <Text style={styles.text}>Forum</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    padding: 0,
    gap: 4,
    height: "7%",
    width: "100%",
  },
  item: {
    flex: 1,
    backgroundColor: "black",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
  },
  icon: {
    alignItems: "center",
  },
});

export default NavBar;
