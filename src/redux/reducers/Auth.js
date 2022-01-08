import {
  SEND_FORGET_PASSWORD_EMAIL,
  UPDATE_AUTH_USER,
  UPDATE_LOAD_USER,
  GET_PROJECT_FILTERS,
  UPDATE_AVATAR_USER,
  UPDATE_USER,
} from '../../@jumbo/constants/ActionTypes';

const INIT_STATE = {
  authUser: null,
  loadUser: false,
  send_forget_password_email: false,
  project: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case UPDATE_AUTH_USER: {
      return {
        ...state,
        authUser: action.payload,
        loadUser: true,
      };
    }
    case UPDATE_AVATAR_USER: {
      let newUsers = {
        ...state.authUser,
        avatar: action.payload,
      };
      return {
        ...state,
        authUser: newUsers,
      };
    }
    case UPDATE_USER: {
      let newUser = {
        ...state.authUser,
        name: action.payload.name,
        cmnd: action.payload.cmnd,
        phone: action.payload.phone,
        address: action.payload.address,
        nativeProvincial: action.payload.nativeProvincial,
      };
      localStorage.setItem('user', JSON.stringify(newUser));
      return {
        ...state,
        authUser: newUser,
      };
    }
    case UPDATE_LOAD_USER: {
      return {
        ...state,
        loadUser: action.payload,
      };
    }
    case SEND_FORGET_PASSWORD_EMAIL: {
      return {
        ...state,
        send_forget_password_email: action.payload,
      };
    }
    case GET_PROJECT_FILTERS: {
      return {
        ...state,
        project: action.payload,
      };
    }
    default:
      return state;
  }
};
