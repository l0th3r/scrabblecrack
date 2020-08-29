import React, {useEffect, useState} from 'react';
import { Image, View, Button, StyleSheet, Text, ActivityIndicator } from 'react-native';

export default function Home({navigation}) {

  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState(<ActivityIndicator size="large" color="#c62334" />);

  const testDB = async() => {
    var rawResponse = await fetch(`https://scrabblecrackback.herokuapp.com?key=963Z852z741`);
    var res = await rawResponse.json();
    console.log(res);
  }


  useEffect(() => {
    setIsLoading(true);
    testDB();
    setIsLoading(false);
  }, []);
  
  useEffect(() => {
    if(isLoading) {
      setContent(<ActivityIndicator size="large" color="#c62334" />);
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