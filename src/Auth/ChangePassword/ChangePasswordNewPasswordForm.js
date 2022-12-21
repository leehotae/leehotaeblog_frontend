import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import Silentlogin from "../Sign/Silentlogin";
import { userLogin, userLogout } from "../Sign/store";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

export default function ChangePasswordNewPasswordForm(from) {
  const dispatcher = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const token = params.token;
  let rediretion = "/";

  if (location.state) {
    if (location.state.from) {
      rediretion = -1;
    }
  }
  const { isLogin } = useSelector((store) => store);

  useEffect(() => {
    Silentlogin()
      .then((result) => {
        if (result === 0) {
          if (isLogin) {
            dispatcher(userLogout());
          }
        } else if (result === 1) {
          navigate(rediretion);
        } else {
          dispatcher(userLogin(result));
          navigate(rediretion);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const newPasswordFormSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (!(data.get("password") === data.get("confirmed_password"))) {
      alert("입력한 두 비밀번호가 일치하지 않습니다.");
      event.currentTarget.reset();
      return;
    }
    const formText = {
      password: data.get("password"),
      token: token,
    };
    event.target.disabled = true;
    axios
      .put("/api/auth/changePassword", formText)
      .then((response) => {
        alert("비밀번호가 변경 되었습니다.");
        navigate(rediretion);
      })
      .catch((error) => {
        console.log(error);
        if (error.code === "ERR_NETWORK") {
          alert("서버와 통신이 불가능한 상황입니다.");
        } else if (error.code === "ERR_BAD_REQUEST") {
          alert(error.response.data.errors[0].reason);
        } else {
          alert("잘못된 접근");
          navigate(rediretion);
        }

        event.target.disabled = false;
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "#084766" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Change Password Form
        </Typography>
        <Box
          component="form"
          onSubmit={newPasswordFormSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            type="password"
            name="password"
            autoComplete="password"
            autoFocus
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused": {
                "& > fieldset": {
                  borderColor: "#084766",
                },
              },

              ".css-1sumxir-MuiFormLabel-root-MuiInputLabel-root.Mui-focused": {
                color: "#084766",
              },
            }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="confirmed_password"
            label="Confirmed Password"
            name="confirmed_password"
            type="password"
            autoComplete="confirmed_password"
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused": {
                "& > fieldset": {
                  borderColor: "#084766",
                },
              },

              ".css-1sumxir-MuiFormLabel-root-MuiInputLabel-root.Mui-focused": {
                color: "#084766",
              },
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              bgcolor: "#084766",
              color: "white",
              ":hover": {
                bgcolor: "#0B608A",
                color: "white",
              },
            }}
          >
            Change Password
          </Button>
          <Grid container>
            <Grid item xs={8.4}></Grid>
            <Grid item xs={1.8}>
              <Link href="/signup" color="#0B608A" variant="body2">
                Sign Up
              </Link>
            </Grid>
            <Grid item xs={1.8}>
              <Link href="/signin" color="#0B608A" variant="body2">
                Sign In
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
