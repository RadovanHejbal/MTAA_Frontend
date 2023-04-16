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
    else{
        Alert.alert("Need permission to galery for use it!");
        return null;
    }
}

export default PickFromGalery