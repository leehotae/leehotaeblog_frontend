import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogout } from "./store";

function Logout() {
  const dispatcher = useDispatch();
  const navigate = useNavigate();

  axios
    .post("/api/auth/logout")
    .then((res) => {
      dispatcher(userLogout());
      navigate(-1);
    })
    .catch((error) => {
      if (error.code === "ERR_NETWORK") {
        alert("서버와 통신이 불가능한 상황입니다.");
      }
      throw error.code;
    });

  return <></>;
}

export default Logout;
