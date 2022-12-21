import axios from "axios";

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const UPDATE = "UPDATE";

export const userLogin = (user) => {
  return {
    type: LOGIN,
    payload: user,
  };
};

export const userUpdate = (user) => {
  return {
    type: UPDATE,
    payload: user,
  };
};

export const userLogout = () => {
  document.cookie = "login=; expires=Thu, 01 Jan 1999 00:00:10 GMT;";

  if (axios.defaults.headers.common["AccessToken"]) {
    axios.defaults.headers.common["AccessToken"] = "";
  }

  return {
    type: LOGOUT,
  };
};

const initstate = {
  isLogin: false,
  user: {
    id: "",
    username: "",
    email: "",
    profileImage: "",
  },
};

const reducer = (state = initstate, action) => {
  switch (action.type) {
    case LOGIN:
      return { isLogin: true, user: action.payload };
    case LOGOUT:
      return {
        isLogin: false,
        user: {
          id: "",
          username: "",
          email: "",
        },
      };
    case UPDATE:
      return { isLogin: true, user: { ...state.user, ...action.payload } };
    default:
      return state;
  }
};

export default reducer;
