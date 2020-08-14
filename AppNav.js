import React from 'react';

//navigator
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

//Screens
import SearchScreen from "./screens/Search";
import AdvancedScreen from './screens/Advanced';

const Tab = createBottomTabNavigator();

function AppStack() {
  return(
    <Tab.Navigator
      initialRouteName="Main"
      backBehavior="order"
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
        tabBarIcon={<Ionicons name="md-search" size={30} color='#fff' />}
      />
      <Tab.Screen
        name="Advanced"
        component={AdvancedScreen}
      />
    </Tab.Navigator>
  );
}

export default AppStack;


// var BottomNavigator = createBottomTabNavigator(
//   {
//     "Recherche": SearchScreen,
//     "Recherche Avancée": AdvancedScreen,
//   },
//   {
//     defaultNavigationOptions: ({ navigation }) => ({
//       tabBarIcon: ({ tintColor }) => {
//         var iconName;
//         if (navigation.state.routeName == "Recherche Avancée") {
//           iconName = 'md-git-branch';
//         } else if (navigation.state.routeName == "Recherche") {
//           iconName = 'md-search';
//         }
//         return <Ionicons name={iconName} size={30} color={tintColor} />;
//       },
//     }),
//     tabBarOptions: {
//       activeTintColor: '#fff',
//       inactiveTintColor: '#d69da3',
//       tabStyle: {
//         backgroundColor: '#c62334'
//       }
//     },
//   }
// );

// export default createAppContainer(BottomNavigator)