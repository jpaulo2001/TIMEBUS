import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions, FlatList } from 'react-native';

export default function ResultContainer() {
    const [route, setRoute] = useState([{stopName: 'sss'},{stopName: 'ssads'},{stopName: 'ssads'}]);

    const ItemView = ({ item }) => {
        return (
            <View style={styles.itemStyle}>
                <View style={styles.circleStyle} />
                <Text style={styles.stopName}>{'-- '}{item.stopName}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={route}
                keyExtractor={(item, index) => index.toString()}
                renderItem={ItemView}
            />
        </View>
    );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
    },
    itemStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    circleStyle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'blue',
        marginRight: 10,
    },
    stopName: {
        fontSize: 16,
    },
});
