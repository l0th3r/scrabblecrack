import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function Search() {

  //TEST PURPUSE
  var searchTest = ["zimbabwe",
  "zinc",
  "zingueur",
  "zip",
  "zlotys",
  "zombie",
  "zone",
  "zones",
  "zoologie",
  "zozoter",
  "Zurich",];
  //TEST PURPUSE

  //is input focused ref
  const searchInputRef = useRef(null);
  const resultScrollRef = useRef(null);

  const[searchInputValue, setSearchInputValue] = useState("");
  const[searchResults, setSearchResults] = useState(searchTest);
  const[resultToDis, setResultToDis] = useState();

  useEffect(() => {
    let search = searchInputValue.toLowerCase();
    resultScrollRef.current.scrollTo({x: 0, y: 0, animated: true});

    if (search.length != 0) {

      //processing research

    }
  }, [searchInputValue]);

  useEffect(() => {
    let toUse = searchResults;
    let toSend = []
    if (searchResults.length != 0){
      
      for(var i=0;i<toUse.length;i++){
        toSend.push(
        <View key={i}>
          <Text style={styles.resultText}>{toUse[i]}</Text>
          <View style={styles.resultLine}></View>
        </View>
        );
      }
      setResultToDis(toSend);
    } else {
      setResultToDis(<Text style={styles.resultText}>No result</Text>);
    }
  }, [searchResults]);
  
  
  // getisfocused isSearchInputFocused.current.isFocused()]);

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Text style={styles.title}>Recherche simple</Text>
        <Text style={styles.subTitle}>Cherchez des mots comportants vos lettres.</Text>
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <TextInput ref={searchInputRef} autoCapitalize='characters' placeholder="Vos lettres" value={searchInputValue} onChangeText={(e)=>{setSearchInputValue(e)}} style={styles.searchInput}/>
          </View>
          {/* <Button disabled={isInputEmpty} color="#c62334" title='Tricher' style={styles.searchButton}/> */}
        </View>

        <View style={styles.resultsContainer}>
          <ScrollView ref={resultScrollRef} persistentScrollbar={true} onScrollBeginDrag={()=>searchInputRef.current.blur()}>
            {resultToDis}
          </ScrollView>
        </View>
      
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  
  resultsContainer: {
    flex: 1,
    width: '100%',
    borderRadius: 5,
    backgroundColor: '#194b41',
    padding: 10,
    overflow: 'hidden',
  },
  resultText: {
    color: 'white',
    fontSize: 17,
    fontWeight: "600",
  },
  resultLine: {
    marginTop: 8,
    marginBottom: 8,
    height: 1, //TO CHANGE TO => 0.2
    backgroundColor: '#fff'
  },


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
    paddingRight: 10,
    // marginRight: 10,
    borderRadius: 5,
  },
  searchInput: {
    flex: 1,
    color: 'white',
    marginRight: 10,
    fontSize: 18,
  },
});
