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

  useEffect(() => {
    fetchStops();
  }, []);

  const fetchStops = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/stops');
      const data = await response.json();
      setStops(data);
    } catch (error) {
      console.error('Error fetching stops:', error);
    }
  };

  

  return (
    <View style={styles.container}>
      <Logo />
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
