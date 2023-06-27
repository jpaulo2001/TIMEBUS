import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet} from 'react-native';

import LoginScreen from './Login';
import RegisterScreen from './Register';

const Stack = createStackNavigator();

export default function AuthNavigator({checkToken}) {
  return (
    <NavigationContainer> 
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen  name="Login">
          {props => <LoginScreen {...props} checkToken={checkToken} />}
        </Stack.Screen>

        <Stack.Screen name="Register" component={RegisterScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        
    }
});