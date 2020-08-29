import React, { useState, useEffect, useRef } from 'react';
import Words_fr from '../assets/liste_francais';


import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function Search({navigation}) {

  //TEST PURPUSE
  var searchTest = ["Zimbabwe",
  "anticonstitutionel",
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
  const[searchResults, setSearchResults] = useState([]);
  const[resultToDis, setResultToDis] = useState();
  const[loaderStyle, setLoaderStyle] = useState(null);
  const[isLoading, setIsLoading] = useState(false);

  useEffect(()=>{
    isLoading ? setLoaderStyle(styles.loading) : setLoaderStyle(null);
  },[isLoading])

  useEffect(() => {
    setIsLoading(true);
    let search = searchInputValue.toLowerCase();
    resultScrollRef.current.scrollTo({x: 0, y: 0, animated: true});

    if (search.length != 0) {
      var letters = search.split('');
      var sResult = [];
      for(var f=0;f<Words_fr.length;f++) {
        if(Words_fr[f].includes(letters[0])){
          sResult.push(Words_fr[f]);
        }
      }
      if(letters.length >= 2){
        for(var i=1;i<letters.length;i++){
          let temp = [];
          for(var j=0;j<sResult.length;j++){
            if(sResult[j].includes(letters[i])) {
              temp.push(sResult[j]);
            }
          }
          sResult = temp;
        }
      }
      setSearchResults(sResult);
    } else {
      setSearchResults([]);
    }
    setIsLoading(false);
  }, [searchInputValue]);

  useEffect(() => {
    var fetch = async() => {
      let toUse = searchResults;
      let toSend = []
      if (searchResults.length != 0){
        
        for(var i=0;i<toUse.length;i++){
          let word = toUse[i];
          toSend.push(
          <View key={i}>
            {/* <TouchableOpacity
              style={styles.button} 
              onPress={()=>{ navigation.navigate('DefModal', {target: word, name: `"${word}" définition`})}}> */}
              <View style={styles.resultContent}>
                <Text style={styles.resultText}>{toUse[i]}</Text>          
              </View>
            {/* </TouchableOpacity> */}
            <View style={styles.resultLine}></View>
          </View>
          );
        }
        setResultToDis(toSend);
      } else {
        setResultToDis(<Text style={styles.resultText}>No result</Text>);
      }
    }
    fetch();
  }, [searchResults]);

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Text style={styles.title}>Recherche simple</Text>
        <Text style={styles.subTitle}>Cherchez des mots comportants vos lettres.</Text>
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <TextInput ref={searchInputRef}
              autoCapitalize="characters"
              placeholder="Vos lettres"
              value={searchInputValue}
              onChangeText={(e)=>{setSearchInputValue(e)}}
              style={styles.searchInput}
            />
          </View>
          {/* <Button color="#c62334" title='Tricher' style={styles.searchButton}/> */}
        </View>

        <View style={styles.resultsContainer}>
          <View style={loaderStyle}>
          </View>
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
    // display: "flex",
    width: '100%',
    borderRadius: 5,
    backgroundColor: '#194b41',
    padding: 10,
    overflow: 'hidden',
  },
  loadingContainer: {
    width: "100%",
    height:"100%",
    opacity: "20%",
    backgroundColor: 'red',
  },
  resultContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  resultText: {
    color: 'white',
    fontSize: 30,
    fontWeight: "600",
  },
  resultLine: {
    marginTop: 8,
    marginBottom: 8,
    height: 1, //TO CHANGE TO => 0.2
    backgroundColor: '#8ca5a0'
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
