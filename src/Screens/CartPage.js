import React from 'react';
import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {selectBasket} from '../redux/Reducer/shoppingCartSlice';
import Cart from './Cart/Cart';
import EmptyCart from './Cart/EmptyCart';
const CartPage = () => {
  const basketItem = useSelector(selectBasket);
  return <>{basketItem.length > 0 ? <Cart /> : <EmptyCart />}</>;
};

export default CartPage;

const styles = StyleSheet.create({});
