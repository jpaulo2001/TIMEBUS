import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native'
import { Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react'

export default function RouteDetailsContainer({selectedRoute,setFocusedStop, focusOnStop}){
    const [routeData, setRouteData] = useState(selectedRoute)
    
    useEffect(() => {
        setRouteData(selectedRoute);
    }, [selectedRoute]);

    const onItemPress = (item) => {
        setFocusedStop(item);
      };

    const StopItem = ({item}) => {
        return (
            <TouchableOpacity 
                style={{flexDirection: 'row', alignItems: 'center'}} 
                onPress={()=> focusOnStop(item)}>
                <View style={styles.stopIcon}/>
                <View style={styles.verticalLine}/>
                <Text>Stop: {item} </Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            {routeData?.stops ?
                <FlatList
                    onPress={() => onItemPress(item)}
                    data={routeData?.stops}
                    renderItem={StopItem}
                    keyExtractor={(item, index) => index.toString()}
                />
                : <Text>Loading stops...</Text>
            }
        </View>
    )
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: windowHeight*0.65,
        left: windowWidth*0.1,
        right: windowWidth*0.1,
        bottom: windowHeight*0.05,
        backgroundColor: 'rgba(0,30,100,0.5)',
        borderColor: '',
        borderStyle: 'solid',
        borderWidth: '2px',
        borderRadius: '15px',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        position: 'absolute',
        top: 0,
        borderColor: 'red',
        borderStyle: 'solid',
        borderWidth: 2,
    },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        width: '100%'
    },
    flatList: {
        position: 'absolute',
        top: windowHeight*0.04,
        bottom: windowHeight*0.05,
        left: windowWidth*0.1,
        right: windowWidth*0.1,
    },
    stopIcon:{
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'red',
        marginRight: 5
    },
    verticalLine: {
        height: '100%',
        width: 1,
        backgroundColor: 'black',
        marginRight: 5
    }
  });
