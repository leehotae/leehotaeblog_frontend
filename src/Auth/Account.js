import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Silentlogin from "./Sign/Silentlogin";
import { IconButton } from "@mui/material";
import { userLogin, userLogout, userUpdate } from "./Sign/store";

export default function Account() {
  const navigate = useNavigate();
  const { isLogin, user } = useSelector((store) => store);

  const dispatcher = useDispatch();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [initialusername, setInitialUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordconfirm, setPasswordConfirm] = useState("");

  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (
      !(
        password ||
        passwordconfirm ||
        !(username === initialusername) ||
        !(imageFile === null)
      )
    ) {
      window.location.reload();
    }

    if (!(data.get("password") === data.get("password_confirmed"))) {
      alert("입력한 두 비밀번호가 일치하지 않습니다.");
      window.location.reload();
      return;
    }
    if (password) {
      const frm = new FormData();

      const dto = {
        username: username,
        password: password,
      };

      frm.append("image", imageFile);

      frm.append(
        "dto",
        new Blob([JSON.stringify(dto)], { type: "application/json" })
      );

      axios
        .put("/api/auth/account", frm)
        .then((res) => {
          alert("회원정보 수정완료");
          window.location.reload();
        })

        .catch((error) => {
          console.log(error);
        });
    } else {
      const frm = new FormData();
      const dto = {
        username: username,
      };
      frm.append("image", imageFile);
      frm.append(
        "dto",
        new Blob([JSON.stringify(dto)], { type: "application/json" })
      );

      axios
        .put("/api/auth/account", frm)
        .then((res) => {
          alert("회원정보 수정완료");

          window.location.reload();
        })

        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    async function test() {
      await Silentlogin()
        .then((result) => {
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

      if (!isLogin) {
        navigate("/");
        return;
      }
      await axios
        .get("/api/auth/account")
        .then((res) => {
          setEmail(res.data.data.email);
          setUsername(res.data.data.username);
          setInitialUsername(res.data.data.username);
          setImage(
            axios.defaults.baseURL + "/upload/" + res.data.data.imageUrl
          );

          dispatcher(
            userUpdate({
              usernmae: res.data.data.username,
              profileImage:
                axios.defaults.baseURL + "/upload/" + res.data.data.imageUrl,
            })
          );
        })

        .catch((error) => {
          console.log(error);
        });
    }
    test();
  }, []);

  if (isLogin) {
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
          <IconButton component="label">
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={(event) => {
                if (event.target.files && event.target.files[0]) {
                  setImage(URL.createObjectURL(event.target.files[0]));
                  setImageFile(event.target.files[0]);
                }
              }}
            />
            <Avatar sx={{ m: 1, width: 100, height: 100 }} src={image}></Avatar>
          </IconButton>

          <Typography component="h1" variant="h5">
            Profile Image
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  InputProps={{
                    readOnly: true,
                  }}
                  value={email}
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
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  value={username}
                  onInput={(e) => setUsername(e.target.value)}
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
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  defaultValue="********"
                  onInput={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
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
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password_confirmed"
                  label="Password Confirmed"
                  type="password"
                  id="password_confirmed"
                  defaultValue="********"
                  onInput={(e) => setPasswordConfirm(e.target.value)}
                  autoComplete="new-password"
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
                  bgcolor: "#0B608A", // theme.palette.primary.main
                  color: "white",
                },
              }}
            >
              Change account information
            </Button>
          </Box>
        </Box>
      </Container>
    );
  } else {
    return <></>;
  }
}
