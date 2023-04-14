import { useEffect, useState } from "react";
import { SafeAreaView, TextInput, FlatList } from "react-native";
import axios from "axios";
import Item from "../components/search/Item";

const SearchMeal = ({navigation}) => {
    const [meals, setMeals] = useState([]);
    const [filteredMeals, setFilteredMeals] = useState(meals);

    useEffect(() => {
        axios.get('/meals').then(response => {
            setMeals(response.data);
        }).catch(err => {
            // handle error
        })
    })

    function searchMeal(text) {
        setFilteredMeals(meals.filter(item => item.title.includes(text)));
    }

    function goToDetails(mealId) {
        navigation.navigate("MealDetails", {id: mealId});
    }

    return <SafeAreaView>
        <TextInput placeholder="search" onChangeText={(text) => searchMeal.bind(text)} />
        <FlatList data={filteredMeals} renderItem={({item}) => {
            <Item title={item.title} details={goToDetails} />
        }} />
    </SafeAreaView>
}

export default SearchMeal;