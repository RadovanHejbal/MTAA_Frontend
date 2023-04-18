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
        return image.assets[0]['uri'];
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
            text: 'OK',
            onPress: Linking.openSettings
          }
        ],
        { cancelable: false }
    );
    return null;
}

export default PickFromGalery