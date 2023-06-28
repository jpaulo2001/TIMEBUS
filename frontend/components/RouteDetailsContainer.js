import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native'
import { Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react'

export default function RouteDetailsContainer({selectedRoute,setFocusedStop, focusOnStop, startStop, endStop}){
    const [routeData, setRouteData] = useState(selectedRoute)
    
    useEffect(() => {
        setRouteData(selectedRoute);
    }, [selectedRoute]);

    const onItemPress = (item) => {
        setFocusedStop(item);
      };

    const startIndex = routeData?.stops?.indexOf(startStop?.stopName);
    const endIndex = routeData?.stops?.indexOf(endStop?.stopName);
  

    const StopItem = ({item,index}) => {
        const isWithinRouteSection = index >= startIndex && index <= endIndex;
        const isLastStop = index === routeData?.stops?.length - 1;
        return (
            <View style={styles.stopContainer}>
             {!isLastStop && <View style={[styles.verticalLine, {backgroundColor: isWithinRouteSection && (index!==endIndex) ? 'green' : 'red'}]}/>}
            <TouchableOpacity
                style={styles.flatListElement} 
                onPress={()=> focusOnStop(item)}>
                <View style={[styles.stopIcon, {backgroundColor: isWithinRouteSection ? 'green' : 'red'}]}/>
                <View style={styles.textContainer}><Text style={styles.test}>{item} </Text></View>
            </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {routeData?.stops ?
                <FlatList
                    onPress={() => onItemPress(item)}
                    data={routeData?.stops}
                    renderItem={({item, index}) => <StopItem item={item} index={index} />}
                    keyExtractor={(item, index) => index.toString()}
                    style={styles.flatList}
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
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: '15px',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    text: {
        width: windowWidth*0.4,
        borderColor: 'black',
        borderWidth: 1,
        borderStyle: 'solid',
    },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        width: '100%'
    },
    flatList: {
        flex: 1,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: windowWidth*0.1,
        right: windowWidth*0.1,
        overflow: 'auto',
        padding: windowHeight*0.02
    },
    stopIcon:{
        position: 'absolute',
        width: 15,
        height: 15,
        borderRadius: 3,
        marginRight: 5,
        borderColor: 'black',
        borderWidth: 1,
        borderStyle: 'solid',
    },
    verticalLine: {
        position: 'absolute',
        height: windowHeight*0.06,
        width: windowWidth*0.02,
        top: 7.5,
        marginLeft: windowWidth*0.009,
        borderColor: 'black',
        borderWidth: '1',
        borderStyle: 'solid',
    },
    flatListElement: {
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'space-between',
    },
    stopContainer: {
        position: 'relative',
        height: windowHeight*0.06,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center',
    },
  });
