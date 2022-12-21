import * as React from "react";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Grid, Stack } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

import { useRef } from "react";

import CustomEditor from "./CustomEditor";

export default function BasicTextFields() {
  const editorRef = useRef();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const cancel = () => {
    navigate(-1);
  };

  function test(e) {
    e.target.disabled = true;
    e.preventDefault();

    axios
      .post("/api/board", {
        text: editorRef.current.editor.getData(),
        title: title,
      })
      .then((response) => {
        console.log(response);

        e.target.disabled = false;
        navigate("/board/" + response.data.data);
      })
      .catch((error) => {
        if (error.code === "ERR_NETWORK") {
          alert("서버와 통신이 불가능한 상황입니다.");
        } else if (error.code === "ERR_BAD_REQUEST") {
          if (error.response.data["errors"]) {
            let errorMessage = "";

            for (
              let index = 0;
              index < error.response.data["errors"].length;
              index++
            ) {
              errorMessage +=
                error.response.data["errors"][index].reason + "\n";
            }

            alert(errorMessage);
          } else {
            alert(error.response.data["message"]);
          }
          if (error.response.data.message === "Relogin")
            navigate("/signin", { state: { from: pathname } });
        }
        e.target.disabled = false;
      });
  }

  return (
    <Stack sx={{ width: { xs: "95%", md: "75%" } }}>
      <form onSubmit={test}>
        <Stack spacing={3}>
          <TextField
            InputProps={{
              style: { borderRadius: 0 },
            }}
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused": {
                "& > fieldset": {
                  borderColor: "#084766",
                },
              },

              ".css-1sumxir-MuiFormLabel-root-MuiInputLabel-root.Mui-focused": {
                color: "#084766",
              },

              input: {
                borderBottom: "1px solid #ffffff",
              },
            }}
            fullWidth
            label="제목"
            variant="outlined"
            onInput={(e) => setTitle(e.target.value)}
          />

          <CustomEditor editorRef={editorRef}></CustomEditor>

          <Grid container justifyContent="flex-end">
            <Button onClick={test}>작성완료</Button>
            <Button onClick={cancel}>취소</Button>
          </Grid>
        </Stack>
      </form>
    </Stack>
  );
}
