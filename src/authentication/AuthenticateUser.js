import React from 'react';
import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {selectUser} from '../redux/Reducer/userSlice';
import BottomNav from '../Screens/Navigator/BottomNav';
import WelcomeStack from '../Screens/Navigator/WelcomeStack';

const AuthenticateUser = () => {
  const anyUser = useSelector(selectUser);

  if (anyUser) {
    return <BottomNav />;
  } else {
    return <WelcomeStack />;
  }
};

export default AuthenticateUser;

const styles = StyleSheet.create({});
