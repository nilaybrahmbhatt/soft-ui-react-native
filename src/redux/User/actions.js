import types from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default {
  login: (user, dispatch) => {
    return dispatch({type: types.LOGIN, user});
  },
  logout(dispatch) {
    AsyncStorage.removeItem('customerAccesstoken');
    return dispatch({type: types.LOGOUT});
  },
};
