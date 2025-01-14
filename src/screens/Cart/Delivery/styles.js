import {StyleSheet, Dimensions, Platform} from 'react-native';
var {width, height} = Dimensions.get("window")
const vw = width / 100;
const vh = height / 100;
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  deliveryCart: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20
  },
  form: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  input: {
    alignItems: "center",
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 10,
    height: vh * 7,
  },
  firstInput: {
    alignItems: "center",
    position: "absolute",
    top: Platform.OS === 'ios' ? -20 : 10,
    right: 20,
    left: 20,
  },
  inputAndroid: {
    width: width - 50,
    height: vh * 7,
    paddingLeft: 10,
    marginTop: 10,
    position: 'relative'
  },
  lastInput: {
    alignItems: "center",
    position: "absolute",
    bottom: Platform.OS === 'ios' ? -20 : 10,
    right: 20,
    left: 20,
  },
  btnNextContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 30
  },
  btnNext: {
    backgroundColor: "#0091ea",
    height: 40,
    width: 200,
    borderRadius: 20,
  },
  btnNextText: {
    fontWeight: "bold"
  },
  picker: {
    width: width - 80
  },
  formAddress: {
    borderColor: '#d4dce1',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
    height: 200,
    justifyContent: "center",
    marginTop: 60,
    marginBottom: 40,
  },
});
