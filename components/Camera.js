import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

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
    else{
        Alert.alert("Need permission to camera for use it!");
        return null;
    }
}

export default PickFromCamera