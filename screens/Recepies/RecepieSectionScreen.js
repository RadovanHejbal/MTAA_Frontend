import { View, Text, StyleSheet, SafeAreaView, Pressable, Image } from "react-native";
import colors from "../../variables/colors";
import { AntDesign } from '@expo/vector-icons'; 
import { useRoute } from "@react-navigation/native";
import { MaterialIcons } from '@expo/vector-icons';


const RecepieSectionScreen = ({ navigation }) => {
  const route = useRoute();

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.topSection}>
          <View style={styles.buttonReturn}>
            <Pressable onPress={() => {navigation.navigate("Recepies")}}><AntDesign name="leftcircle" size={40} color="black" /></Pressable>
          </View>
          <View style={styles.titleSection}>
            <View style={{borderBottomWidth: 2, borderColor: colors.green}}><Text style={{fontSize: 25, fontWeight: 'bold'}}>RECEPIE</Text></View>
          </View>
        </View>
        <View style={styles.midSection}>
          <View style={styles.imageSection}>
            {route.params.image != null? (<Image style={{resizeMode: 'cover', width: '100%', height: '100%', borderRadius: 30}} source={{uri: route.params.image}}></Image>):
            (<View style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightgrey', borderRadius: 25}}><MaterialIcons name="no-photography" size={80} color="black" /></View>)}
          </View>
          <View style={styles.nameSection}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>{route.params.title}</Text>
          </View>
        </View>
        <View style={styles.bottomSection}>
          <View style={{width: '100%', height: '10%', borderBottomWidth: 2, borderColor: colors.green, justifyContent: 'flex-end', alignItems: 'flex-start'}}><Text style={{fontSize: 20, fontStyle: 'italic'}}>Process</Text></View>
          <View style={{width: '100%', height: '85%', marginTop: '5%'}}>
            <Text style={{fontSize: 15, fontStyle: 'italic', flexWrap: 'wrap'}}>{route.params.process}</Text>
          </View>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        padding: '5%',
    },
    topSection: {
      width: '100%',
      height: '15%',
      flexDirection: 'row'
    },
    buttonReturn: {
      width: '30%',
      height: '100%',
      justifyContent: 'center',
    },
    titleSection: {
      width: '70%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'flex-start',
      paddingLeft: '5%'
    },

    midSection: {
      width: '100%',
      height: '20%',
      flexDirection: 'row'
    },
    imageSection: {
      width: '40%',
      height: '100%',
    },
    nameSection:{
      width: '55%',
      height: '100%',
      marginLeft: '5%',
      justifyContent: 'flex-end',
      alignItems: 'flex-start',
      borderBottomWidth: 2,
      borderColor: colors.green
    },

    bottomSection: {
      width: '100%',
      height: '65%',
      paddingTop: '5%',
    },
});

export default RecepieSectionScreen;
