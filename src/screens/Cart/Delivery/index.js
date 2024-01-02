import React, {Component} from 'react';
import {Text, View, Platform} from "react-native";
import styles from "./styles"
import css from "@cart/styles"
import {TextInput, Button} from "@components"
import {Styles, Images, Constants, Languages} from '@common';
import {connect} from 'react-redux';
import Buttons from "@cart/Buttons";
import {toast, warn} from '@app/Omni';

class Delivery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address_1: ""
    }
  }

  componentWillMount() {
    const {user} = this.props.user;
    if (user) {
      this.setState({
        firstName: user.first_name || '',
        lastName: user.last_name ? user.last_name : user.name ? user.name : '',
        email: user.email || '',
        address_1: user.billing.address_1 || '',
        phone: user.billing.phone || '',
      })
    }
  }

  nextStep = () => {
    this.customerInfo = {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      address_1: this.state.address_1,
      email: this.state.email,
      phone: this.state.phone
    }
    this.props.validateCustomerInfo(this.customerInfo);

    this.props.onNext()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.message && nextProps.message.length > 0) {
      toast(nextProps.message)
    }
  }

  render() {
    const iOS = Platform.OS === 'ios';

    return (
      <View style={styles.container}>
        <View style={css.row}>
          <Text style={css.label}>{Languages.YourDeliveryInfo}</Text>
        </View>
        <View style={styles.form}>
          <View style={ iOS ? styles.input : styles.inputAndroid}>
            <TextInput
              value={this.state.firstName}
              onChangeText={(text) => this.setState({firstName: text})}
              placeholder={Languages.EnterYourFirstName} />
          </View>
          <View style={[iOS ? styles.input : styles.inputAndroid]}>
            <TextInput
              value={this.state.lastName}
              onChangeText={(text) => this.setState({lastName: text})}
              placeholder={Languages.EnterYourLastName} />
          </View>
          <View style={iOS ? styles.input : styles.inputAndroid}>
            <TextInput
              value={this.state.email}
              onChangeText={(text) => this.setState({email: text})}
              placeholder={Languages.EnterYourEmail} />
          </View>
          <View style={iOS ? styles.input : styles.inputAndroid}>
            <TextInput
              value={this.state.phone}
              onChangeText={(text) => this.setState({phone: text})}
              placeholder={Languages.EnterYourPhone} />
          </View>
          <View style={iOS ? styles.input : styles.inputAndroid }>
            <TextInput
              value={this.state.address_1}
              disableFullscreenUI={true}
              onChangeText={(text) => this.setState({address_1: text})}
              placeholder={Languages.EnterYourAddress} />
          </View>
        </View>

        <Buttons isAbsolute
                 onPrevious={this.props.onPrevious}
                 onNext={this.nextStep} />
      </View>
    );
  }
}

const mapStateToProps = ({carts, user}) => {
  return {user, message: carts.message, type: carts.type}
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  const {dispatch} = dispatchProps;
  const {actions} = require('@redux/Carts');
  return {
    ...ownProps,
    ...stateProps,
    validateCustomerInfo: (customerInfo) => {
      actions.validateCustomerInfo(dispatch, customerInfo)
    }
  };
}

export default connect(mapStateToProps, undefined, mergeProps)(Delivery);
