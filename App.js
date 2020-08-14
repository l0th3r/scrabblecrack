// import 'react-native-gesture-handler';
import * as React from 'react';

//navigator
import {createAppContainer } from 'react-navigation';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Screens
import HomeScreen from './screens/Home';
import AppStack from './AppNav';
import DefModal from './screens/DefModal';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Home" component={HomeScreen}
          options={{
            headerShown: false,
          }} />
        <Stack.Screen name="AppStack" component={AppStack}
          options={{
            headerShown: false,
          }} />
        <Stack.Screen name="DefModal" component={DefModal}
          options={({ route }) => ({ title: route.params.name })} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;


// var PageStack = createStackNavigator({
//   Home: {
//     screen: HomeScreen,
//     navigationOptions: () => ({
//       headerShown: false
//     })
//   },
//   AppStack: {
//     screen: AppNav,
//     navigationOptions: () => ({
//       headerShown: false
//     })
//   },
//   DefModal: {
//     screen: DefModal,
//     navigationOptions: () => ({
//       headerShown: false
//     })
//   },
// });