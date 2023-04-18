import * as ImagePicker from 'expo-image-picker';
import { Alert, Linking } from 'react-native';

const PickFromCamera = async () =>{
    const {status} = await ImagePicker.requestCameraPermissionsAsync();
    if(status == 'granted'){
        console.log("camera");
        const image = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing:true,
            aspect:[1,1],
            quality: 0.5
        })
        return image.assets[0]['uri'];
    }
    Alert.alert(
        'Permissions to camera Required',
        "Please allow access to device camera",
        [
          {
            text: 'Cancel',
            style: 'cancel'
          },
          {
            text: 'OK',
            onPress: Linking.openSettings
          }
        ],
        { cancelable: false }
    );
    return null;
}

export default PickFromCamera