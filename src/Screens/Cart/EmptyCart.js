import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import LottieView from 'lottie-react-native';
const EmptyCart = () => {
  const animation = useRef(null);
  useEffect(() => {
    const anim = animation.current.play(0, 50);
    return () => {
      anim;
    };
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/lotte/emptyCart.json')}
        ref={animation}
        loop={false}
        autoPlay={true}
        progress={0}
        style={{width: 250, height: 350}}
      />
    </View>
  );
};

export default EmptyCart;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
});
