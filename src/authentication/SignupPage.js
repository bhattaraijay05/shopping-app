import React, {useState} from 'react';
import {StyleSheet, Text, View, Alert, TextInput} from 'react-native';
import auth from '@react-native-firebase/auth';
import {ActivityIndicator} from 'react-native-paper';
import colors from '../config/colors';
import {userLogin} from '../redux/Reducer/userSlice';
import {useDispatch} from 'react-redux';

import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
const SignupPage = ({navigation}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isValid, setValid] = useState(true);
  const [spinner, setSpinner] = useState(false);
  const goToSignIn = () => {
    navigation.navigate('Login');
  };

  const __doSignUp = () => {
    if (!email) {
      Alert.alert('Error', 'All the fields with * are necessary');
      setError('Email required *');
      setValid(false);
      return;
    } else if (!password && password.trim() && password.length > 6) {
      setError('Weak password, minimum 5 chars');
      setValid(false);
      return;
    }
    handleSignup(email, password);
    setSpinner(true);
  };

  const dispatch = useDispatch(userLogin);

  const handleSignup = async (email, password) => {
    try {
      await auth()
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
          response.user.updateProfile({
            displayName: fullName,
          });
          dispatch(userLogin({user: response.user}));
        })
        .then(() => {
          auth().currentUser.sendEmailVerification();
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          Alert.alert(errorCode, errorMessage);
        });
    } catch (e) {
      const err = e.message;
      Alert.alert(err);
      setSpinner(false);
    }
  };

  return (
    <View style={styles.signUpScreen}>
      <View style={styles.signUpScreen__upperView}>
        <Text style={styles.signUpScreen__upperView__text}>Sign Up</Text>
      </View>
      <View style={styles.signUpScreen__lowerView}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{flexDirection: 'row'}}>
            <View>
              <Text style={{color: colors.blackColor}}>
                Enter Full Name <Text style={{color: 'red'}}>*</Text>
              </Text>
              <TextInput
                label={'fullname'}
                placeholder="Full Name"
                onChangeText={(text) => {
                  setError;
                  setFullName(text);
                }}
                error={isValid}
                autoCapitalize="none"
                style={styles.signUpScreen__lowerView__textInput}
              />
            </View>
          </View>
          <Text style={{color: colors.blackColor}}>
            Enter your email <Text style={{color: 'red'}}>*</Text>
          </Text>
          <TextInput
            label={'Email'}
            keyboardType="email-address"
            placeholder="Email address"
            onChangeText={(text) => {
              setError;
              setEmail(text);
            }}
            error={isValid}
            autoCapitalize="none"
            style={styles.signUpScreen__lowerView__textInput}
          />
          <Text style={{color: colors.blackColor}}>
            Enter your password <Text style={{color: 'red'}}>*</Text>
          </Text>
          <TextInput
            label={'Password'}
            secureTextEntry
            placeholder="Password"
            error={isValid}
            onChangeText={(text) => setPassword(text)}
            autoCapitalize="none"
            style={styles.signUpScreen__lowerView__textInput}
          />

          {spinner && <ActivityIndicator animating={spinner} />}
          <View style={styles.signUpScreen__lowerView__button}>
            <TouchableOpacity onPress={__doSignUp}>
              <Text style={styles.signUpScreen__lowerView__button__text}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.signUpScreen__lowerView__button}>
            <TouchableOpacity onPress={goToSignIn}>
              <Text style={styles.signUpScreen__lowerView__button__text}>
                Login Here
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default SignupPage;
const styles = StyleSheet.create({
  signUpScreen: {
    display: 'flex',
    flex: 1,
    backgroundColor: colors.signUpScreen__upperView,
  },
  signUpScreen__upperView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpScreen__upperView__text: {
    fontSize: 50,
    color: colors.whiteColor,
  },
  signUpScreen__lowerView: {
    flex: 3,
    backgroundColor: colors.signUpScreen__lowerView,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  signUpScreen__lowerView__text: {
    fontSize: 16,
    color: 'grey',
  },
  signUpScreen__lowerView__button: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 10,
  },
  signUpScreen__lowerView__button__text: {
    backgroundColor: 'red',
    padding: 20,
    fontSize: 17,
    borderRadius: 30,
    width: '100%',
    color: colors.whiteColor,
  },
  signUpScreen__lowerView__textInput: {
    padding: 20,
    flex: 1,
  },
});
