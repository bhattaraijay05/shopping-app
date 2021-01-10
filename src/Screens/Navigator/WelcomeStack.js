import React from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginPage from '../../authentication/LoginPage';
import SignupPage from '../../authentication/SignupPage';

const Stack = createStackNavigator();
const WelcomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="Login"
        component={LoginPage}
        options={{
          headerLeft: false,
        }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupPage}
        options={{
          headerLeft: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default WelcomeStack;

const styles = StyleSheet.create({});
