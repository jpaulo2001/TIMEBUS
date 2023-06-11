import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Alert, Dimensions } from 'react-native';
import axios from 'axios';

export default function LoginScreen(){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            "username":username,
            "password":password 
        }),
      });

      const token  = response.json()

      // Store the token securely (e.g., using AsyncStorage or a secure storage mechanism)

      // Clear the input fields
      setUsername('');
      setPassword('');

      // Display a success message
      Alert.alert('Success', 'Login successful!');
    } catch (error) {
      console.error(error);
      // Display an error message
      Alert.alert('Error', 'Invalid username or password');
    }
  };

  return (
    <View styles={styles.container}>
      <TextInput
        placeholder="Username/Email"
        value={username}
        onChangeText={(text) => setUsername(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
        style={styles.input}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const styles = StyleSheet.create({
    container: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: windowWidth*0.5,
        height: 40,
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10,
      },

  });

