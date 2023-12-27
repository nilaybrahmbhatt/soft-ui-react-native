import * as React from 'react';
import {Dimensions, Text, View, Image} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

function Carousels() {
  const width = Dimensions.get('window').width;
  const carouselData = [
    {
      id: '01',
      Image: require('../assets/images/card5.png'),
    },
    {
      id: '02',
      Image: require('../assets/images/carousel1.png'),
    },
    {
      id: '03',
      Image: require('../assets/images/card4.png'),
    },
  ];
  return (
    <View style={{flex: 1}}>
      <Carousel
        loop
        width={width}
        height={width / 2}
        autoPlay={true}
        data={carouselData} // Use the carouselData array containing image paths
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => console.log('current index:', index)}
        renderItem={({item}) => (
          <View style={{flex: 1}}>
            <Image
              source={item.Image} // Access the image path from the item
              style={{width: '100%', height: '100%', resizeMode: 'cover'}}
            />
          </View>
        )}
      />
    </View>
  );
}

export default Carousels;
