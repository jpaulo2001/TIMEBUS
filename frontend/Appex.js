import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import MapContainer from './components/MapContainer';
import LocationForm from './components/LocationForm';
import Logo from './components/Logo';
import LoginScreen from './components/LoginComponent';
import axios from 'axios';

export default function App() {
  const [stops, setStops] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);



  return (
    <View style={styles.container}>
      {isLoggedIn ? (
        <>
          <LocationForm stops={stops} />
          <MapContainer stops={stops} />
        </>
      ) : (
        <LoginScreen/>
      )}
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