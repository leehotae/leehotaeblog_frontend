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
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

export default function ChangePasswordEmailForm(from) {
  const dispatcher = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
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

  const emailFormSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const formText = {
      email: data.get("email"),
    };

    event.target.disabled = true;
    axios
      .post("/api/auth/changePassword", formText)
      .then((response) => {
        alert("메일을 확인해주세요. 유효시간은 10분입니다.");
        navigate(rediretion);
      })
      .catch((error) => {
        if (error.code === "ERR_NETWORK") {
          alert("서버와 통신이 불가능한 상황입니다.");
        } else if (error.code === "ERR_BAD_REQUEST") {
          alert("유효하지 않은 이메일입니다.");
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
          Change Password
        </Typography>
        <Box
          component="form"
          onSubmit={emailFormSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
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
                bgcolor: "#0B608A", // theme.palette.primary.main
                color: "white",
              },
            }}
          >
            Change Password
          </Button>
          <Grid container>
            <Grid item xs={8.4}></Grid>
            <Grid item xs={1.8}>
              <Link href="/signup" variant="body2" color="#0B608A">
                Sign Up
              </Link>
            </Grid>
            <Grid item xs={1.8}>
              <Link href="/signin" variant="body2" color="#0B608A">
                Sign In
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
