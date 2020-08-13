import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function Search() {

  //TEST PURPUSE
  var searchResults = ['mot', 'test', 'merci'];
  //TEST PURPUSE

  //is input focused ref
  const isSearchInputFocused = useRef(null);

  const[searchInputValue, setSearchInputValue] = useState("");
  const[isInputEmpty, setIsInputEmpty] = useState(true);

  useEffect(() => {
    searchInputValue.length > 0 ?
    setIsInputEmpty(false)  :
    setIsInputEmpty(true)   ;
  }, [searchInputValue]);
  
  // getisfocused isSearchInputFocused.current.isFocused()]);

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Text style={styles.title}>Recherche simple</Text>
        <Text style={styles.subTitle}>Cherchez des mots comportants vos lettres.</Text>
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <TextInput ref={isSearchInputFocused} placeholder="Vos lettres" value={searchInputValue} onChangeText={(e)=>{setSearchInputValue(e)}} style={styles.searchInput}/>
          </View>
          <Button disabled={isInputEmpty} color="#c62334" title='Tricher' style={styles.searchButton}/>
        </View>

        <View style={styles.resultContainer}>

        </View>
      
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#246659',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: '100%',
    height: '100%',
    padding: 30,
    alignItems: 'center',
    overflow:"hidden",
  },
  title: {
    color: 'white',
    fontWeight: '800',
    fontSize: 30,
    marginTop: 0,
    marginBottom: 50,
  },
  subTitle: {
    color: 'white',
    fontWeight: '500',
    fontSize: 21,
    marginTop: 0,
    marginBottom: 30,
  },
  searchContainer: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 30,
  },
  searchInputContainer: {
    flex: 1,
    height: 37,
    backgroundColor: '#194b41',
    paddingLeft: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  searchInput: {
    flex: 1,
    color: 'white',
    borderRadius: 5,
    marginRight: 10,
    fontSize: 18,
  },

  resultContainer: {
    flex: 1,
    width: '100%',
    borderRadius: 7,
    backgroundColor: '#194b41',
  }
});
