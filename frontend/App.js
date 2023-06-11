import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MapContainer from './components/MapContainer';
import LocationForm from './components/LocationForm';
import Logo from './components/Logo';
import HomeScreen from './components/HomeScreen';
import Login from './components/Login';


export default function App() {
  return (
    <View style={styles.container}>
      <Login/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


