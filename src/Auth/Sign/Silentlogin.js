import axios from "axios";

async function Silentlogin() {
  let retval;

  if (!axios.defaults.headers.common["AccessToken"]) {
    if (document.cookie.indexOf("login=") !== -1) {
      await axios
        .post("/api/auth/refreshToken")
        .then((response) => {
          const accesstoken = response.headers.accesstoken;
          axios.defaults.headers.common["AccessToken"] = `${accesstoken}`;

          retval = response.data.data;
        })
        .catch((error) => {
          if (error.code === "ERR_NETWORK") {
            alert("서버와 통신이 불가능한 상황입니다.");
          } else if (error.code === "ERR_BAD_REQUEST") {
            alert("유효하지 않은 이메일이거나 패스워드입니다.");
          }
          throw error.code;
        });
    } else {
      retval = 0;
    }
  } else {
    if (document.cookie.indexOf("login=") === -1) {
      axios.defaults.headers.common["AccessToken"] = "";
      retval = 0;
    } else {
      retval = 1;
    }
  }
  return retval;
}
export default Silentlogin;
