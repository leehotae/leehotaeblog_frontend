import { Route, Routes } from "react-router-dom";

import Home from "./Home";

import Logout from "./Auth/Sign/Logout";
import { useDispatch } from "react-redux";
import axios from "axios";
import { userLogout } from "./Auth/Sign/store";
import SignIn from "./Auth/Sign/SignIn";
import SignUp from "./Auth/Sign/SignUp";
import BoardAppBar from "./Layout/CustomAppBar";
import Footer from "./Layout/Footer";

import BoardDetail from "./Board/BoardDetail";
import BoardUpdate from "./Board/WriteAndUpdate/BoardUpdate.js";
import ChangePasswordEmailForm from "./Auth/ChangePassword/ChangePasswordEmailForm";
import ChangePasswordNewPasswordForm from "./Auth/ChangePassword/ChangePasswordNewPasswordForm";
import Account from "./Auth/Account";

import BoardWrite from "./Board/WriteAndUpdate/BoardWrite";

function App() {
  const dispatch = useDispatch();
  axios.interceptors.request.use((res) => {
    return res;
  });
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      console.log(error);
      const {
        config,
        response: { status },
      } = error;

      if (status === 401) {
        if (error.response.data.message === "ExpiredTokenError") {
          const originalRequest = config;

          // token refresh 요청
          const response = await axios.post(
            `/api/auth/refreshToken` // token refresh api
          );

          const accesstoken = response.headers.accesstoken;
          axios.defaults.headers.common["AccessToken"] = `${accesstoken}`;

          originalRequest.headers["AccessToken"] = `${accesstoken}`;
          return axios(originalRequest);
        } else {
          dispatch(userLogout());
          window.location.href = "/signin";
        }
      }

      return Promise.reject(error);
    }
  );

  return (
    <>
      <BoardAppBar></BoardAppBar>
      <Routes>
        <Route exact path="/" element={<Home></Home>} />
        <Route exact path="/home" element={<Home></Home>} />
        <Route exact path="board" element={<Home></Home>} />
        <Route exact path="signup" element={<SignUp></SignUp>} />
        <Route exact path="signin" element={<SignIn></SignIn>}></Route>
        <Route exact path="logout" element={<Logout></Logout>}></Route>
        <Route
          exact
          path="changepassword"
          element={<ChangePasswordEmailForm></ChangePasswordEmailForm>}
        ></Route>
        <Route exact path="write" element={<BoardWrite></BoardWrite>}></Route>
        <Route exact path="account" element={<Account></Account>}></Route>

        <Route
          path="/changepassword/:token"
          element={
            <ChangePasswordNewPasswordForm></ChangePasswordNewPasswordForm>
          }
        ></Route>
        <Route path="/board/:id" element={<BoardDetail></BoardDetail>}></Route>
        <Route
          path="/board/:id/update"
          element={<BoardUpdate></BoardUpdate>}
        ></Route>
      </Routes>
      <Footer></Footer>
    </>
  );
}

export default App;
