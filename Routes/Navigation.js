import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from "../Screens/Home";
import Search from "../Screens/Search";
import Messages from "../Screens/Messages";
import Profile from "../Screens/Profile";

const Tab = createBottomTabNavigator();

const Navigation = () => {
  return (
      <Tab.Navigator>

        <Tab.Screen options={{
          headerShown:false,
          tabBarIcon: ({focused, size}) => (
       <Ionicons
          name="md-home"
          size={size}
          color={focused ? 'black' : '#ccc'}
       />
    )}} name="Home" component={Home} />


        <Tab.Screen options={{headerShown:false,
         tabBarIcon: ({focused, size}) => (
       <Ionicons
          name="search"
          size={size}
          color={focused ? 'black' : '#ccc'}
       />
    )}} name="Search" component={Search} />

<Tab.Screen options={{tabBarIcon: ({focused, size}) => (
       <Ionicons
          name="paper-plane"
          size={size}
          color={focused ? 'black' : '#ccc'}
       />
    )}} name="Messages" component={Messages} />

<Tab.Screen options={{tabBarIcon: ({focused, size}) => (
       <Ionicons
          name="person"
          size={size}
          color={focused ? 'black' : '#ccc'}
       />
    )}} name="Profile" component={Profile} />


      </Tab.Navigator>
  )
}

export default Navigation

const styles = StyleSheet.create({})