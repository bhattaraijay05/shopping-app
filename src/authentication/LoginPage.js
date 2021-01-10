import React, {useState} from 'react';
import {StyleSheet, Text, View, Alert, TextInput, Animated} from 'react-native';
import {Button, ActivityIndicator} from 'react-native-paper';
import auth from '@react-native-firebase/auth';

import colors from '../config/colors';

import {userLogin} from '../redux/Reducer/userSlice';
import {useDispatch} from 'react-redux';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
const LoginPage = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isValid, setValid] = useState(true);
  const [spinner, setSpinner] = useState(false);

  const gotoSignup = () => {
    navigation.navigate('Signup');
  };

  const __doSignIn = () => {
    if (!email || !password) {
      setError('Email and password fields are required *');
      setValid(false);
      return;
    } else if (!password && password.trim() && password.length > 6) {
      setError('Weak password, minimum 5 chars');
      setValid(false);
      return;
    }
    setSpinner(true);
    handleSignin(email, password);
  };
  const dispatch = useDispatch(userLogin);

  const handleSignin = async (email, password) => {
    try {
      let response = await auth().signInWithEmailAndPassword(email, password);
      if (response && response.user) {
        console.log('User is Logged IN');
        dispatch(userLogin({user: response.user}));
      }
    } catch (e) {
      const err = e.message;
      Alert.alert(err);
      setSpinner(false);
    }
  };
  return (
    <View style={styles.signInScreen}>
      <View style={styles.signInScreen__upperView}>
        <Text style={styles.signInScreen__upperView__text}>Sign In</Text>
      </View>
      <Animated.View style={[styles.signInScreen__lowerView]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={{color: colors.blackColor}}>Enter your email</Text>
          <TextInput
            label={'Email'}
            keyboardType="email-address"
            placeholder="Email address"
            onChangeText={(text) => {
              setError;
              setEmail(text);
            }}
            autoCapitalize="none"
            error={isValid}
            style={styles.signInScreen__lowerView__textInput}
          />

          <Text style={{color: colors.blackColor}}>Enter your password</Text>
          <TextInput
            label={'Password'}
            secureTextEntry
            placeholder="Password"
            error={isValid}
            autoCapitalize="none"
            onChangeText={(text) => setPassword(text)}
            style={styles.signInScreen__lowerView__textInput}
          />

          {spinner && <ActivityIndicator animating={spinner} />}
          <View style={styles.signInScreen__lowerView__button}>
            <TouchableOpacity onPress={__doSignIn}>
              <Text style={styles.signInScreen__lowerView__button__text}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.signInScreen__lowerView__button}>
            <TouchableOpacity onPress={gotoSignup}>
              <Text style={styles.signInScreen__lowerView__button__text}>
                Sign Up Here
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animated.View>
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  signInScreen: {
    display: 'flex',
    flex: 1,
    backgroundColor: colors.signInScreen__upperView,
  },
  signInScreen__upperView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInScreen__upperView__text: {
    fontSize: 50,
    color: colors.whiteColor,
  },
  signInScreen__lowerView: {
    flex: 3,
    backgroundColor: colors.signInScreen__lowerView,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  signInScreen__lowerView__text: {
    fontSize: 16,
    color: 'grey',
  },
  signInScreen__lowerView__button: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 10,
  },
  signInScreen__lowerView__button__text: {
    backgroundColor: 'red',
    padding: 20,
    fontSize: 17,
    borderRadius: 30,
    width: '100%',
    color: colors.whiteColor,
  },
  signInScreen__lowerView__textInput: {
    padding: 20,
  },
});
