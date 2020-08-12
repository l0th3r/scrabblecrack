import React from 'react';

//navigator
import {createAppContainer } from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';

//Screens
import SearchScreen from "./screens/Search";
import AdvancedScreen from './screens/Advanced';


var BottomNavigator = createBottomTabNavigator(
  {
    "Recherche": AdvancedScreen,
    "Recherche Avancée": SearchScreen,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        var iconName;
        if (navigation.state.routeName == "Recherche Avancée") {
          iconName = 'md-git-branch';
        } else if (navigation.state.routeName == "Recherche") {
          iconName = 'md-search';
        }
        return <Ionicons name={iconName} size={30} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#0984e3',
      inactiveTintColor: '#dfe6e9',
    },
  }
);

export default createAppContainer(BottomNavigator)