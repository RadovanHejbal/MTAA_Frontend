import { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, Pressable, Alert, Linking } from "react-native";
import MapView from 'react-native-maps';
import * as GeoLocation from 'expo-location';
import colors from "../variables/colors";
import { AntDesign } from '@expo/vector-icons'; 

const FitnessCentrumsScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);

  function goHome(){
    navigation.navigate("Home");
  }

  useEffect(() => {
    const getPermissions = async () => {
      var { status } = await GeoLocation.requestForegroundPermissionsAsync();
      if (status !== 'granted'){
        Alert.alert(
          'Permissions to location Required',
          'Please allow access to device location',
          [
            {
              text: 'Cancel',
              onPress: goHome,
              style: 'cancel'
            },
            {
              text: 'OK',
              onPress: () => {
                Linking.openSettings(); // Open device settings
                goHome();
              }
            }
          ],
          { cancelable: false }
        );
        return;
      }

      var hasLocationServicesEnabled = await GeoLocation.hasServicesEnabledAsync();
      if (!hasLocationServicesEnabled){
        Alert.alert(
          'Location Services Required',
          'Please turn on location services to use this feature.',
          [
            {
              text: 'Cancel',
              onPress: goHome,
              style: 'cancel'
            },
            {
              text: 'OK',
              onPress: goHome
            }
          ],
          { cancelable: false }
        );
        return;
      }

      var currenLocation = await GeoLocation.getCurrentPositionAsync({});
      setLocation(currenLocation);
    };
    getPermissions();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {
        location !== null ?
          (<MapView style={styles.mapContainer}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.1,
              longitudeDelta: 0.005
            }}
          />):
            (<MapView style={styles.mapContainer} />)
      }
      <View style={styles.foundContainer}>
        <View style={styles.foundTopSection}>
          <View style={styles.returnButton}>
          <Pressable onPress={() => {navigation.navigate("Home")}}><AntDesign name="leftcircle" size={40} color="black" /></Pressable>
          </View>
          <View style={styles.fitnessCentrumsTextContainer}>
            <Text style={{fontSize: 20, color: colors.green, fontStyle: 'italic', fontWeight: 'bold'}}>FITNESS CENTRUMS</Text>
          </View>
        </View>
        <View style={styles.foundFitnessContainer}>
          <Text>NIECO</Text>
          <Text>NIECO</Text>
          <Text>NIECO</Text>
          <Text>NIECO</Text>
          <Text>NIECO</Text>
          <Text>NIECO</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center'
  },
  mapContainer: {
    width: '100%',
    height: '60%',
  },
  foundContainer: {
    width: '100%',
    height: '50%',
    marginTop: '-10%',
    backgroundColor: colors.darkgrey,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  foundTopSection: {
    marginTop: '2%',
    marginHorizontal: '3%',
    width: '94%',
    height: '20%',
    flexDirection: 'row'
  },
  returnButton: {
    width: '20%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  fitnessCentrumsTextContainer:{
    width: '80%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: '3%'
  },
  foundFitnessContainer: {
    width: '100%',
    height: '78%',
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
});

export default FitnessCentrumsScreen;
