import React, {useEffect, useState} from 'react';
import { Image, View, Button, StyleSheet, Text, ActivityIndicator, Alert } from 'react-native';

export default function Home({navigation}) {

  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState(
  <Button
    title="Commencer"
    color='#c62334'
    onPress={() => {testDB()}}
    />);
  const [toDis, setToDis] = useState();
  const [connected, setConnected] = useState(null);
  const [erLog, setErLog] = useState(null);

  const testDB = async() => {
    setIsLoading(true);
    // var rawResponse = await fetch(`https://scrabblecrackback.herokuapp.com?key=963Z852z741`, {mode:'cors'});
    // var res = await rawResponse.json();

    let resStatus = 0;
    await fetch("https://scrabblecrackback.herokuapp.com?key=963Z852z741")
    .then(res => {
      resStatus = res.status
      return res.json()
    }).then(res => {
      switch (resStatus) {
        case 200:
          if (res.res) {setConnected(true)}
          else {setConnected(false), setErLog(res.log)}
          break
        case 400:
            setConnected(false);
            setErLog('this is a client (probably invalid JSON) error, but also might be a server error (bad JSON parsing/validation)');
          break
        case 500:
          setConnected(false);
          setErLog('Server Error, sorry try again later...');
          break
      }
    })
    .catch(err => {
      setConnected(false);
      setErLog(err);
    });

    await setTimeout(
      function() {
        setIsLoading(false);
      }
      .bind(this),
      1000
    );
  }

  useEffect(()=>{
    if (connected) {
      navigation.navigate('AppStack');
    } else if (connected === false) {
      setContent(
        <View style={style.errorContainer}>
          <Text style={style.error}>
            {erLog}
          </Text>
          <Button
          title="Recommencer ?"
          color='#c62334'
          onPress={() => {testDB()}}
          />
        </View>
      )
    }
  }, [connected, erLog])

  useEffect(() => {
    if(isLoading) {
      setToDis(<ActivityIndicator size="large" color="#c62334" />);
    } else {
      setToDis(content)
    }
  }, [isLoading]);
  
  return (
    <View style={style.container}>
      <View style={style.logoContainer}>
        <Image style={style.logo} source={require('../assets/Scrabble-logo.png')} />
      </View>
      {toDis}
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
  errorContainer: {
    width: '70%',
  },
  error: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
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