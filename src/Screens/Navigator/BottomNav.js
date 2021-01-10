import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {selectBasket} from '../../redux/Reducer/shoppingCartSlice';

import {useSelector} from 'react-redux';
import Search from '../Search';
import CartPage from '../CartPage';
import ProductStackNavigator from './ProductStackNavigator';
import UserProfileStack from './UserProfileStack';
import colors from '../../config/colors';
const Tab = createBottomTabNavigator();
const BottomNav = () => {
  const prods = useSelector(selectBasket);

  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        tabStyle: {
          borderRadius: 100,
        },
        style: {
          borderTopColor: 'transparent',
          borderRadius: 100,
          marginHorizontal: 15,
          // bottom: -50,
          position: 'absolute',
          elevation: 5,
        },
      }}>
      <Tab.Screen
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          // tabBarVisible: false,
        }}
        name="Home"
        component={ProductStackNavigator}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="search-web"
              color={color}
              size={size}
            />
          ),
        }}
        name="Search"
        component={Search}
      />
      <Tab.Screen
        options={{
          style: {backgroundColor: 'transparent'},
          tabBarIcon: ({color, size}) => (
            <View
              style={{
                backgroundColor: colors.midButtonColor,
                width: 50,
                height: 50,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                bottom: 12,
                borderRadius: 70,
                position: 'absolute',
                elevation: 5,
              }}>
              <Text style={{fontSize: 30}}>+</Text>
            </View>
          ),
        }}
        name="CartPages"
        component={CartPage}
      />

      <Tab.Screen
        options={{
          tabBarLabel: 'Cart',
          tabBarBadge: prods.length !== 0 ? prods.length : null,
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="cart" color={color} size={size} />
          ),
        }}
        name="CartPage"
        component={CartPage}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
        name="UserProfile"
        component={UserProfileStack}
      />
    </Tab.Navigator>
  );
};

export default BottomNav;

const styles = StyleSheet.create({});
