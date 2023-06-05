import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MapContainer from './components/MapContainer';
import LocationForm from './components/LocationForm';
import Logo from './components/Logo';


export default function App() {
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


