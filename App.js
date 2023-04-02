
import { StyleSheet, Text, View } from 'react-native';
import Navigation from "./Routes/Navigation";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Login from "./Screens/Login";
import Tabs from "./Routes/Navigation";
import Register from "./Screens/Register";
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen options={{headerShown:false}} name="Login" component={Login} />
      <Stack.Screen options={{headerTitleStyle:{left:'100%'}}} name="Register" component={Register} />
      <Stack.Screen options={{headerShown:false}} name="Tabs" component={Tabs}/>
    </Stack.Navigator>
    </NavigationContainer>
  );
}
