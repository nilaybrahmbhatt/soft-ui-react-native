import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const categoriesData = [
  {
    id: 'gid://shopify/Collection/284540698816',
    name: '40% off',
    image: require('../assets/images/men.jpeg'),
    handle: 'Oversized Hooded Sweatshirts',
  },
  {
    id: 'gid://shopify/Collection/284540698816',
    name: '45% off',
    image: require('../assets/images/women.webp'),
    handle: 'Oversized Hooded Sweatshirts',
  },
  // Add more categories as needed
];

const CategoryItem = ({item, onPress}) => (
  <TouchableOpacity onPress={onPress} style={styles.categoryItem}>
    <Image source={item.image} style={styles.categoryImage} />
    <Text style={styles.categoryTitle}>{item.name}</Text>
  </TouchableOpacity>
);

const Deals = () => {
  const navigation = useNavigation();
  const handleCategoryPress = (category: any) => {
    navigation.navigate('CategoryInfo', {category});
  };
  const renderCategoryItem = ({item}) => (
    <CategoryItem item={item} onPress={() => handleCategoryPress(item)} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.categoryTitle}>Latest Deals for you</Text>
      <FlatList
        data={categoriesData}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.categoryList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    marginTop: -180,
  },
  categoryList: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryItem: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    margin: 5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 160,
    height: 160,
  },
  categoryImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Deals;
