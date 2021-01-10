import React from 'react';
import {StyleSheet} from 'react-native';
import Admin from '../../admin/Admin';

import {createStackNavigator} from '@react-navigation/stack';
import Home from '../Home';
import UserProfilePage from '../Profile/UserProfilePage';
const Stack = createStackNavigator();
const UserProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Profilepage" component={UserProfilePage} />
      <Stack.Screen name="Admin" component={Admin} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default UserProfileStack;

const styles = StyleSheet.create({});
