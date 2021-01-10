import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import {
  increment,
  decrement,
  reset,
  selectCount,
} from '../redux/Reducer/counterSlice';
import colors from '../config/colors';
const Counter = () => {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  const increase = () => {
    dispatch(increment());
  };
  const decrease = () => {
    dispatch(decrement());
  };

  const resetCount = () => {
    dispatch(reset());
  };

  return (
    <View>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <Button
          style={{padding: 7}}
          mode="contained"
          onPress={increase}
          compact
          outlined
          color="red">
          Increase
        </Button>
        <View>
          <Text style={{color: colors.blackColor}}>The count is {count}</Text>
        </View>
        <Button
          style={{padding: 7}}
          mode="contained"
          onPress={decrease}
          compact
          outlined
          color="red">
          Decrease
        </Button>
        <Button
          style={{padding: 7}}
          mode="contained"
          onPress={resetCount}
          compact
          outlined
          color="red">
          Reset
        </Button>
      </View>
    </View>
  );
};

export default Counter;

const styles = StyleSheet.create({
  title: {
    color: colors.blackColor,
    fontSize: 25,
  },
});
