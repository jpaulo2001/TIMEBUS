import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native'
import { Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react'

export default function RouteDetails({selectedRoute}){
    const [routeData, setRouteData] = useState(selectedRoute)

    useEffect(() => {
        setRouteData(selectedRoute);
    }, [selectedRoute]);

    return (
        <View style={styles.container}>
            {Array.isArray(routeData) &&
                routeData["stops"].map((stop, stopIndex)=>{
                    return <Text key={stopIndex}>stop</Text>
                })
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
        backgroundColor: 'rgba(0,30,100,0.5)', // semi-transparent to see underlying map
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
        
    }
  });
