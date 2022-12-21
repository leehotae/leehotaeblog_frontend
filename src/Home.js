import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import Silentlogin from "./Auth/Sign/Silentlogin";
import { userLogin, userLogout } from "./Auth/Sign/store";

import BoardList from "./Board/BoardList";
export default function Home() {
  const dispatcher = useDispatch();

  const { isLogin } = useSelector((store) => store);
  useEffect(() => {
    Silentlogin()
      .then((result) => {
        console.log(result);

        if (!result) {
          if (isLogin) {
            dispatcher(userLogout());
          }
        } else if (result === 1) {
        } else {
          if (!isLogin) {
            dispatcher(userLogin(result));
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return <BoardList></BoardList>;
}
