import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

export default function Home({navigation}){
  return (
      <View style={styles}>
      <Button title="Go page B"
        onPress={() => navigation.navigate('AppStack')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
