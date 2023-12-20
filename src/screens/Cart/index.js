import React, {PureComponent} from 'react';
import {View, WebView, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {connect} from 'react-redux';
import {Languages} from '../../common';
import Modal from 'react-native-modalbox';
import MyCart from './MyCart';
// import PaymentEmpty from './Empty';
import Buttons from './Buttons';
import {Ionicons} from '@expo/vector-icons';

import ShopifyAPI from '../../services/ShopifyAPI';

export const OrderStatus = {
  pending: 'pending',
  processing: 'processing',
  onHold: 'on-hold',
  completed: 'completed',
  cancelled: 'cancelled',
  refunded: 'refunded',
  failed: 'failed',
};

class Cart extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      pageRef: null,
      createdOrder: {},
      checkoutUrl: '',
    };
  }

  checkUserLogin = () => {
    const {user} = this.props.user;
    if (user === null) {
      this.props.onMustLogin();
      return false;
    }
    return true;
  };

  onCloseCheckout = () => {
    // this.props.navigation.navigate('MyOrders')
    this.props.emptyCart();
  };

  onShowCheckOut() {
    this.refs.CheckOutModal.open();
  }

  onCheckOut = async () => {
    var self = this;
    const {cartItems} = this.props;
    // const cart = await ShopifyAPI.initCart();
    // const checkoutId = cart.id;
    let lineItems = [];

    cartItems.map(async (item, index) => {
      let variants = item.product.variants[index];
      if (!variants) {
        const product = await ShopifyAPI.fetchProduct(item.product.id);
        variants = product.variants[0];
      }

      lineItems.push({
        variantId: variants.id,
        quantity: item.quantity,
      });
    });

    // finish checkout
    let cartItem = await ShopifyAPI.initCart(lineItems);
    // console.log(cartItem);
    // console.log(index,cartItems.length - 1);

    await self.setState({checkoutUrl: cartItem.webUrl});
    this.onShowCheckOut();
  };

  isVariantProduct(product) {
    return product.variants.length > 1 ? true : false;
  }

  async getPosVariant(product, _variation) {
    let pos = 0; // default
    let isVariant = this.isVariantProduct(product);
    if (isVariant) {
      const size = _variation.size.toLowerCase();
      const color = _variation.color.toLowerCase();
      product.variants.map((item, i) => {
        const optionValues = item.optionValues;
        // console.log(optionValues[0].value.toLowerCase(),optionValues[1].value.toLowerCase());
        if (
          optionValues[0].value.toLowerCase() == size &&
          optionValues[1].value.toLowerCase() == color
        ) {
          return Promise.resolve((pos = i));
        }
      });
      return Promise.resolve(pos);
    } else {
      return Promise.resolve(0);
    }
  }

  onPrevious = () => {
    this.props.navigation.goBack();
    // if (this.state.currentIndex == 0) {
    //   this.props.onBack();
    //   return;
    // }
    // this.tabView.goToPage(this.state.currentIndex - 1);
  };

  componentWillMount() {
    this.props.navigation.setParams({title: Languages.ShoppingCart});
  }

  render() {
    const {onViewProduct, navigation, cartItems, onViewHome} = this.props;
    const {currentIndex} = this.state;
    // const renderCheckoutUrl = () => (
    //   <Modal
    //     ref="CheckOutModal"
    //     backdropPressToClose={false}
    //     backButtonClose={true}
    //     swipeToClose={false}
    //     onClosed={this.onCloseCheckout}
    //     style={styles.checkoutModal}>
    //     <TouchableOpacity
    //       style={styles.iconZoom}
    //       onPress={this.onCloseCheckout}>
    //       <Ionicons
    //         name="ios-close"
    //         size={20}
    //         style={styles.iconClose}
    //         color="#666"
    //       />
    //       <Text style={styles.textClose}>CLOSE</Text>
    //     </TouchableOpacity>

    //     <WebView
    //       style={{flex: 1}}
    //       source={{uri: this.state.checkoutUrl}}
    //       javaScriptEnabled={true}
    //       startInLoadingState={true}
    //     />
    //   </Modal>
    // );

    if (currentIndex == 0 && cartItems && cartItems.length == 0) {
      return <Text>Empty</Text>;
      // return <PaymentEmpty onViewHome={onViewHome} />;
    } else {
      return (
        <View style={styles.fill}>
          <View style={styles.content}>
            <MyCart
              key="cart"
              onNext={this.onCheckOut}
              onPrevious={this.onPrevious}
              navigation={navigation}
              onViewProduct={onViewProduct}
            />
            <Buttons onPrevious={this.onPrevious} onNext={this.onCheckOut} />
          </View>
          {/* {renderCheckoutUrl()} */}
        </View>
      );
    }
  }
}

const mapStateToProps = ({carts, user}) => {
  console.log(carts);
  return {
    cartItems: carts.cartItems,
    user,
    emptyCart: carts.emptyCart,
  }
};
function mergeProps(stateProps, dispatchProps, ownProps) {
  const {dispatch} = dispatchProps;
  const {actions} = require('../../redux/Carts');
  return {
    ...ownProps,
    ...stateProps,
    emptyCart: () => actions.emptyCart(dispatch),
  };
}

export default connect(mapStateToProps, undefined, mergeProps)(Cart);
