import axios from 'axios';
import React, {useEffect} from 'react';
import {StyleSheet, Text, View, SafeAreaView, ScrollView} from 'react-native';

import {Searchbar} from 'react-native-paper';
import {useSelector} from 'react-redux';
import colors from '../config/colors';
import {selectProducts} from '../redux/Reducer/shoppingCartSlice';
import Products from './Products';
const Search = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = (query) => setSearchQuery(query);

  // useEffect(() => {
  //   axios
  //     .get('http://192.168.10.211:3001/')
  //     .then((response) => console.log('THe response is', response.data))
  //     .catch((e) => console.error('The error is', e.message));
  // }, []);

  const prods = useSelector(selectProducts);
  return (
    <ScrollView style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={{borderRadius: 40, margin: 20, top: 10}}
      />
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {prods.map((product) => {
          if (
            (searchQuery &&
              product.title
                .toLowerCase()
                .includes(searchQuery.toLowerCase())) ||
            (searchQuery &&
              product.category
                .toLowerCase()
                .includes(searchQuery.toLowerCase()))
          ) {
            return <Products product={product} key={product.id} />;
          }
        })}
      </View>
    </ScrollView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.whiteColor,
    flex: 1,
  },
});
