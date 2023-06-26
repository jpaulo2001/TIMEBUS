import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native'
import { Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react'

export default function RouteContainerMenu({RouteData, selectRoute}){
    const [routeData, setRouteData] = useState(RouteData)

    useEffect(() => {
        setRouteData(RouteData);
    }, [RouteData]);

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity style={styles.item} key={index} onPress={() => selectRoute(item)}>
                <Text>{item.routeNumber}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Please choose a route:</Text>
            {Array.isArray(routeData) &&
                <FlatList
                    data={routeData}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    style={styles.flatList}
                />
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
        
    }
  });
