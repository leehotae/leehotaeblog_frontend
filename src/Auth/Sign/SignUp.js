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

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";

export default function SignUp() {
  const navigate = useNavigate();
  const { isLogin } = useSelector((store) => store);

  const signUpFormSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (!(data.get("password") === data.get("password_confirmed"))) {
      alert("패스워드와 패스워드 확인이 서로 다릅니다.");
      event.target.reset();
      return;
    }

    const formText = {
      email: data.get("email"),
      username: data.get("username"),
      password: data.get("password"),
    };

    event.target.text = "회원가입중";
    event.target.disabled = true;

    axios
      .post("/api/auth/signup", formText)
      .then((res) => {
        console.log(res);
        if (
          res.data.message ===
          "이메일에 전송된 메일로 계정을 활성화해주세요.\n유효시간은 10분입니다."
        ) {
          alert(res.data.message);
          navigate("/signin");
        }
      })
      .catch((err) => {
        if (err.response.data) {
          if (err.response.data.message === "유효하지않은 입력요청입니다.") {
            let errorMessage = "";

            for (
              let index = 0;
              index < err.response.data.errors.length;
              index++
            ) {
              errorMessage += err.response.data.errors[index].reason + "\n";
            }

            alert(errorMessage);
          } else {
            alert(err.response.data.message);
          }
        } else {
          alert("서버와 통신이 불가능한 상황입니다");
        }
        event.target.text = "회원가입";
        event.target.disabled = false;
      });
  };

  useEffect(() => {
    if (isLogin) {
      navigate("/");
    }
  }, []);

  if (!isLogin) {
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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={signUpFormSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  sx={{
                    "& .MuiOutlinedInput-root.Mui-focused": {
                      "& > fieldset": {
                        borderColor: "#084766",
                      },
                    },

                    ".css-1sumxir-MuiFormLabel-root-MuiInputLabel-root.Mui-focused":
                      {
                        color: "#084766",
                      },
                  }}
                  autoComplete="email"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  sx={{
                    "& .MuiOutlinedInput-root.Mui-focused": {
                      "& > fieldset": {
                        borderColor: "#084766",
                      },
                    },

                    ".css-1sumxir-MuiFormLabel-root-MuiInputLabel-root.Mui-focused":
                      {
                        color: "#084766",
                      },
                  }}
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  sx={{
                    "& .MuiOutlinedInput-root.Mui-focused": {
                      "& > fieldset": {
                        borderColor: "#084766",
                      },
                    },

                    ".css-1sumxir-MuiFormLabel-root-MuiInputLabel-root.Mui-focused":
                      {
                        color: "#084766",
                      },
                  }}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  sx={{
                    "& .MuiOutlinedInput-root.Mui-focused": {
                      "& > fieldset": {
                        borderColor: "#084766",
                      },
                    },

                    ".css-1sumxir-MuiFormLabel-root-MuiInputLabel-root.Mui-focused":
                      {
                        color: "#084766",
                      },
                  }}
                  required
                  fullWidth
                  name="password_confirmed"
                  label="Password Confirmed"
                  type="password"
                  id="password_confirmed"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: "#084766",
                ":hover": {
                  bgcolor: "#0B608A",
                  color: "white",
                },
              }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2" sx={{ color: "#084766" }}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    );
  } else {
    return <></>;
  }
}
