import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useRef } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CustomEditor from "./CustomEditor";

function BoardUpdate({ route }) {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const editorRef = useRef();
  const cancel = () => {
    navigate(-1);
  };
  const update = (e) => {
    e.target.disabled = true;
    axios
      .put("/api/board/" + id, {
        text: editorRef.current.editor.getData(),
        title: title,
      })
      .then((response) => {
        console.log(response);

        e.target.disabled = false;
        navigate(-1);
      })
      .catch((error) => {
        if (error.code === "ERR_NETWORK") {
          alert("서버와 통신이 불가능한 상황입니다.");
        } else if (error.code === "ERR_BAD_REQUEST") {
          console.log(error.response.data.message === "Relogin");
          navigate("/signin", { state: { from: pathname } });
        }
        e.target.disabled = false;
      });
  };
  const { id, username, createtime } = location.state;

  const [title, setTitle] = useState(location.state["title"]);

  const text = location.state["text"];

  return (
    <Stack alignItems={"center"} pb={10}>
      <Box sx={{ width: { xs: "95%", md: "75%" } }}>
        <Typography
          sx={{
            marginY: "2%",
          }}
          variant="h3"
          align="center"
        >
          글 수 정 하 기
        </Typography>
      </Box>
      <Stack sx={{ width: { xs: "95%", md: "75%" } }}>
        <TextField
          InputProps={{
            style: { borderRadius: 0 },
          }}
          sx={{
            input: {
              borderBottom: "1px solid #ffffff",
            },
          }}
          fullWidth
          value={title}
          variant="outlined"
          multiline
          onInput={(e) => setTitle(e.target.value)}
        />

        <Stack alignItems={"flex-end"} spacing={1}>
          <div>{username}</div>
          <div>{createtime}</div>
        </Stack>

        <CustomEditor editorRef={editorRef} initvalue={text}></CustomEditor>

        <Stack direction="row" justifyContent="end" spacing={2}>
          <Button onClick={update}>글수정</Button>
          <Button onClick={cancel}>취소</Button>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default BoardUpdate;
