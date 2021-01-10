import React from 'react';
import {StyleSheet, ScrollView, View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import colors from '../config/colors';
import {selectProducts} from '../redux/Reducer/shoppingCartSlice';
import Products from './Products';

const ProductPage = ({title, category}) => {
  const prods = useSelector(selectProducts);
  return (
    <View>
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          left: 10,
          color: colors.blackColor,
        }}>
        {title}
      </Text>
      <ScrollView style={styles.container} horizontal>
        {prods.map((product) => {
          if (product.category === category) {
            return <Products product={product} key={product.id} />;
          }
        })}
      </ScrollView>
    </View>
  );
};

export default ProductPage;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
