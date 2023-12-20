import React, {PureComponent} from 'react';
import {Text, View, ScrollView, TouchableOpacity} from 'react-native';
import styles from './styles';
import css from '@cart/styles';
import {currencyFormatter} from '../../../common/Omni';
import {connect} from 'react-redux';
import ProductItem from '../ProductItem';
import {SwipeRow} from 'react-native-swipe-list-view';
import {FontAwesome} from '@expo/vector-icons';
import {Languages} from '@common';

class MyCart extends PureComponent {
  render() {
    const {cartItems, onViewProduct, totalPrice} = this.props;

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={css.row}>
            <Text style={css.label}>{Languages.TotalPrice}</Text>
            <Text style={css.value}>{currencyFormatter(totalPrice)}</Text>
          </View>
          <View style={styles.list}>
            {cartItems &&
              cartItems.map((item, index) => (
                <SwipeRow
                  key={'cart' + index}
                  disableRightSwipe={true}
                  leftOpenValue={75}
                  rightOpenValue={-75}>
                  {this.renderHiddenRow(item, index)}
                  <ProductItem
                    key={index}
                    product={item.product}
                    onViewProduct={() => onViewProduct(item)}
                    variation={item.variation}
                    quantity={item.quantity}
                  />
                </SwipeRow>
              ))}
          </View>
        </ScrollView>
      </View>
    );
  }

  renderHiddenRow(rowData, index) {
    return (
      <TouchableOpacity
        key={'hiddenRow-' + index}
        style={styles.hiddenRow}
        onPress={() =>
          this.props.removeCartItem(rowData.product, rowData.variation)
        }>
        <View style={{marginRight: 23}}>
          <FontAwesome name="trash" size={30} color="white" />
        </View>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = ({carts}) => {
  return {cartItems: carts.cartItems, totalPrice: carts.totalPrice};
};

function mergeProps(stateProps, dispatchProps, ownProps) {
  const {dispatch} = dispatchProps;
  const {actions} = require('@redux/Carts');
  return {
    ...ownProps,
    ...stateProps,
    removeCartItem: (product, variation) => {
      actions.removeCartItem(dispatch, product, variation);
    },
  };
}

export default connect(mapStateToProps, undefined, mergeProps)(MyCart);
