import axios from 'axios';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextInput, Button} from 'react-native-paper';

const AddProducts = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState('');
  const [reviews, setReviews] = useState('');
  const [countInStock, setCountInStock] = useState('');

  const postData = () => {
    axios.post('http://192.168.10.211:3001/products', {
      title: title,
      image: image,
      description: description,
      brand: brand,
      category: category,
      price: price,
      countInStock: countInStock,
      rating: rating,
      reviews: reviews,
    });
    setTitle('');
    setDescription('');
    setImage('');
    setBrand('');
    setCategory('');
    setPrice('');
    setRating('');
    setReviews('');
    setCountInStock('');
  };
  return (
    <View>
      <Text>ADD THE PRODUCTS</Text>
      <TextInput
        label="Title"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        label="Description"
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      <TextInput
        label="Price"
        value={price}
        numericvalue
        keyboardType={'numeric'}
        onChangeText={(text) => setPrice(text)}
      />
      <TextInput
        label="Image"
        value={image}
        onChangeText={(text) => setImage(text)}
      />
      <TextInput
        label="Brand"
        value={brand}
        onChangeText={(text) => setBrand(text)}
      />
      <TextInput
        label="Category"
        value={category}
        onChangeText={(text) => setCategory(text.toLowerCase())}
      />
      <TextInput
        label="Rating"
        value={rating}
        numericvalue
        keyboardType={'numeric'}
        onChangeText={(text) => setRating(text)}
      />
      <TextInput
        label="Reviews"
        value={reviews}
        numericvalue
        keyboardType={'numeric'}
        onChangeText={(text) => setReviews(text)}
      />
      <TextInput
        label="Stocks"
        value={countInStock}
        numericvalue
        keyboardType={'numeric'}
        onChangeText={(text) => setCountInStock(text)}
      />
      <Button icon="post" mode="contained" onPress={postData}>
        Add Item
      </Button>
    </View>
  );
};

export default AddProducts;

const styles = StyleSheet.create({});
