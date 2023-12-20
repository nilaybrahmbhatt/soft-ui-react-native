import {StyleSheet} from 'react-native';
import {Color, Constants} from "@common";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },

  list: {
    flex: 1
  },
  couponView: {
    height: 100,
    backgroundColor: "#F6F7F9"
  },
  couponContent: {
    flex: 1,
    margin: 10,
    backgroundColor: "white",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  inputCoupon: {
    marginLeft: 20,
    marginRight: 10,
    flex: 1,
    alignItems: "center"
  },
  btnEnter: {
    backgroundColor: "#ffc107",
    height: 40,
    width: 80,
    borderRadius: 20,
    marginRight: 20
  },
  btnEnterText: {
    fontWeight: "bold"
  },

  hiddenRow: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "flex-end",
    justifyContent: "center"
  },
  iconsBack: {
    tintColor: '#CCCCCC',
    width: 26,
    marginLeft: 20,
  }
});
