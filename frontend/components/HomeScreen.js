import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import MapContainer from './MapContainer';
import LocationForm from './LocationForm';
import Logo from './Logo';


export default function HomeScreen(props) {

  const logout = () => {
    props.removeToken();

  }
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoutButton} onPress={logout}><Text>Logout</Text></TouchableOpacity>
      <Logo/>
      <LocationForm/>
      <MapContainer/>
    </View>
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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


