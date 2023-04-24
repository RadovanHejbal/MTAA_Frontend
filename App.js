import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthContextProvider from "./contextapi/AuthContext";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import HomeScreen from './screens/Home/HomeScreen';
import LoadingScreen from "./screens/LoadingScreen";
import SearchMeal from "./screens/Home/SearchMeal";
import MealDetails from "./screens/Home/MealDetails";
import RecepiesScreen from "./screens/Recepies/RecepiesScreen";
import ForumsScreen from "./screens/Forums/ForumsScreen";
import MyCoachesScreen from "./screens/Coaches/MyCoachesScreen";
import CoachesScreen from "./screens/Coaches/CoachesScreen";
import ProfileScreen from "./screens/ProfileScreen"
import FitnessCentrumsScreen from "./screens/FitnessCentrumsScreen";
import ForumSectionScreen from "./screens/Forums/ForumSectionScreen";
import RecepieAddScreen from "./screens/Recepies/RecepieAddScreen";
import RecepieSectionScreen from "./screens/Recepies/RecepieSectionScreen";
import CoachProfile from "./screens/Coaches/CoachProfile";
import CoachChat from "./screens/Coaches/CoachChat";
import SearchActivity from "./screens/Home/SearchActivity";
import ActivityDetails from "./screens/Home/ActivityDetails";

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
          <Stack.Screen name="SearchActivity" component={SearchActivity} />
          <Stack.Screen name="ActivityDetails" component={ActivityDetails} />
          <Stack.Screen name="Recepies" component={RecepiesScreen} />
          <Stack.Screen name="RecepieSection" component={RecepieSectionScreen} />
          <Stack.Screen name="AddRecepie" component={RecepieAddScreen} />
          <Stack.Screen name="Forums" component={ForumsScreen} />
          <Stack.Screen name="ForumSection" component={ForumSectionScreen} />
          <Stack.Screen name="MyCoaches" component={MyCoachesScreen} />
          <Stack.Screen name="CoachChat" component={CoachChat} />
          <Stack.Screen name="Coaches" component={CoachesScreen} /> 
          <Stack.Screen name="CoachProfile" component={CoachProfile} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Fitness" component={FitnessCentrumsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContextProvider>
  );
}
