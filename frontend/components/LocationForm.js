import React, { useEffect, useState } from 'react';
import {BACKEND_IP} from '@env'
import { Image, StyleSheet, TextInput, View, Text, TouchableOpacity, Dimensions, SafeAreaView, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ItemSeparatorView = () => {return(<View style={{height: 0.5, width: '100%', backgroundColor: 'black'}}/>)}

export default function LocationForm({updateRouteData,setMapEnlarged,setStartStop,setEndStop,setSelectedRoute}) {
  const [filterDataA, setfilterDataA] = useState([]);
  const [masterDataA, setmasterDataA] = useState([]);
  const [searchA, setSearchA] = useState('');

  const [filterDataB, setfilterDataB] = useState([]);
  const [masterDataB, setmasterDataB] = useState([]);
  const [searchB, setSearchB] = useState('');

  const [activeInput, setActiveInput] = useState('');

  useEffect(()=>{
    fetchStops(setfilterDataA, setmasterDataA);
    fetchStops(setfilterDataB, setmasterDataB);
    return() => {}
  }, [])
  
  const fetchStops = async (setFilterData,setMasterData) => {
    const token = await AsyncStorage.getItem('@token');
    
    const apiURL = `http://${BACKEND_IP}:4000/api/stops/`;
    const response = await fetch(apiURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    });

    const responseJson = await response.json();

    setFilterData(responseJson);
    setMasterData(responseJson);
  }

  const fetchRoutes = async (stopA, stopB) => {
    const token = await AsyncStorage.getItem('@token');
    const apiURL = `http://${BACKEND_IP}:4000/api/routes/search/`;

    const response = await fetch(apiURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        stopA: stopA,
        stopB: stopB
      })
      
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      const responseJson = await response.json();
      updateRouteData('')
      updateRouteData(responseJson)
      setSelectedRoute(null)
      setSearchA('')
      setSearchB('')
      if(responseJson) return true;
    }
  }

  const handleSearchButton = () => {
    if(searchA && searchB) {
      fetchRoutes(searchA,searchB).then((response) => {
        if (response) {
          const startStop = masterDataA.find(stop => stop.stopName === searchA);
          const endStop = masterDataB.find(stop => stop.stopName === searchB);
          if (startStop && endStop) {
            setStartStop(startStop);
            setEndStop(endStop);
            setMapEnlarged(true);
          } else {
            console.error('Failed to find stop data for selected stops');
          }
        }
      });
    }
  }
  

  const searchFilter = (text, setFilterData, masterData, setSearch) => {
    if(text){
      const newData = masterData.filter((item) =>{
        const itemData = item.stopName ? item.stopName.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilterData(newData);
      setSearch(text);
    }else{
      setFilterData(masterData);
      setSearch(text);
    }
  }

  const suggestionPress = (item) =>{
    if (activeInput === 'A') {
      setSearchA(item.stopName);
    } else if (activeInput === 'B') {
      setSearchB(item.stopName);
    }
    setfilterDataA([]);
    setfilterDataB([]);
  }


  const ItemView = ({item}) => {
    return(
      <View style={styles.itemStyle}>
        <TouchableOpacity onPress={()=>suggestionPress(item)}>
          <Text style={styles.suggestionBoxTypography}>{item.stopName}{' => lat: '}{item.lat.toFixed(2)}{', lng: '}{item.lng.toFixed(2)}</Text>
        </TouchableOpacity>
      </View> 
    )
  }
  
  return (
    <View style={styles.container}>
        <View style={styles.textInputConainer}>
            <TextInput 
              style={styles.textInput}
              placeholder='Stop A'
              value={searchA}
              onChangeText={(text) => searchFilter(text, setfilterDataA, masterDataA, setSearchA)}
              onFocus={() => setActiveInput('A')}
            />
            {searchA && filterDataA.length>0 && activeInput==='A' ? (
              <View style={[styles.suggestionBox, { top: windowHeight * 0.06 }]}>
                <FlatList
                  data={filterDataA}
                  keyExtractor={(item, index) => index.toString()}
                  ItemSeparatorComponent={ItemSeparatorView}
                  renderItem = {ItemView}
                />
              </View>
            ):null}
            <TextInput 
              style={styles.textInput}
              placeholder='Stop B'
              value={searchB}
              onChangeText={(text) => searchFilter(text, setfilterDataB, masterDataB, setSearchB)}
              onFocus={() => setActiveInput('B')}
            />
            {searchB && filterDataB.length>0 && activeInput==='B' ? (
              <View style={[styles.suggestionBox, { top: windowHeight * 0.12 }]}>
                <FlatList
                  data={filterDataB}
                  keyExtractor={(item, index) => index.toString()}
                  ItemSeparatorComponent={ItemSeparatorView}
                  renderItem = {ItemView}
                />
              </View>
            ):null}
        </View>
          
        <TouchableOpacity onPress={handleSearchButton} style= {styles.searchButton}>
          <Image source={require('../public/assets/buttons/search.png')} style={styles.searchButtonImage}/>
        </TouchableOpacity>
    </View>
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: windowHeight*0.35,
        left: windowWidth*0.20,
        right:  windowWidth*0.20,
        height: windowHeight*0.1,
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row'
    },
    textInputConainer:{
        width: windowWidth*0.41,
    },
    textInput: {
        height: windowHeight*0.04,
        width: windowWidth*0.4,
        borderWidth: 2,
        borderColor: 'black',
        borderBottomLeftRadius:100,
        borderTopLeftRadius:100,
        paddingHorizontal: 15,
        marginTop: 15,
        backgroundColor: 'white',
    },
    searchButton: {
      borderWidth: 2,
      width: windowWidth*0.2,
      height: windowHeight*0.1,
      borderTopRightRadius:100,
      borderBottomRightRadius:100,
      bottom: 0,
      top:windowHeight*0.01,
    },
    searchButtonImage: {
      width: windowWidth* 0.1,
      resizeMode: 'contain',
      height: windowHeight*0.05,
      top: windowHeight*0.02,
      left: windowWidth*0.02,
      zIndex: 3,
    },

    stopLabel: {
      height: windowHeight*0.02,
      width: windowWidth*0.2,
    },

    suggestionBox:{
      borderColor: 'black',
      borderWidth: '2px',
      left: -windowWidth*0.01,
      backgroundColor: 'grey',
      position: 'absolute',
      zIndex: '2',
      maxHeight: windowHeight*0.1,
    },
    suggestionBoxTypography:{
      fontSize:12,
    },
    itemStyle:{
      maxHeight:windowHeight*0.03,
    }
});
