import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import MapContainer from './MapContainer';
import LocationForm from './LocationForm';
import Logo from './Logo';
import RouteContainer from './RouteMenuContainer';
import RouteDetails from './RouteDetails';
import RouteContainerMenu from './RouteMenuContainer';


export default function HomeScreen(props) {
  const [routeData, setRouteData] = useState(true);
  const [selectedRoute, setSelectedRoute] = useState(null);

  const updateRouteData = (newData) => {
    setRouteData(newData);
  };

  const logout = () => {
    props.removeToken();
  }
  
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoutButton} onPress={logout}><Text>Logout</Text></TouchableOpacity>
      <Logo/>
      <LocationForm updateRouteData = {updateRouteData}/>
      <MapContainer selectedRoute={selectedRoute}/>
      {selectedRoute ? <RouteDetails selectedRoute={selectedRoute} /> : <RouteContainerMenu RouteData={routeData} selectRoute={setSelectedRoute} />}
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
    marginRight : windowWidth*0.7,
    marginTop: windowHeight*0,
  }
});


