import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar, Grid, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

export default function ContentCard(props) {
  console.log(props);

  const {
    username,
    title,
    text,
    userProfileImage,
    createTime,
    boardId,
    userId,
    views,
  } = props;

  const navigate = useNavigate();
  const { isLogin, user } = useSelector((store) => store);
  const updateBoard = () => {
    navigate("update", {
      state: {
        username: username,
        text: text,
        title: title,
        createtime: createTime,
        id: boardId,
      },
    });
  };

  const deleteBoard = () => {
    if (window.confirm("게시글을 삭제하겠습니까?")) {
      axios
        .delete("/api/board/" + boardId)
        .then((res) => {
          console.log(res);
          if (res.data.message === "글삭제성공") {
            navigate("/");
          }
        })

        .catch((error) => {
          console.log(error);
        });
    } else {
    }
  };

  return (
    <Card
      sx={{
        border: "1px solid rgba(0, 0, 0, 0.3)",
        display: "flex",
        flexDirection: "column",
        minWidth: 275,
        minHeight: 500,
        bgcolor: "#F6FBFE",
        color: "#193C4D",
      }}
      variant={"outlined"}
    >
      <CardContent sx={{ bgcolor: "#EEF6FA" }}>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
      </CardContent>
      <CardContent sx={{ py: 0 }}>
        <Box sx={{ display: "flex", my: 2 }}>
          <Avatar
            sx={{ width: 50, height: 50 }}
            variant="rounded"
            src={userProfileImage}
          ></Avatar>
          <Typography sx={{ ml: 1, mt: 2 }}>{username}</Typography>

          <Box flexGrow={1} />
          <Stack spacing={1}>
            <Typography inline="true" align={"right"} variant={"body2"}>
              {views} Views
            </Typography>
            <Typography inline="true" align={"right"} variant={"body2"}>
              {" "}
              {createTime}
            </Typography>
          </Stack>
        </Box>
        <Card
          sx={{
            border: "1px solid rgba(0, 0, 0, 0.3)",
            display: "flex",
            flexDirection: "column",
            minWidth: 275,
            minHeight: 500,
            bgcolor: "white",
          }}
          variant={"outlined"}
        >
          <CardContent>
            <div
              className="ck-content"
              dangerouslySetInnerHTML={{ __html: text }}
            ></div>
          </CardContent>
        </Card>
        <br />
      </CardContent>
      <Box flexGrow={1} />
      <Box sx={{ pb: 1, display: "flex" }}>
        <Box flexGrow={1} />

        {isLogin && userId === user.id && (
          <CardActions>
            <Button
              variant="contained"
              size="small"
              sx={{
                bgcolor: "#084766",
                color: "white",
                ":hover": {
                  bgcolor: "#0B608A", // theme.palette.primary.main
                  color: "white",
                },
              }}
              onClick={updateBoard}
            >
              수정하기
            </Button>
            <Button
              variant="contained"
              size="small"
              sx={{
                bgcolor: "#084766",
                color: "white",
                ":hover": {
                  bgcolor: "#0B608A", // theme.palette.primary.main
                  color: "white",
                },
              }}
              onClick={deleteBoard}
            >
              삭제하기
            </Button>
          </CardActions>
        )}
      </Box>
    </Card>
  );
}
