import React, {useEffect, useRef, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Button, Drawer, TextInput} from 'react-native-paper';
import {
  addTodo,
  selectTodo,
  deleteTodo,
  todoDone,
  selectDoneTodo,
  removeDoneTodo,
} from '../redux/Reducer/todoSlice';
import colors from '../config/colors';
const Todo = () => {
  const [input, setInput] = useState('');
  const [todosColor, setTodosColor] = useState('#64ffda');
  const todos = useSelector(selectTodo);
  const doneTodos = useSelector(selectDoneTodo);
  const dispatch = useDispatch();
  const id = Math.random();
  const addthisTodo = () => {
    console.log('todoadded');
    input !== ''
      ? dispatch(addTodo({data: input, id: id}))
      : console.log('Enter Something');
    setInput('');
  };

  return (
    <View>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <TextInput
          label="ADD TODO"
          outlined
          style={{backgroundColor: 'transparent', flex: 1}}
          value={input}
          onChangeText={(text) => setInput(text)}
        />
        <Button
          style={{padding: 7}}
          mode="contained"
          onPress={addthisTodo}
          compact
          outlined
          color="red">
          ADD
        </Button>
      </View>
      <Text style={styles.title}>TODO</Text>
      {todos
        .map((todo) => (
          <TouchableOpacity
            onPress={() => {
              {
                dispatch(todoDone({data: todo.data, id: todo.id}));
                dispatch(deleteTodo({id: todo.id}));
              }
            }}
            style={{
              backgroundColor: `${todosColor}`,
              marginHorizontal: 9,
              marginVertical: 5,
              borderRadius: 15,
            }}
            key={todo.id}>
            <Drawer.Item icon="star" label={todo.data} />
          </TouchableOpacity>
        ))
        .reverse()}
      <Text style={styles.title}>Completed</Text>
      {doneTodos
        .map((todo) => (
          <TouchableOpacity
            onPress={() => {
              {
                dispatch(removeDoneTodo({id: todo.id}));
              }
            }}
            style={{
              backgroundColor: `#0f0`,
              marginHorizontal: 9,
              marginVertical: 5,
              borderRadius: 15,
            }}
            key={todo.id}>
            <Drawer.Item icon="star" label={todo.data} />
          </TouchableOpacity>
        ))
        .reverse()}
    </View>
  );
};

export default Todo;

const styles = StyleSheet.create({
  title: {
    color: colors.blackColor,
    fontSize: 25,
  },
});
