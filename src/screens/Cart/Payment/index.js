import React, {Component} from 'react';
import {Text, View} from "react-native";
import styles from "./styles"
import {connect} from 'react-redux';
import {Timer, getProductImage, currencyFormatter, warn, BlockTimer, toast} from '@app/Omni';
import {TextInput, Button} from "@components"
import {Languages, Style, Images, Constants} from '@common'
import WooWorker from '@services/WooWorker';
import Buttons from '@cart/Buttons'

const PAYMENT = {
  cod: 0,
  paypal: 1,
  stripe: 2
}

class PaymentOptions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      token: null,
      selectedIndex: 0,
      accountNumber: "",
      holderName: "",
      expirationDate: "",
      securityCode: "",
      paymentState: "",
      createdOrder: {}
    }
  }

  nextStep = () => {
    const {user} = this.props.user;

    let payload = {
      customer_id: user.id,
      set_paid: false,
      payment_method: 'cod',
      payment_method_title: Languages.CashOnDelivery,
      customer_note: null,
      billing: user.billing,
      shipping: user.billing,
      line_items: this.getItemsCart(),
    }

    this.setState({loading: true});

    switch (this.state.selectedIndex) {
      case PAYMENT.cod:
        // this.props.createNewOrder(payload);

        WooWorker.createNewOrder(payload, () => {
          this.setState({loading: false});
          this.props.emptyCart();
          this.props.onNext();
        })
        break;

      case PAYMENT.paypal:
        payload.payment_method = 'paypal';
        payload.payment_method_title = Languages.Paypal;

        WooWorker.createNewOrder(payload, (responseData) => {
          this.setState({loading: false});

          this.props.onShowPaypal(responseData)
        })
        break;

      case PAYMENT.stripe:
        payload.payment_method = 'stripe';
        payload.payment_method_title = Languages.Stripe;

        WooWorker.createNewOrder(payload, (responseData) => {
          this.setState({loading: false});
          this.props.onShowStripe(responseData)
        })
        break;
    }

  }

  getItemsCart() {
    const {cartItems} = this.props;
    let items = []
    for (var i = 0; i < cartItems.length; i++) {
      const cartItem = cartItems[i]

      let item = {
        product_id: cartItem.product.id,
        quantity: cartItem.quantity,
      }

      if (cartItem.variation != null) {
        item.variation_id = cartItem.variation.id
      }

      items.push(item)
    }
    return items;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.message && nextProps.message.length > 0) {
      // Alert.alert(Languages.Error, nextProps.carts.message)
      toast(nextProps.message);
    }

    if (nextProps.type && nextProps.type == "CREATE_NEW_ORDER_SUCCESS") {
      this.props.onNext()
    }
  }

  renderCODLayout() {
    return <Text style={styles.message}>{Languages.PayWithCoD}</Text>
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.paymentOption}>
          <View style={styles.optionContainer}>
            <Button
              type="image"
              source={Images.CashOnDelivery}
              onPress={() => this.setState({selectedIndex: PAYMENT.cod})}
              buttonStyle={[styles.btnOption, this.state.selectedIndex == PAYMENT.cod && styles.selectedBtnOption]}
              imageStyle={styles.imgOption}/>
          </View>

          <View style={styles.optionContainer}>
            <Button
              type="image"
              source={Images.PayPal}
              onPress={() => this.setState({selectedIndex: PAYMENT.paypal})}
              buttonStyle={[styles.btnOption, this.state.selectedIndex == PAYMENT.paypal && styles.selectedBtnOption]}
              imageStyle={styles.imgOption}/>
          </View>
        </View>
        {this.state.selectedIndex == PAYMENT.cod && this.renderCODLayout()}

        <Buttons isAbsolute
                 onPrevious={this.props.onPrevious}
                 isLoading={this.state.loading}
                 nextText={Languages.ConfirmOrder}
                 onNext={this.nextStep}/>
      </View>
    );
  }

}

const mapStateToProps = ({carts, user}) => {
  return {
    user,
    type: carts.type,
    cartItems: carts.cartItems,
    message: carts.message,
    customerInfo: carts.customerInfo
  }
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  const {dispatch} = dispatchProps;
  const {actions} = require('@redux/Carts');
  return {
    ...ownProps,
    ...stateProps,
    emptyCart: () => CartRedux.actions.emptyCart(dispatch),
    createNewOrder: (payload) => {
      actions.createNewOrder(dispatch, payload)
    }
  };
}

export default connect(mapStateToProps, undefined, mergeProps)(PaymentOptions);
