import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer, createSwitchNavigator,} from 'react-navigation';
import SignupLoginScreen from './Screens/SignupLoginScreen';
import ExchangeScreen from './Screens/HomeScreen';
import { HomeScreen } from './Screens/HomeScreen';


export default function App() {
  return (
    <SignupLoginScreen/>
    
  );
}


const switchNavigator = createSwitchNavigator({
  SignupLoginScreen:{Screens: SignupLoginScreen},
  BottomTab:{Screens:HomeScreen}
})

const AppContainer =  createAppContainer(switchNavigator);