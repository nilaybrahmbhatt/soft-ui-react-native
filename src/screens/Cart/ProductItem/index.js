import React, {PureComponent} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
  Dimensions,
} from 'react-native';
import styles from './styles';
import {
  Styles,
  getProductImage,
  currencyFormatter,
  warn,
  Languages,
  Images,
} from '../../../common/Omni';
// import ChangeQuantity from '@components/ChangeQuantity';
import {Constants} from '@common';
import {connect} from 'react-redux';
import _ from 'lodash';
import ChangeQuantity from '../../../components/ChangeQuantity';

class ProductItem extends PureComponent {
  render() {
    const {product, quantity, variation, onViewProduct} = this.props;
    const textColor =
      _.isObject(variation) && _.isObject(variation.color)
        ? variation.color.value
        : variation.color;
    const textSize =
      _.isObject(variation) && _.isObject(variation.size)
        ? variation.size.value
        : variation.size;

    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity onPress={onViewProduct}>
            <Image
              source={{
                uri: getProductImage(
                  product.images[0],
                  Constants.ProductImages.small,
                ),
              }}
              style={styles.image}
            />
          </TouchableOpacity>

          <View
            style={[
              styles.infoView,
              {width: Dimensions.get('window').width - 180},
            ]}>
            <TouchableOpacity onPress={onViewProduct}>
              <Text style={styles.title}>{product.name}</Text>
            </TouchableOpacity>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>
                {currencyFormatter(product.price)}
              </Text>

              {textColor && (
                <Text style={styles.productColor}>{textColor}</Text>
              )}

              {textSize && (
                <Text style={styles.productColor}>
                  {textSize.toUpperCase()}
                </Text>
              )}
            </View>
          </View>
          <ChangeQuantity
            style={styles.quantity}
            quantity={quantity}
            onChangeQuantity={this.onChangeQuantity.bind(this)}
          />
        </View>
      </View>
    );
  }

  onChangeQuantity(quantity) {
    if (this.props.quantity < quantity) {
      this.props.addCartItem(this.props.product, this.props.variation);
    } else {
      this.props.removeCartItem(this.props.product, this.props.variation);
    }
  }
}

const mapStateToProps = (state) => {
  return {};
};

function mergeProps(stateProps, dispatchProps, ownProps) {
  const {dispatch} = dispatchProps;
  const {actions} = require('@redux/Carts');
  return {
    ...ownProps,
    ...stateProps,
    addCartItem: (product, variation) => {
      actions.addCartItem(dispatch, product, variation);
    },
    removeCartItem: (product, variation) => {
      actions.removeCartItem(dispatch, product, variation);
    },
  };
}

export default connect(mapStateToProps, undefined, mergeProps)(ProductItem);
