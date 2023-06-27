import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import MapContainer from './MapContainer';
import LocationForm from './LocationForm';
import Logo from './Logo';
import RouteDetails from './RouteDetails';
import RouteContainerMenu from './RouteMenuContainer';


export default function HomeScreen(props) {
  const [routeData, setRouteData] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [mapEnlarged, setMapEnlarged] = useState(false)

  const updateRouteData = (newData) => {
    setRouteData(newData);
  };

  const logout = () => {
    props.removeToken();
  }
  
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoutButton} onPress={logout}><Text>Logout</Text></TouchableOpacity>
      <Logo style = {styles.Image}/>
      <LocationForm updateRouteData = {updateRouteData} setMapEnlarged={setMapEnlarged} />
      <MapContainer selectedRoute={selectedRoute} setMapEnlarged={setMapEnlarged} mapEnlarged={mapEnlarged}/>
      {mapEnlarged && routeData ? (selectedRoute ? <RouteDetails selectedRoute={selectedRoute} /> : <RouteContainerMenu RouteData={routeData} selectRoute={setSelectedRoute}/>):null}
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