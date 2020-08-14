import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function DefModal({navigation, route}) {

  const[isLoading, setIsLoading] = useState(true);
  const[searchResult, setSearchResult] = useState({});

  useEffect(() => {
    var loadData = async () => {
      setIsLoading(true);
    	var rawResponse = await fetch(`https://linguee-api.herokuapp.com/api?q=${route.params.word}&src=fr&dst=en`);
      var response = await rawResponse.json();
      console.log(response)
      setSearchResult(response);
      setIsLoading(false);
    }
    loadData();
  }, []);

  useEffect(()=>{
    console.log(isLoading)
  }, [isLoading])

  if(isLoading) {
    return (
      <View style={styles.container}>
        <Text>LOADING...</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text>{searchResult.real_examples[0].src}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#246659',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
