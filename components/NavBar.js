import { Pressable, View, Text, StyleSheet } from "react-native";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { AuthContext } from "../contextapi/AuthContext";
import { useContext } from "react";

const NavBar = ({ navigation, current }) => {
  const auth = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Pressable
          onPress={() => {
            current != "Home" && navigation.replace("Home");
          }}
        >
          <View style={styles.icon}>
            <Ionicons name="ios-home-sharp" size={24} color="white" />
          </View>
          <Text style={styles.text}>Home</Text>
        </Pressable>
      </View>
      {auth.isCoach ? (
        <View style={styles.item}>
          <Pressable
            onPress={() => {
              current != "Clients" && navigation.replace("Clients");
            }}
          >
            <View style={styles.icon}>
              <FontAwesome5
                style={styles.icon}
                name="chalkboard-teacher"
                size={24}
                color="white"
              />
            </View>
            <Text style={styles.text}>Clients</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.item}>
          <Pressable
            onPress={() => {
              current != "Coaches" && navigation.replace("MyCoaches");
            }}
          >
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
      )}
      <View style={styles.item}>
        <Pressable
          onPress={() => {
            current != "Recepies" && navigation.replace("Recepies");
          }}
        >
          <View style={styles.icon}>
            <Ionicons name="fast-food" size={24} color="white" />
          </View>
          <Text style={styles.text}>Recepies</Text>
        </Pressable>
      </View>
      <View style={styles.item}>
        <Pressable
          onPress={() => {
            current != "Forums" && navigation.replace("Forums");
          }}
        >
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
