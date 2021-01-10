import React, {useState} from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {selectUser, userLogout} from '../redux/Reducer/userSlice';

import {Button, ActivityIndicator} from 'react-native-paper';
import colors from '../config/colors';
const Logout = () => {
  const [spinner, setSpinner] = useState(false);
  const logOutUser = () => {
    Alert.alert(
      'Sign Out',
      'Do you really wanna sign out?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            setSpinner(true);
            dispatch(userLogout());
          },
        },
      ],
      {cancelable: false},
    );
  };
  const dispatch = useDispatch(userLogout);
  const user = useSelector(selectUser);

  return (
    <View>
      <Text style={{color: colors.blackColor}}>Hi {user.displayName}</Text>
      <Button onPress={logOutUser}>Log Out</Button>
      {spinner && <ActivityIndicator animating={spinner} />}
    </View>
  );
};

export default Logout;

const styles = StyleSheet.create({});
