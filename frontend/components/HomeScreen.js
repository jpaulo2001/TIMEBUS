import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import MapContainer from './MapContainer';
import LocationForm from './LocationForm';
import Logo from './Logo';
import RouteContainerMenu from './RouteMenuContainer';
import RouteDetailsContainer from './RouteDetailsContainer';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen(props) {
  const mapRef = useRef(null);

  const [routeData, setRouteData] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [mapEnlarged, setMapEnlarged] = useState(false)
  const [startStop, setStartStop] = useState(null);
  const [endStop, setEndStop] = useState(null);
  const [focusedStop, setFocusedStop] = useState(null);
  const [stops, setStops] = useState([]);

  useEffect(() => {
    fetchStops();
    if (focusedStop) {focusOnStop(focusedStop);}
  }, [focusedStop, stops]);

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

  const focusOnStop = (stopName) => {
    if (stops && mapRef.current) {
      const stop = stops.find((stop) => stop.stopName === stopName);
      if (stop) {
        mapRef.current.animateToRegion(
          {
            latitude: stop.lat,
            longitude: stop.lng,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          },
          1000
        );
      }
    }
  };


  const updateRouteData = (route) => {
    setRouteData(route);
  };

  const logout = () => {
    props.removeToken();
    props.checkToken();
  }
  
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoutButton} onPress={logout}><Text>Logout</Text></TouchableOpacity>
      <Logo style = {styles.Image}/>
      <LocationForm setSelectedRoute={setSelectedRoute} setStartStop={setStartStop} setEndStop={setEndStop} updateRouteData = {updateRouteData} setMapEnlarged={setMapEnlarged} />
      <MapContainer focusOnStop={focusOnStop} mapRef={mapRef} stops={stops} focusedStop={focusedStop} startStop={startStop} endStop={endStop} selectedRoute={selectedRoute} setMapEnlarged={setMapEnlarged} mapEnlarged={mapEnlarged}/>
      {mapEnlarged && routeData ? (selectedRoute ? <RouteDetailsContainer focusOnStop={focusOnStop} setFocusedStop={setFocusedStop} selectedRoute={selectedRoute} /> : <RouteContainerMenu RouteData={routeData} selectRoute={setSelectedRoute}/>):null}
    </View>
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightblue',
    width: windowWidth,
  },
  logoutButton:{
    top: windowHeight*-0.17,
    marginRight : windowWidth*0.7,
    marginTop: windowHeight*0,
    backgroundColor: 'lightblue',
    borderWidth: '2px',
    borderRadius:'15px',
    padding: 5,
  },
  Image: {
    width: windowWidth*0.4,
    top: windowHeight*-0.3,
    resizeMode: 'contain',  // contain or cover
  },
});