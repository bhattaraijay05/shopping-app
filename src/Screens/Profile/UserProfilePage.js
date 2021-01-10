import React from 'react';
import {StyleSheet, Text, ScrollView} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
const UserProfilePage = ({navigation}) => {
  const navigateToAddProduct = () => {
    navigation.navigate('Admin');
  };
  return (
    <ScrollView>
      <TouchableOpacity onPress={navigateToAddProduct}>
        <Text>Add Products</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default UserProfilePage;

const styles = StyleSheet.create({});
