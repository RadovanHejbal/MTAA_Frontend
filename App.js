import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthContextProvider from "./contextapi/AuthContext";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import HomeScreen from './screens/HomeScreen';
import LoadingScreen from "./screens/LoadingScreen";
import SearchMeal from "./screens/SearchMeal";
import MealDetails from "./screens/MealDetails";
import RecepiesScreen from "./screens/RecepiesScreen";
import ForumsScreen from "./screens/ForumsScreen";
import CoachesScreen from "./screens/CoachesScreen";
import ProfileScreen from "./screens/ProfileScreen"
import FitnessCentrumsScreen from "./screens/FitnessCentrumsScreen";
import ForumSectionScreen from "./screens/ForumSectionScreen";
import RecepieAddScreen from "./screens/RecepieAddScreen";
import RecepieSectionScreen from "./screens/RecepieSectionScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthContextProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={LoginScreen}/>
          <Stack.Screen name="SignUp" component={SignUpScreen}/>
          <Stack.Screen name="Loading" component={LoadingScreen}/>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="SearchMeal" component={SearchMeal} />
          <Stack.Screen name="MealDetails" component={MealDetails} />
          <Stack.Screen name="Recepies" component={RecepiesScreen} />
          <Stack.Screen name="RecepieSection" component={RecepieSectionScreen} />
          <Stack.Screen name="AddRecepie" component={RecepieAddScreen} />
          <Stack.Screen name="Forums" component={ForumsScreen} />
          <Stack.Screen name="ForumSection" component={ForumSectionScreen} />
          <Stack.Screen name="Coaches" component={CoachesScreen} /> 
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Fitness" component={FitnessCentrumsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContextProvider>
  );
}
