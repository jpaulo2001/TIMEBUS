import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MapContainer from './components/MapContainer';
import LocationForm from './components/LocationForm';
import Logo from './components/Logo';
import { useState, useEffect } from 'react';
import LoginScreen from './components/Login';
import HomeScreen from './components/HomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('@token');
    if (token) {setIsLoggedIn(true)} else {setIsLoggedIn(false)}
  }

  useEffect(() => {checkToken()}, []);

  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem('@token');
      console.log('Token removed');
    } catch (error) {
      console.error('Failed to remove the token');
    }
  }

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
