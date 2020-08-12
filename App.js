import React from 'react';
import { StyleSheet, View } from 'react-native';

//navigator
import {createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

//Screens
import HomeScreen from './screens/Home';
import AppNav from './AppNav';

var PageStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: () => ({
      headerShown: false
    })
  },
  AppStack: {
    screen: AppNav,
    navigationOptions: () => ({
      headerShown: false
    })
  }
}
);

export default createAppContainer(PageStack)