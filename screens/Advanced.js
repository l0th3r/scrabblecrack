import React, { useState, useEffect, useRef, } from 'react';


import { StyleSheet, Text, View, TextInput, ActivityIndicator, FlatList, Platform, TouchableOpacity } from 'react-native';

export default function Search({navigation}) {

  //is input focused ref
  const searchInputRef = useRef(null);

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
  }, []);

  var post = async() => {
    // console.log(result);
    // var request = '';
    // for(var i=0;i<result.length;i++) {
    //   if (i === 0) {request = request + `${result[i].name}=${result[i].value}`}
    //   else {request = request + `&${result[i].name}=${result[i].value}`}
    // }

    // var rawRes = await fetch(props.route, {
    //     method: 'POST',
    //     headers: {'Content-Type':'application/x-www-form-urlencoded'},
    //     body: request
    // });

    // var prsRes = await rawRes.json();
  }

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Text style={styles.title}>Recherche avancée</Text>
        <Text style={styles.subTitle}>Composez votre mot.</Text>
        <View style={styles.CompoContainer}> 
          {loadSwitch}
        </View>
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
  CompoContainer: {
    // flex: 1,
    display: "flex",
    width: '100%',
    borderRadius: 5,
    backgroundColor: '#194b41',
    padding: 10,
    marginBottom: 15,
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
    overflow:"hidden",
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 30,
    marginTop: 0,
    marginBottom: 25,
  },
  subTitle: {
    color: 'white',
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
