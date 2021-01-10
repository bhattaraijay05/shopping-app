import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View, Image, Modal} from 'react-native';

import LottieView from 'lottie-react-native';
import {useDispatch} from 'react-redux';
import {
  addItemToBasket,
  selectProducts,
} from '../redux/Reducer/shoppingCartSlice';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import ImageViewer from 'react-native-image-zoom-viewer';
import colors from '../config/colors';
const ProductDescription = ({route}) => {
  const [openModal, setOpenModal] = useState(false);
  const product = route.params;
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
  const viewImage = () => {
    setOpenModal(true);
  };
  const images = [
    {
      url: product.image,
      props: {},
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View>
        <View style={styles.imageView}>
          <TouchableOpacity onPress={viewImage}>
            <Modal
              visible={openModal}
              transparent={true}
              onRequestClose={() => setOpenModal(false)}>
              <ImageViewer
                imageUrls={images}
                enableSwipeDown={true}
                onSwipeDown={() => {
                  setOpenModal(false);
                }}
                backgroundColor={colors.whiteColor}
                useNativeDriver={true}
              />
            </Modal>
            <Image
              style={styles.image}
              source={{
                uri: product.image,
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.nameView}>
          <Text style={{fontSize: 20, color: colors.blackColor}}>
            {product.title}
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 26, color: colors.blackColor}}>
              Rs {product.price}
            </Text>
            <View style={{marginLeft: 'auto', right: 50, top: 10}}>
              <TouchableOpacity onPress={addItemInCart}>
                <LottieView
                  source={require('../assets/lotte/addcart.json')}
                  ref={animation}
                  loop={false}
                  autoPlay={true}
                  progress={0}
                  style={{width: 70, height: 70}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.descView}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: colors.blackColor,
            }}>
            Description
          </Text>
          <Text style={{fontSize: 18, color: colors.blackColor}}>
            {product.description}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductDescription;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  imageView: {
    height: 300,
    backgroundColor: colors.whiteColor,
  },
  container: {
    backgroundColor: colors.whiteColor,
    flex: 1,
  },
  nameView: {
    padding: 20,
  },
  descView: {
    padding: 20,
  },
});
