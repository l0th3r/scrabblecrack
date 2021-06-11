import React, { useState, useEffect, useRef, } from 'react';


import { 
Alert,
StyleSheet,
Text,
View,
TextInput,
ActivityIndicator,
FlatList,
Platform,
TouchableOpacity
} from 'react-native';

export default function Search({navigation}) {

  //is input focused ref
  const searchInputRef = useRef(null);

  const [searchInputValue, setSearchInputValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [resultToDis, setResultToDis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadSwitch, setLoadSwitch] = useState(<Text style={styles.resultText}>Loading...</Text>);

  useEffect(()=>{
    if (isLoading) {
      setLoadSwitch(
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#c62334" />
        </View>
      );
    } else {
      setLoadSwitch(resultToDis);
    }
  },[isLoading]);

  useEffect(() => {
    var fetch = async() => {
      let toUse = searchResults;
      if (searchResults.length != 0){
        setResultToDis(
          <FlatList
            refreshing={isLoading}
            initialNumToRender={10}
            ItemSeparatorComponent={
              Platform.OS !== 'android' &&
              (({ highlighted }) => (
                <View
                  style={styles.resultLine}
                />
              ))
            }
            data={toUse}
            renderItem={({ item, index }) => (
              <View key={index}>
                <TouchableOpacity
                  style={styles.button} 
                  onPress={()=>{ navigation.navigate('DefModal', {target: item, name: `"${item}" définition`}) }}
                >
                  <View style={styles.resultContent}>
                    <Text style={styles.resultText}>{item}</Text>          
                  </View>
                </TouchableOpacity>
              </View>
            )}
          />
        );
      } else {
        setResultToDis(<Text style={styles.resultText}>Pas de Résultat</Text>);
      }
    }
    fetch();
    setIsLoading(false);
  }, [searchResults]);

  var post = async(q) => {
    var rawResponse;
    let resStatus = 0;
    await fetch(`https://scrabblecrackback.herokuapp.com/get-words?key=963Z852z741&q=${q}`)
    .then(res => {
      resStatus = res.status
      return res.json()
    }).then(res => {
      switch (resStatus) {
        case 200:
          res.res ?
            setSearchResults(res.result): 
            setResultToDis(<Text style={styles.resultText}>{res.log}</Text>);
          break
        case 400:
          Alert.alert(
            'Error ' + resStatus,
            'Probably invalid JSON error',
            [{ text: 'OK', onPress:()=>navigation.navigate('Home')}],
            { cancelable: false }
          );
          break
        case 500:
          Alert.alert(
            'Error ' + resStatus,
            'Server error, try again later please.',
            [{ text: 'OK', onPress:()=>navigation.navigate('Home')}],
            { cancelable: false }
          );
          break
      }
    }).catch(err => {
      Alert.alert(
        'Error',
        'Server error, try again later please.',
        [{ text: 'OK', onPress:()=>navigation.navigate('Home')}],
        { cancelable: false }
      );
    });
  }

  useEffect(() => {
    setIsLoading(true);
    let search = searchInputValue.toLowerCase();
    post(search, 1);
  }, [searchInputValue]);

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Text style={styles.title}>Recherche simple</Text>
        <Text style={styles.subTitle}>Cherchez des mots comportants vos lettres.</Text>
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <TextInput ref={searchInputRef}
              placeholder="Vos lettres"
              value={searchInputValue}
              onChangeText={(e)=>{setSearchInputValue(e)}}
              style={styles.searchInput}
            />
          </View>
        </View>

        {/* NEED ref.blur() on the keyboard */}
        <View style={styles.resultsContainer}> 
          {loadSwitch}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  
  resultsContainer: {
    flex: 1,
    display: "flex",
    width: '100%',
    borderRadius: 5,
    backgroundColor: '#194b41',
    padding: 10,
    overflow: 'hidden',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor: '#194b41',
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
    height: 1,
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
    fontSize: 30,
    marginTop: 0,
    marginBottom: 15,
  },
  subTitle: {
    color: 'white',
    fontWeight: '500',
    fontSize: 21,
    marginTop: 0,
    marginBottom: 25,
  },
  searchContainer: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 15,
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
