import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MapContainer from './components/MapContainer';
import LocationForm from './components/LocationForm';
import Logo from './components/Logo';
import { useState } from 'react';
import LoginScreen from './components/Login';
import HomeScreen from './components/HomeScreen';


export default function App() {
  const [stops, setStops] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <View style={styles.container}>
      {isLoggedIn ? (<HomeScreen/>) : (<LoginScreen/>)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
