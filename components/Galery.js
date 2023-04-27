import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

const PickFromGalery = async () =>{
    const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if(status == 'granted'){
        const image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing:true,
            aspect:[1,1],
            quality: 0.5
        })
        if(image.assets[0]['height'] > 3500) return "ERROR";
        else return image.assets[0]['uri'];
    }
    Alert.alert(
        'Permissions to galery Required',
        "Please allow access to your galery",
        [
          {
            text: 'Cancel',
            style: 'cancel'
          },
          {
            text: 'Allow',
            onPress: Linking.openSettings
          }
        ],
        { cancelable: false }
    );
    return null;
}

export default PickFromGalery