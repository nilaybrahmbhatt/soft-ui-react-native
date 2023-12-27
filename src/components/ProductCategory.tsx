import React from 'react';
import {
  View,
  ScrollView,
  FlatList,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native'; // Import necessary modules from react-navigation

const ProductCategory = () => {
  const navigation = useNavigation(); // Initialize navigation

  // Dummy product data (replace this with your actual data)
const products = [
    {
      id: 'gid://shopify/Collection/284540698816',
      name: 'Men',
      image: require('../assets/images/mensCat.webp'),
    },
    {
      id: 'gid://shopify/Collection/284540698816',
      name: 'women',
      image: require('../assets/images/womensCat.jpg'),
    },
    {
      id: 'gid://shopify/Collection/284540698816',
      name: 'Kids',
      image: require('../assets/images/kidsCat.jpeg'),
    },
    {
      id: 'gid://shopify/Collection/284540698816',
      name: 'Footwear',
      image: require('../assets/images/footCat.jpg'),
    },
    {
      id: 'gid://shopify/Collection/284540698816',
      name: 'Luggage',
      image: require('../assets/images/luggageCat.jpg'),
    },
    // Add more products as needed
  ];

  const handleImagePress = (category: {
    id: string; // Unique IDs for each product
    name: string;
    image: any;
  }) => {
    // Perform navigation to a new screen passing the productId
    navigation.navigate('CategoryInfo', {category});
  };

  return (
    <ScrollView>
      <FlatList
        data={products}
        horizontal
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.productContainer}
            onPress={() => handleImagePress(item)} // Pass the ID when image is pressed
          >
            <Image source={item.image} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    margin: 10,
    alignItems: 'center',
  },
  productImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  productName: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductCategory;
