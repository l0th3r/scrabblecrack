import React from 'react';

//navigator
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View } from 'react-native';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

//Screens
import SearchScreen from "./screens/Search";
import AdvancedScreen from './screens/Advanced';

const Tab = createBottomTabNavigator();

function AppStack() {
  return(
    <Tab.Navigator
      initialRouteName="Main"
      backBehavior="order"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => {
          let iconName;
          if (route.name === 'Search') {
            iconName = focused ?
            <MaterialCommunityIcons name="format-letter-matches" size={30} color="white" /> :
            <MaterialIcons name="text-format" size={33} color="#d69da3" /> ;
          } if (route.name === 'Advanced') {
            iconName = focused ?
            <MaterialCommunityIcons name="filter" size={30} color="white" /> :
            <MaterialCommunityIcons name="filter-outline" size={30} color="#d69da3" /> ;
          }
          return <View style={style.logoContainer}>{iconName}</View>;
        },
      })}
      
      tabBarOptions={{
        style: { borderTopWidth: 0 },
        activeTintColor: '#fff',
        inactiveTintColor: '#d69da3',
        labelStyle: { paddingLeft: 6 },
        labelPosition: "beside-icon",
        keyboardHidesTabBar: true,
        tabStyle: {
          backgroundColor: '#c62334',
          borderTopWidth: 0,
          borderTopColor: "#c62334",
        }
      }}
    >
      <Tab.Screen
        name="Search"
        component={SearchScreen}
      />
      <Tab.Screen
        name="Advanced"
        component={AdvancedScreen}
      />
    </Tab.Navigator>
  );
}

const style =  StyleSheet.create({
  logoContainer: {
    marginRight: -5,
  }
});

export default AppStack;