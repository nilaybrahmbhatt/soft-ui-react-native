import {StyleSheet} from 'react-native';
import {Color, Constants} from '@common';

export default StyleSheet.create({
  fill: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    elevation: 5,
  },
  indicator: {
    marginTop: 16,
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },

  bottomView: {
    height: 40,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#f3f7f9',
  },
  floatView: {
    width: Constants.Window.width,
    position: 'absolute',
    bottom: 0,
  },
  buttonContainer: {
    flex: 0.5,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnBuyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 8,
    height: 30,
  },
  btnBuy: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.BuyNowButton,
  },
  btnBuyText: {
    color: 'white',
    fontSize: 14,
    // fontFamily: Constants.fontHeader,
  },
  btnBack: {
    flex: 0.5,
    backgroundColor: 'rgba(206, 215, 221, 0.1)',
  },
  btnBackText: {
    color: Color.tabbarColor,
    fontSize: 14,
    fontWeight: 'bold',
    // fontFamily: Constants.fontHeader,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderColor: '#CED7DD',
  },
  label: {
    fontSize: 16,
    color: Color.Text,
    // fontFamily: Constants.fontHeader,
  },
  value: {
    fontSize: 16,
    color: Color.headerTintColor,
    // fontFamily: Constants.fontHeader,
  },

  contentEmpty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 70,
    height: 70,
    tintColor: '#B7C4CB',
  },
  title: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    width: 230,
    lineHeight: 40,
    opacity: 0.8,
    // fontFamily: Constants.fontHeader,
  },
  message: {
    fontSize: 14,
    textAlign: 'center',
    color: '#758692',
    width: Constants.Window.width,
    marginTop: 10,
    lineHeight: 25,
    fontFamily: Constants.fontFamily,
  },

  button: {
    height: 40,
    width: 160,
    borderRadius: 20,
    backgroundColor: Color.primary,
  },
  buttonText: {
    fontSize: 15,
    // fontFamily: Constants.fontHeader,
  },
  total: {
    fontSize: 16,
    marginLeft: 15,
    color: '#999',
  },
  checkoutModal: {
    paddingTop: 30,
    backgroundColor: '#fff',
  },
  iconZoom: {
    position: 'absolute',
    top: 4,
    right: 0,
    backgroundColor: 'rgba(255,255,255,1)',
    paddingTop: 4,
    paddingRight: 4,
    paddingBottom: 4,
    paddingLeft: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textClose: {
    color: '#666',
    fontWeight: '600',
    fontSize: 11,
    right: 8,
  },
  iconClose: {
    marginRight: 16,
    marginLeft: 8,
    marginTop: 2,
  },
});
