import React from 'react';
import {StyleSheet, Text, ScrollView} from 'react-native';
import Logout from '../authentication/Logout';
import AddProducts from './AddProducts';

const Admin = () => {
  
  return (
    <ScrollView>
      <Logout />
      <AddProducts />
    </ScrollView>
  );
};

export default Admin;

const styles = StyleSheet.create({});
