import { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, Pressable, Alert, Linking, FlatList } from "react-native";
import MapView from 'react-native-maps';
import * as GeoLocation from 'expo-location';
import colors from "../variables/colors";
import { AntDesign } from '@expo/vector-icons'; 
import cheerio from 'cheerio';
import FitnessCentrumItem from "../components/fitnessCentrums/FitnessCentrumItem";

const FitnessCentrumsScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [gyms, setGyms] = useState([]);

  function goHome(){
    navigation.navigate("Home");
  }

  const SearchNearbyFitnessCenters = async (latitude, longitude, radius) => {
    const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=gym`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      const gymsFromMap = data.map(item => ({
        name: item.display_name,
        lat: item.lat,
        lon: item.lon
      }));
      setGyms(gymsFromMap);
    } catch (error) {
      console.error(error);
    }
  };

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
              text: 'Allow',
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
      SearchNearbyFitnessCenters(currenLocation.coords.latitude, currenLocation.coords.longitude, 10);
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
            }}/>
          ):
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
        <FlatList
            data={gyms}
            style={{marginBottom: '5%', paddingHorizontal: '5%'}}
            renderItem={({item}) => {
              if(item != null) return <FitnessCentrumItem name={item.name} gymLat={item.lat} gymLon={item.lon} lat={location.coords.latitude} lon={location.coords.longitude}/>;
            }}
          />
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
    alignItems: 'flex-end',
  }
});

export default FitnessCentrumsScreen;
