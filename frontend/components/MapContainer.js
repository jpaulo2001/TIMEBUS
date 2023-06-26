import React, { useState, useEffect } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import { StyleSheet, View, TouchableOpacity, Image, Dimensions } from 'react-native';
//import { REACT_APP_BACKEND_IP } from '@env'
import {mapStyleTemplate} from '../public/mapStyle/mapstyle'
import AsyncStorage from '@react-native-async-storage/async-storage';

const request = 'https://maps.googleapis.com/maps/api/directions/json?origin=37.7749,-122.4194&destination=37.7749,-122.5113&key={}'

export default function MapContainer({selectedRoute, setMapEnlarged, mapEnlarged}) {

  const [selectedRouteWithCoordinates, setSelectedRouteWithCoordinates] = useState(null);
  const [pathCoordinates, setPathCoordinates] = useState(null);
  const [stops, setStops] = useState([]);

  const toggleMapSize = () => {
    console.log(mapEnlarged)
    setMapEnlarged(!mapEnlarged);
  };

  const mapStyle = mapEnlarged ? styles.enlargedMap : styles.map;
  const buttonStyle = mapEnlarged ? styles.enlargeButtonEnlarged : styles.enlargeButton;

  const coorPontaDelgada = {latitude: 37.73893724181937, longitude: -25.669530728849 }

  useEffect(() => {
    fetchStops();
  }, []);

  useEffect(() => {
    if (selectedRoute && stops.length > 0) {
      const routeWithCoordinates = selectedRoute.stops.map(stopName => {
        const stopDetails = stops.find(stop => stop.stopName === stopName);
        return { name: stopName, lat: stopDetails.lat, lng: stopDetails.lng };
      });

      setSelectedRouteWithCoordinates({ ...selectedRoute, stops: routeWithCoordinates });
    }
  }, [selectedRoute, stops]);

  //get the navigation data from mapbox api
  useEffect(() => {
    if (selectedRouteWithCoordinates) {
      const stopsForAPI = selectedRouteWithCoordinates.stops.map((stop, index) => {
        return `${stop.lng},${stop.lat}`;
      }).join(';');
  
      fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${stopsForAPI}?geometries=geojson&overview=full&access_token=pk.eyJ1IjoicnViZW5zZXJyYWx2YSIsImEiOiJjbGlka3Z5OG8wdGVkM2RuYmV2NXJ2bWM2In0.Q6BEC42wrGzQei_IzqEkAQ`)
      .then(response => response.json())
        .then(data => {
          if(data.routes && data.routes[0]) {
            const routeCoordinates = data.routes[0].geometry.coordinates.map(coordinate => {
              return {
                latitude: coordinate[1],
                longitude: coordinate[0],
              };
            });
            setPathCoordinates(routeCoordinates);
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }, [selectedRouteWithCoordinates]);
  

  //get every stop
  const fetchStops = async () => {
    try {
      const token = await AsyncStorage.getItem('@token');
      const apiURL = `http://localhost:4000/api/stops/`;
      const response = await fetch(apiURL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });
      const responseJson = await response.json();
      setStops(responseJson);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <View style={styles.container}>
      <MapView
        style={mapStyle}
        customMapStyle={mapStyleTemplate}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: coorPontaDelgada.latitude,
          longitude: coorPontaDelgada.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {selectedRouteWithCoordinates?.stops.map((stop, index) => {
          const lat = parseFloat(stop.lat);
          const lng = parseFloat(stop.lng);

          return (
            <Marker
              key={index}
              coordinate={{ latitude: lat, longitude: lng }}
              title={stop.name}
            />
          );
        })}
        {pathCoordinates && (
          <Polyline
            coordinates={pathCoordinates}
            strokeColor="#FF0000" // Specify the color of the polyline
            strokeWidth={3} // Specify the width of the polyline
          />
        )}
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
    top: windowHeight*0.51,
    left: windowWidth*0.05,
    right: windowWidth*0.05,
    bottom: windowHeight*0.05,
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
    borderStyle: 'dashed'
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
    resizeMode: 'contain',
    top: -windowHeight/2.4,
    left: windowWidth/2.3,
    width: 40,
    height: 40,
    zIndex: 3,
    backgroundColor:'lightblue',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 5,
  },

  enlargeButtonEnlarged: {
    resizeMode: 'contain',
    top: -windowHeight/2,
    left: windowWidth/2.5,
    width: 40,
    height: 40,
    zIndex: 3,
    backgroundColor:'lightblue',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 5,
  }
});
