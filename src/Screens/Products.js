import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, Text, View, Image, Modal} from 'react-native';
import {useDispatch} from 'react-redux';
import {
  selectProducts,
  addItemToBasket,
} from '../redux/Reducer/shoppingCartSlice';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import color from '../config/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import colors from '../config/colors';
const Products = ({product}) => {
  const dispatch = useDispatch(selectProducts);
  const animation = useRef(null);

  const addItemInCart = () => {
    dispatch(addItemToBasket(product));
    animation.current.play(40, 136);
  };

  useEffect(() => {
    const anim = animation.current.play(0, 40);
    return () => {
      anim;
    };
  }, []);

  const navigation = useNavigation();
  return (
    <View key={product.id} style={styles.productHorz}>
      <View style={styles.topView}>
        <Image
          style={styles.image}
          source={{
            uri: product.image,
          }}
        />
      </View>
      <View style={styles.productDesc}>
        <View style={styles.prodLeft}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ProductDescription', (product = product))
            }>
            <Text style={styles.title} numberOfLines={2}>
              {product.title}
            </Text>
          </TouchableOpacity>
          <Text style={styles.price}>Rs {product.price}</Text>
        </View>
        <View style={styles.prodRight}>
          <TouchableOpacity onPress={addItemInCart}>
            <LottieView
              source={require('../assets/lotte/addcart.json')}
              ref={animation}
              loop={false}
              autoPlay={true}
              progress={0}
              style={{width: 30, height: 30}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({
  productDesc: {
    width: 250,
    height: 100,
    backgroundColor: color.whiteColor,
    borderRadius: 10,
    marginTop: -15,
    elevation: 40,
    flexDirection: 'row',
  },
  addItem: {
    marginLeft: 'auto',
    right: 50,
  },
  title: {
    fontSize: 20,
    top: 3,
    left: 3,
    flexShrink: 1,
    color: colors.blackColor,
  },
  price: {
    fontSize: 25,
    bottom: 20,
    marginTop: 'auto',
    color: colors.blackColor,
  },
  prodLeft: {
    flex: 0.9,
  },
  prodRight: {
    justifyContent: 'flex-end',
    bottom: 20,
  },
  productHorz: {
    paddingRight: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  topView: {
    backgroundColor: color.whiteColor,
    borderRadius: 20,
    width: 250,
    height: 200,
  },
});
