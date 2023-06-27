import { StyleSheet, View } from 'react-native';
import { useState, useEffect } from 'react';
import HomeScreen from './components/HomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthNavigator from './components/AuthNavigator';  // import the new AuthNavigator

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
      {isLoggedIn ? (<HomeScreen removeToken={removeToken} checkToken={checkToken}/>) : (<AuthNavigator checkToken={checkToken}/>)}  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
