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
            <MaterialIcons name="text-format" size={31} color="#d69da3" /> ;
          } if (route.name === 'Advanced') {
            iconName = focused ?
            <Ionicons name={iconName} size={size} color={"#fff"}/> :
            <Ionicons name={iconName} size={size} color={"#fff"}/> ;
          }
          return <View style={style.logoContainer}>{iconName}</View>;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#fff',
        inactiveTintColor: '#d69da3',
        tabStyle: {
          backgroundColor: '#c62334'
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

  }
});

export default AppStack;