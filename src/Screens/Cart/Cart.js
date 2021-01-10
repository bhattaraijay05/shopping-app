import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {DataTable} from 'react-native-paper';
import {
  selectBasket,
  deleteItemFromBasket,
  decreaseBasketItemQuantity,
  increaseBasketItemQuantity,
} from '../../redux/Reducer/shoppingCartSlice';
import Icons from 'react-native-vector-icons/Fontisto';
import colors from '../../config/colors';
import {useNavigation} from '@react-navigation/native';

const Cart = () => {
  const basketItem = useSelector(selectBasket);
  const dispatch = useDispatch(selectBasket);

  const navigation = useNavigation();
  return (
    <ScrollView style={{backgroundColor: colors.whiteColor}}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title style={{left: 5}}>
            <Text style={{color: colors.blackColor}}>Product</Text>
          </DataTable.Title>
          <DataTable.Title style={{left: 10}}>
            <Text style={{color: colors.blackColor}}>Description</Text>
          </DataTable.Title>
          <DataTable.Title style={{left: 22}}>
            <Text style={{color: colors.blackColor}}>Quantity</Text>
          </DataTable.Title>
          <DataTable.Title style={{right: -10}}>
            <Text style={{color: colors.blackColor}}>Price</Text>
          </DataTable.Title>
        </DataTable.Header>
      </DataTable>
      {basketItem.map((product) => (
        <View style={styles.itemView} key={product.id}>
          <TouchableOpacity
            style={styles.leftView}
            onPress={() =>
              navigation.navigate('ProductDescription', (product = product))
            }>
            <Image
              style={styles.image}
              source={{
                uri: product.image,
              }}
            />
          </TouchableOpacity>
          <View style={styles.midView}>
            <View style={styles.midViewLeft}>
              <Text style={{color: colors.blackColor}}>{product.title}</Text>
            </View>
            <View style={styles.midViewMid}>
              <TouchableOpacity
                style={[
                  styles.qtyChangeButton,
                  {borderColor: colors.minusButton},
                ]}
                onPress={() => {
                  product.qty > 1
                    ? dispatch(decreaseBasketItemQuantity(product))
                    : dispatch(deleteItemFromBasket({id: product.id}));
                }}>
                <Text
                  style={[
                    styles.addMinusButton,
                    {borderColor: 'red', color: colors.minusButton},
                  ]}>
                  -
                </Text>
              </TouchableOpacity>
              <Text style={{fontSize: 18}}>{product.qty}</Text>
              <TouchableOpacity
                style={[
                  styles.qtyChangeButton,
                  {borderColor: colors.addButton},
                ]}
                onPress={() => dispatch(increaseBasketItemQuantity(product))}>
                <Text
                  style={[
                    styles.addMinusButton,
                    {borderColor: 'red', color: colors.addButton},
                  ]}>
                  +
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.midViewRight}>
              <Text style={{color: colors.blackColor}}>
                {(product.price * product.qty).toFixed(2)}
              </Text>
            </View>
          </View>
          <View style={styles.rightView}>
            <TouchableOpacity
              onPress={() => dispatch(deleteItemFromBasket({id: product.id}))}>
              <Icons
                name="shopping-basket-remove"
                color={colors.blackColor}
                size={20}
              />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  leftView: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  midView: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 5,
  },
  midViewLeft: {flex: 0.5},
  midViewRight: {flex: 0.2},
  rightView: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemView: {
    height: 70,
    display: 'flex',
    flexDirection: 'row',
    margin: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  qtyChangeButton: {
    width: 25,
    height: 25,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    marginHorizontal: 3,
  },
  midViewMid: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.3,
  },
  addMinusButton: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
