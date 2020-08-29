import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';

export default function DefModal({navigation, route}) {

  //oxford dictionnary API
  // var Dictionary = require("oxford-dictionary-api");
  // var app_id = "5a7097bc";
  // var app_key = "49436713f0b011608a993684cc3a5a2d";
  // var dict = new Dictionary(app_id,app_key);

  // dict.find("ace",function(error,data){ if(error) return console.log(error); console.log(data); });

  const[isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    var loadData = async () => {
      setIsLoading(true);
      // dict.find("zoologie", function(error, data) {
      //   if(error) {
      //     console.log(error);
      //     return 0;
      //   } else {
      //     console.log(data);
      //   }
      // });
    	// var rawResponse = await fetch(``);
      // var response = await rawResponse.json();
      // console.log(response)
      // setSearchResult(response);
      setIsLoading(false);
    }
    loadData();
  }, []);

  useEffect(()=>{
    // console.log(isLoading);
  }, [isLoading]);

  if(isLoading) {
    return (
      <View style={styles.container}>
        <Text>{route.params.target}</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
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
