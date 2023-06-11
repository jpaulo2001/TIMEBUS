import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './components/Login';
import HomeScreen from './components/HomeScreen'
import LoginScreen from './components/Login';


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
  },
});


