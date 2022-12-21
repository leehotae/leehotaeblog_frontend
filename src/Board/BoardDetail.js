import {
  Box,
  Button,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Silentlogin from "../Auth/Sign/Silentlogin";
import { useDispatch, useSelector } from "react-redux";
import { userLogin, userLogout } from "../Auth/Sign/store";
import CommentList from "./Comment/CommentList";

import BasicCard from "./Content/ContentCard";
function BoardDetail(props) {
  const params = useParams();
  const dispatcher = useDispatch();

  const id = params.id;
  const { isLogin } = useSelector((store) => store);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const [username, setUsername] = useState("");
  const [userProfileImage, setUserProfileImage] = useState(null);
  const [userId, setUserId] = useState("");
  const [createtime, setCreatetime] = useState("");
  const [views, setViews] = useState(0);
  const [scrollView, setScrollView] = useState({ flag: false });

  useEffect(() => {
    const init = async () => {
      await Silentlogin()
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

      await axios
        .get("/api/board/" + id)
        .then((res) => {
          console.log(res);

          setText(res.data.data.text);
          setTitle(res.data.data.title);

          setUsername(res.data.data.username);
          setUserId(res.data.data.userId);
          setCreatetime(
            res.data.data.createDate.split(".")[0].replace("T", " ")
          );
          setComments(res.data.data.comments);
          setUserProfileImage(
            axios.defaults.baseURL + "/upload/" + res.data.data.userProfileImage
          );
          setViews(res.data.data.views);
        })

        .catch((error) => {
          console.log(error);
        });
    };
    init();
  }, []);

  const addComment = (e) => {
    axios
      .post("/api/board/" + id + "/comment", { text: comment })
      .then((res) => {
        console.log(res);

        setComment("");
        setComments([...comments, res.data.data]);
        setScrollView({ flag: true });
      })

      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Stack alignItems={"center"} pb={10}>
        <Box
          sx={{
            width: { xs: "95%", md: "75%" },
          }}
        >
          <Typography
            component={"h3"}
            fontSize="2.5rem"
            sx={{ lineHeight: { xs: 2, md: 3 } }}
          >
            Board
          </Typography>
        </Box>

        <Stack sx={{ width: { xs: "95%", md: "75%" } }}>
          <BasicCard
            username={username}
            title={title}
            text={text}
            userProfileImage={userProfileImage}
            createTime={createtime}
            boardId={id}
            userId={userId}
            views={views}
          ></BasicCard>

          <CommentList
            comments={comments}
            scrollView={scrollView}
            boardId={id}
            setComments={setComments}
          ></CommentList>
          {isLogin && <Divider sx={{ my: 4, borderBottomWidth: 4 }} />}
          {isLogin && (
            <Stack spacing={1}>
              <TextField
                InputProps={{
                  style: { borderRadius: 0 },
                }}
                sx={{
                  input: {
                    color: "#ffffff",
                    borderBottom: "1px solid #ffffff",
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
                label="댓글작성"
                fullWidth
                multiline
                value={comment}
                rows={3}
                onInput={(e) => {
                  setComment(e.target.value);

                  e.target.scrollIntoView({ block: "center" });
                }}
              />
              <Grid container justifyContent={"flex-end"}>
                <Button
                  onClick={addComment}
                  variant="contained"
                  sx={{
                    bgcolor: "#084766",
                    color: "white",
                    ":hover": {
                      bgcolor: "#0B608A", // theme.palette.primary.main
                      color: "white",
                    },
                  }}
                >
                  댓글등록
                </Button>
              </Grid>
            </Stack>
          )}
        </Stack>
      </Stack>
    </>
  );
}

export default BoardDetail;
