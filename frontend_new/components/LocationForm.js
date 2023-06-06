import React, { useEffect, useState } from 'react';
import { REACT_APP_BACKEND_IP } from '@env'
import { Image, StyleSheet, TextInput, View, Text, TouchableOpacity, Dimensions, SafeAreaView, FlatList } from 'react-native';

export default function LocationForm() {
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


  const fetchStops = (setFilterData,setMasterData) => {
    const apiURL = `http://${REACT_APP_BACKEND_IP}:4000/api/stops/`;
    fetch(apiURL)
    .then((response)=>response.json())
    .then((responseJson) => {
      setFilterData(responseJson);
      setMasterData(responseJson);
    }).catch((error)=>{
      console.error(error);
    })
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

  const ItemSeparatorView = () => {return(<View style={{height: 0.5, width: '100%', backgroundColor: 'black'}}/>)}
  
  return (
    <View style={styles.container}>
        <View style={styles.textInputConainer}>
          <Text style={styles.stopLabel}>Stop A</Text>
            <TextInput 
              style={styles.textInput}
              value={searchA}
              onChangeText={(text) => searchFilter(text, setfilterDataA, masterDataA, setSearchA)}
              onFocus={() => setActiveInput('A')}
            />
            {searchA && filterDataA.length>0 && activeInput==='A' ? (
              <View style={styles.suggestionBox}>
                <FlatList
                  data={filterDataA}
                  keyExtractor={(item, index) => index.toString()}
                  ItemSeparatorComponent={ItemSeparatorView}
                  renderItem = {ItemView}
                />
              </View>
            ):null}
          <Text style={styles.stopLabel}>Stop B</Text>
            <TextInput 
              style={styles.textInput}
              value={searchB}
              onChangeText={(text) => searchFilter(text, setfilterDataB, masterDataB, setSearchB)}
              onFocus={() => setActiveInput('B')}
            />
            {searchB && filterDataB.length>0 && activeInput==='B' ? (
              <View style={styles.suggestionBox}>
                <FlatList
                  data={filterDataB}
                  keyExtractor={(item, index) => index.toString()}
                  ItemSeparatorComponent={ItemSeparatorView}
                  renderItem = {ItemView}
                />
              </View>
            ):null}
        </View>
          
        <TouchableOpacity style= {styles.searchButton}>
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
        paddingHorizontal: 10,
    },
    searchButton: {
      borderWidth: 2,
      //borderColor: 'black',
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
      left: windowWidth*0.05,
      top: -windowHeight*0.15,
      backgroundColor: 'grey',
      position: 'absolute',
    },
    suggestionBoxTypography:{
      fontSize:12,
    },
    itemStyle:{
      maxHeight:windowHeight*0.03,
    }
});
