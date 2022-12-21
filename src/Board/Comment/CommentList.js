import * as React from "react";

import Divider from "@mui/material/Divider";

import Typography from "@mui/material/Typography";
import { Box, Stack } from "@mui/material";

import CommentCard from "./CommentCard";

export default function CommentList(props) {
  const comments = props.comments;
  const commentsJsx = comments.map((item) => (
    <CommentCard
      key={item.id}
      id={item.id}
      boardId={props.boardId}
      username={item.username}
      userId={item.userId}
      createTime={item.createDate}
      text={item.text}
      replies={item.replies}
      setComments={props.setComments}
      comments={props.comments}
      userProfileImage={item.userProfileImage}
    ></CommentCard>
  ));

  if (props.scrollView) {
    if (props.scrollView["flag"] == true) {
      commentsJsx[commentsJsx.length - 1] = React.cloneElement(
        commentsJsx[commentsJsx.length - 1],
        { scrollView: { flag: true } }
      );
      props.scrollView["flag"] = false;
    }
  }

  if (comments.length > 0)
    return (
      <>
        <Divider sx={{ mt: 3, borderBottomWidth: 4 }} />

        <Stack>
          <Box>
            <Typography fontSize="1.5rem" lineHeight={2.5}>
              Comment
            </Typography>
          </Box>
        </Stack>
        <Stack spacing={2}>{commentsJsx}</Stack>
      </>
    );
}
