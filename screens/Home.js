import React, {useEffect, useState} from 'react';
import { Image, View, Button, StyleSheet, Text } from 'react-native';
import wordsData from '../assets/liste_francais';

export default function Home({navigation}) {

  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState(<View></View>);

  useEffect(() => {
    //to load before AppStack
    setIsLoading(false);
  }, []);
  
  useEffect(() => {
    if(isLoading) {
      setContent(<Text style={{color: 'white'}}>Loading...</Text>);
    } else {
      setContent(
      <Button
        title="Commencer"
        color='#c62334'
        onPress={() => navigation.navigate('AppStack')}
      />);
    }
  }, [isLoading]);

  // STRAIGHT ACCESS TO APP STACK (dev purpuse only !)
  // navigation.navigate('AppStack');
  // STRAIGHT ACCESS TO APP STACK

  
  return (
    <View style={style.container}>
      <View style={style.logoContainer}>
        <Image style={style.logo} source={require('../assets/Scrabble-logo.png')} />
      </View>
      {content}
    </View>
  );
}

const style =  StyleSheet.create({
  
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#246659'
  },

  logo: {
    width: '100%',
    height: '100%',
  },

  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    height: '20%',
    marginBottom: 50,
  }


});