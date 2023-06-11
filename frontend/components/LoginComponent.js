import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';

const LoginScreen = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      onLogin(username, password);

      const response = await fetch('http://localhost:4000/api/auth/login', {
        username,
        password,
      });

      const { token } = response.data;

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
    <View>
      <TextInput
        placeholder="Username/Email"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
