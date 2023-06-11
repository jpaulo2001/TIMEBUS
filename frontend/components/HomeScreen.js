import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MapContainer from './MapContainer';
import LocationForm from './LocationForm';
import Logo from './Logo';


export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Logo/>
      <LocationForm/>
      <MapContainer/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightblue',
  },
});


