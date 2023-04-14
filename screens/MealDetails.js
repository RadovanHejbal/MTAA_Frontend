import { useEffect, useState } from "react";
import { SafeAreaView, Text } from "react-native";
import axios from "axios";

const MealDetails = (props) => {
    const [details, setDetails] = useState(null);

    useEffect(() => {
        axios.get(`meals/details/${props.id}`).then(response => {
            setDetails(response.data);
        }).catch(err => {
            // handle error
        })
    })

    return <SafeAreaView>
        <Text>{details.title}</Text>
        <Text>{details.kcal}</Text>
    </SafeAreaView>
}

export default MealDetails;