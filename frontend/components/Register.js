import React, { useState } from 'react';
import {StyleSheet, View, TextInput, Button, Dimensions, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import Logo from './Logo';
import { BACKEND_IP } from '@env'


export default function RegisterScreen(props){
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const [phone, setPhone] = useState('');

    const registerData = {
      name,
      password,
      email,
      phone,
    };

    const handleRegister = async () => {
      try { 
        if(password!==confirmPassword){Alert.alert("Passwords dont match!")}

        const response = await fetch(`http://${BACKEND_IP}:4000/api/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registerData),
        });
  
        const responseData = await response.json();
  
        if (response.ok) {
          const user = responseData;
          console.log("Register successful:", user);
          Alert.alert("Register Successful")
          props.navigation.navigate('Login')
        } else {
          console.log("Register failed:", responseData);
        }
      } catch (error) {console.log("Error:", error);}
    }
  
    return (
      <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? windowHeight*0.40 : 10}
      style={styles.container}
    >
      <Logo style={styles.logo}/>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Username"
        value={name}
        onChangeText={(text) => setName(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Phone number"
        value={phone}
        onChangeText={(text) => setPhone(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="confirm password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={(text) => setconfirmPassword(text)}
        style={styles.input}
      />
      <Button title="Register" onPress={handleRegister} />
      <Button title="Go to Login" onPress={() => props.navigation.navigate('Login')} />
    </KeyboardAvoidingView>      
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        top:windowHeight*-0.1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: windowWidth*0.5,
        height: 40,
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 5,
      },
      logo:{
        width: windowWidth*0.4,
        height: windowHeight*0.4,
        resizeMode: 'contain',
      }
  });