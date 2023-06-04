import React, { useState, useEffect } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import { StyleSheet, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import axios from 'axios';


export default function MapContainer() {

  const [isMapEnlarged, setIsMapEnlarged] = useState(false);
  const [stops, setStops] = useState([]);

  const toggleMapSize = () => {
    setIsMapEnlarged(!isMapEnlarged);
  };

  const mapStyle = isMapEnlarged ? styles.enlargedMap : styles.map;
  const buttonStyle = isMapEnlarged ? styles.enlargeButtonEnlarged : styles.enlargeButton;

  const coorPontaDelgada = {latitude: 37.73893724181937, longitude: -25.669530728849 }

  useEffect(() => {
    fetchStops();
  }, []);

  //get every stop
  const fetchStops = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/stops/');
      setStops(response.data);
    } catch (error) {
      console.error('Error fetching stops:', error);
    }
  };

  const pathCoordinates = stops.map((stop) => ({
    latitude: stop.lat,
    longitude: stop.lng,
  }));

  return (
    <View style={styles.container}>
      <MapView
        style={mapStyle}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: coorPontaDelgada.latitude,
          longitude: coorPontaDelgada.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {stops.map((stop) => (
          <Marker
            coordinate={{ latitude: stop.lat, longitude: stop.lng }}
            title={stop.stopName}
          />
        ))}
        <Polyline
          coordinates={pathCoordinates}
          strokeColor="#FF0000" // Specify the color of the polyline
          strokeWidth={3} // Specify the width of the polyline
        />
      </MapView>
      <TouchableOpacity onPress={toggleMapSize}>
        <Image source={require('../public/assets/buttons/enlarge.png')} style={buttonStyle} />
      </TouchableOpacity>
    </View>
  );  
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '55%',
    left: '15%',
    right: '15%',
    bottom: '10%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: '25px',
  },

  enlargedMap: {
    ...StyleSheet.absoluteFill,
    position: 'absolute',
    top: -windowHeight / 2,
    left: -windowWidth / 2,
    width: windowWidth * 2,
    height: windowHeight * 2,
    zIndex: 0, // Adjust the zIndex value to bring the map in front
  },

  enlargeButton: {
    width: 50,
    resizeMode: 'contain',
    top: '-650%',
    left: '45%',
    height: 40,
    zIndex: 3,
  },

  enlargeButtonEnlarged: {
    width: 50,
    resizeMode: 'contain',
    top: '-1600%',
    left: '50%',
    width: 40,
    height: 40,
    zIndex: 3,
  }
});
