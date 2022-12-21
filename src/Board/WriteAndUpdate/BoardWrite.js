import { Box, Stack, Typography } from "@mui/material";
import BoardWriteFields from "./BoardWriteFields";

function BoardWrite() {
  return (
    <Stack alignItems={"center"} pb={10}>
      {" "}
      <Box sx={{ width: { xs: "95%", md: "75%" } }}>
        <Typography component={"h3"} fontSize="2.5rem" lineHeight={3}>
          게시글작성
        </Typography>
      </Box>
      <BoardWriteFields></BoardWriteFields>
    </Stack>
  );
}

export default BoardWrite;
