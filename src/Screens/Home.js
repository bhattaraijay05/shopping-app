import axios from 'axios';
import React, {useEffect} from 'react';
import {RefreshControl, StyleSheet, ScrollView} from 'react-native';
import {useDispatch} from 'react-redux';
import colors from '../config/colors';
import {fetchProduct} from '../redux/Reducer/shoppingCartSlice';
import ProductPage from './ProductPage';
import {useScrollToTop} from '@react-navigation/native';

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};
const Home = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const ref = React.useRef(null);
  useScrollToTop(ref);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const dispatch = useDispatch();
  useEffect(() => {
    const getItems = axios
      .get(`https://fakestoreapi.com/products`)
      .then(({data}) => dispatch(fetchProduct(data)))
      .catch((err) => console.error(err));
    return () => {
      getItems;
    };
  }, []);

  return (
    <ScrollView
      ref={ref}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={{backgroundColor: colors.whiteColor}}>
      <ProductPage title="Jewellary" category="jewelery" />
      <ProductPage title="Men Clothing" category="men clothing" />
      <ProductPage title="Women Clothing" category="women clothing" />
      <ProductPage title="Electronics" category="electronics" />
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  todo: {
    padding: 20,
  },
});
