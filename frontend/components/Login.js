import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Alert, Dimensions, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from './Logo';

export default function LoginScreen(props){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginData = {
    username,
    password,
  };

  const handleLogin = async () => {
    try {
        const response = await fetch('http://localhost:4000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginData),
        });

        if (response.ok) {
            let answer = await response.json();
            if(answer.message==="No user found!"){
                Alert.alert('Error', 'Invalid username or password');
                return
            }
            console.log("Login successful:", answer);
            setUsername('');
            setPassword('');
            Alert.alert('Success', 'Login successful!');

            await AsyncStorage.setItem('@token', answer.token);

            props.checkToken();
        }
    } catch (error) {
        console.error(error);
        Alert.alert('Error', 'A problem ocurred');
    }
  };

  return (
      <View style={styles.container}>
        <Logo style={styles.logo}/>
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
        <Button title="Go to Register" onPress={() => props.navigation.navigate('Register')} />
      </View>    
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const styles = StyleSheet.create({
    container: {
      flex:1,
      top:windowHeight*-0.2,
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
    logo:{
      width: windowWidth*0.4,
      height: windowHeight*0.4,
      resizeMode: 'contain',
    }
  });

