import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";

import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import MenuIcon from "@mui/icons-material/Menu";

import axios from "axios";
import { useState } from "react";
import BasicCard3 from "./ReplyCard";
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
export default function CommentCard(props) {
  const {
    id,
    boardId,

    userId,
  } = props;

  const { isLogin, user } = useSelector((store) => store);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const [createTime, setCreateTime] = useState(props.createTime);

  const [text, setText] = useState(props.text);
  const [userProfileImage, setUserProfileImage] = useState(
    props.userProfileImage
  );

  const viewRef = React.useRef();
  const [username, setUsername] = useState(props.username);
  const [replies, setReplies] = useState(props.replies);
  const [updateText, setUpdateText] = useState(text);
  const [isAddReply, setIsAddReply] = useState(false);
  const [replyText, setReplyText] = useState();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu1 = () => {
    setAnchorElUser(null);
  };

  const handleCloseUserMenu2 = (handler) => {
    handler();
    setAnchorElUser(null);
  };

  const updateCancel = () => {
    setIsUpdate(false);
    setUpdateText(text);
  };

  React.useEffect(() => {
    if (props.scrollView) {
      if (props.scrollView["flag"] == true) {
        viewRef.current.scrollIntoView({ block: "center" });
        props.scrollView["flag"] = false;
      }
    }
  });

  const updateComment = () => {
    axios
      .put("/api/board/" + boardId + "/comment/" + id, {
        text: updateText,
      })
      .then((res) => {
        setReplies(res.data.data.replies);
        setText(res.data.data.text);
        setUsername(res.data.data.username);
        setUserProfileImage(res.data.data.userProfileImage);
        setCreateTime(res.data.data.createDate);
        setIsUpdate(false);
      })

      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  const deleteComment = () => {
    if (window.confirm("댓글을 삭제하겠습니까?")) {
      axios
        .delete("/api/board/" + boardId + "/comment/" + id)

        .then((res) => {
          props.setComments(
            props.comments.filter((comment) => {
              return comment.id !== id;
            })
          );
        })

        .catch((error) => {
          console.log(error);
        });
    }
  };

  const addReply = (
    username,
    userId,
    replyText,
    setIsAddReply,
    setReplyText
  ) => {
    axios
      .post("/api/board/" + boardId + "/comment/" + id + "/reply/", {
        toUsername: username,
        toUserId: userId,
        text: replyText,
      })
      .then((res) => {
        setIsAddReply(false);
        setReplyText("");

        let temp = [...replies, res.data.data];

        let temp2 = temp.map((reply) => (
          <BasicCard3
            key={reply.id}
            id={reply.id}
            commentId={id}
            boardId={boardId}
            username={reply.username}
            userId={reply.userId}
            createTime={reply.createDate}
            text={reply.text}
            toUsername={reply.toUsername}
            toUserId={reply.toUserId}
            userProfileImage={reply.userProfileImage}
          ></BasicCard3>
        ));
        temp2[temp2.length - 1] = (
          <BasicCard3
            key={temp[temp.length - 1].id}
            id={temp[temp.length - 1].id}
            commentId={id}
            boardId={boardId}
            username={temp[temp.length - 1].username}
            userId={temp[temp.length - 1].userId}
            createTime={temp[temp.length - 1].createDate}
            text={temp[temp.length - 1].text}
            toUsername={temp[temp.length - 1].toUsername}
            toUserId={temp[temp.length - 1].toUserId}
            userProfileImage={temp[temp.length - 1].userProfileImage}
            scrollView={{ flag: true }}
          ></BasicCard3>
        );

        setReplies(temp);
        setRepliesJsx(temp2);
      })

      .catch((error) => {
        console.log(error);
      });
  };

  const [repliesJsx, setRepliesJsx] = useState(
    replies.map((reply) => (
      <BasicCard3
        key={reply.id}
        id={reply.id}
        commentId={id}
        boardId={boardId}
        username={reply.username}
        userId={reply.userId}
        createTime={reply.createDate}
        text={reply.text}
        toUsername={reply.toUsername}
        toUserId={reply.toUserId}
        userProfileImage={reply.userProfileImage}
      ></BasicCard3>
    ))
  );

  const comment_menu_settings = [
    {
      name: "댓글수정",
      handler: () => {
        setIsUpdate(true);
      },
    },
    {
      name: "댓글삭제",
      handler: () => {
        deleteComment();
      },
    },
  ];

  const [isUpdate, setIsUpdate] = React.useState(false);

  return (
    <div>
      <Card
        ref={viewRef}
        sx={{
          border: "1px solid rgba(0, 0, 0, 0.3)",
          display: "flex",
          flexDirection: "column",
          minWidth: 100,
          minHeight: 50,
          bgcolor: "#F7FBFD",
        }}
        variant={"outlined"}
      >
        <CardContent sx={{ py: 0 }}>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ my: 2 }}>
              <Avatar
                sx={{ width: 50, height: 50 }}
                variant="rounded"
                src={axios.defaults.baseURL + "/upload/" + userProfileImage}
              ></Avatar>
              <Typography sx={{ mt: 1 }}>{username}</Typography>
              <Typography inline="true" variant={"body2"}>
                {" "}
                {createTime.split(".")[0].replace("T", " ")}
              </Typography>
            </Box>

            {isUpdate ? (
              <TextField
                InputProps={{
                  style: { borderRadius: 0 },
                }}
                sx={{
                  flexGrow: 1,
                  flexBasis: "80%",
                  m: 2,
                  bgcolor: "white",
                  input: {
                    color: "#ffffff",
                  },

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
                variant="outlined"
                label="댓글수정"
                focused={true}
                fullWidth
                multiline
                minRows={8}
                defaultValue={text}
                onInput={(e) => {
                  setUpdateText(e.target.value);
                  e.target.scrollIntoView({ block: "center" });
                }}
              />
            ) : (
              <Card
                variant={"outlined"}
                sx={{
                  m: 2,

                  flexBasis: "80%",
                  minHeight: 200,
                  flexGrow: 1,
                }}
              >
                <CardContent>
                  <Typography sx={{ whiteSpace: "pre-line" }}>
                    {text}
                  </Typography>
                </CardContent>
              </Card>
            )}
            {isUpdate && (
              <Box>
                <IconButton onClick={updateCancel} sx={{ mt: 2, p: 0 }}>
                  <CloseIcon sx={{ color: "#084766" }}></CloseIcon>
                </IconButton>
              </Box>
            )}

            {!isUpdate && isLogin && user.id === userId && (
              <Box>
                <IconButton onClick={handleOpenUserMenu} sx={{ mt: 2, p: 0 }}>
                  <MenuIcon sx={{ color: "#084766" }}></MenuIcon>
                </IconButton>

                <Menu
                  sx={{ mt: "25px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu1}
                >
                  {comment_menu_settings.map((setting) => (
                    <MenuItem
                      key={setting.name}
                      onClick={() => {
                        handleCloseUserMenu2(setting.handler);
                      }}
                    >
                      <Typography textAlign="center">{setting.name}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            )}
          </Box>

          <Box sx={{ flexGrow: 0 }}></Box>

          {isUpdate ? (
            <Stack
              sx={{ mb: 2 }}
              direction="row"
              spacing={1}
              justifyContent="flex-end"
            >
              <Button
                variant="contained"
                sx={{
                  mr: 5,
                  bgcolor: "#084766",
                  color: "white",
                  ":hover": {
                    bgcolor: "#0B608A", // theme.palette.primary.main
                    color: "white",
                  },
                }}
                onClick={updateComment}
              >
                수정하기
              </Button>
            </Stack>
          ) : (
            isLogin && (
              <IconButton
                sx={{ mb: 1.5 }}
                onClick={() => {
                  setIsAddReply(!isAddReply);
                }}
              >
                <SubdirectoryArrowRightIcon
                  sx={{ color: "#084766" }}
                ></SubdirectoryArrowRightIcon>
              </IconButton>
            )
          )}
        </CardContent>

        <Box flexGrow={1} />
      </Card>

      {isAddReply && (
        <Stack spacing={1}>
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
              mt: 2,

              input: {
                color: "#ffffff",
                borderBottom: "1px solid #ffffff",
              },
            }}
            variant="outlined"
            label="대댓글작성"
            fullWidth
            multiline
            rows={3}
            onInput={(e) => {
              setReplyText(e.target.value);
              e.target.scrollIntoView({ block: "center" });
            }}
          />

          <Stack direction="row" justifyContent={"flex-end"} spacing={1}>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#084766",
                color: "white",
                ":hover": {
                  bgcolor: "#0B608A", // theme.palette.primary.main
                  color: "white",
                },
              }}
              onClick={() => {
                addReply(
                  username,
                  userId,
                  replyText,
                  setIsAddReply,
                  setReplyText
                );
              }}
            >
              대댓글등록
            </Button>
          </Stack>
        </Stack>
      )}
      {repliesJsx.map((jsx) =>
        React.cloneElement(jsx, {
          addReply: addReply,
          replies: replies,
          setReplies: setReplies,
          setRepliesJsx: setRepliesJsx,
        })
      )}
    </div>
  );
}
