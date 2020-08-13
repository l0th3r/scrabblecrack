import React, {useEffect, useState} from 'react';
import { Image, View, Button, StyleSheet, Text } from 'react-native';

export default function Home({navigation}){

  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState(<View></View>);

  useEffect(() => {

    setIsLoading(false);
  }, []);
  
  useEffect(() => {
    if(isLoading) {
      setContent(<Text>LOADING</Text>);
    } else {
      setContent(
      <Button
        title="Commencer"
        color='#246659'
        onPress={() => navigation.navigate('AppStack')}
      />);
    }
  }, [isLoading]);
  
  // useEffect(() => {
  //   return () => { console.log("App is destroyed")} ;
  // }, []);

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
    backgroundColor:'#c62334'
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