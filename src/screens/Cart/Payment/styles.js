import {StyleSheet, Dimensions} from 'react-native';
var {width} = Dimensions.get('window');
import {Color, Constants} from "@common";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  paymentOption: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "center",

  },
  optionContainer: {
    width: width / 3,
    justifyContent: "center",
    alignItems: "center",
  },
  btnOption: {
    width: 80,
    height: 60
  },
  selectedBtnOption: {
    width: width / 3 - 30,
    height: width / 3 - 40,
    backgroundColor: 'rgba(206, 215, 221, 0.4)',
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 6
  },
  imgOption: {
    width: null,
    height: null,
    flex: 1,
    resizeMode: "contain"
  },
  message: {
    fontSize: 16,
    color: Color.Text,
    textAlign: "center",
    margin: 20,
    fontFamily: Constants.fontFamily
  },
  formCard: {
    marginTop: 10,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 10
  },
  btnNextContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  btnNext: {
    marginBottom: 20,
    backgroundColor: "#0091ea",
    height: 40,
    width: 200,
    borderRadius: 20,
  },
  btnNextText: {
    fontWeight: "bold"
  },
});
