import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Button} from '../../components';
import styles from './styles';
import {Languages, Constants, Images} from '../../common';
import * as Animatable from 'react-native-animatable';

export default class Buttons extends Component {
  render() {
    return (
      <View
        style={[
          styles.bottomView,
          this.props.isAbsolute && styles.floatView,
          Constants.RTL && {flexDirection: 'row-reverse'},
        ]}>
        <Button
          style={styles.btnBack}
          textStyle={styles.btnBackText}
          onPress={this.props.onPrevious}>
          <Text>Go Back</Text>
        </Button>

        {this.props.isLoading ? (
          <View style={styles.btnBuy}>
            <Animatable.Text
              style={styles.btnBuyText}
              animation="pulse"
              iterationCount="infinite">
              {Languages.Loading}
            </Animatable.Text>
          </View>
        ) : (
          <Button
            primary
            // text={
            //   this.props.nextText ? this.props.nextText : Languages.NextStep
            // }
            style={styles.btnBuy}
            textStyle={styles.btnBuyText}
            onPress={this.props.onNext}>
            <Text>Next</Text>
          </Button>
        )}
      </View>
    );
  }
}
