import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import BoardTable from "./BoardTable";
import Paging from "./Paging/Paging";
import CreateIcon from "@mui/icons-material/Create";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
function BoardList() {
  const navigate = useNavigate();

  const [searchTitle, setSearchTitle] = useState("");
  const [searchTitleText, setSearchTitleText] = useState("");

  const [rows, setRows] = useState([]);
  const [page, setPage] = useState({ page: 1, count: 0 });

  const { isLogin, user } = useSelector((store) => store);

  useEffect(() => {
    if (!(searchTitle === "")) {
      axios
        .get("/api/board/?title=" + searchTitle + "&page=0")
        .then((res) => {
          console.log(res);
          if (res.data.data) {
            setRows(res.data.data.content);
            setPage({
              ...page,
              page: 1,
              count: res.data.data.totalElements,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });

      return;
    }

    axios
      .get("/api/board?page=0")
      .then((res) => {
        console.log(res);
        if (res.data.data) {
          setRows(res.data.data.content);
          setPage({
            ...page,
            page: 1,
            count: res.data.data.totalElements,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchTitle]);

  function paging(val) {
    if (!(searchTitle === "")) {
      axios
        .get(
          "/api/board?title=" + searchTitle + "&page=" + (val - 1).toString()
        )
        .then((res) => {
          console.log(res);
          if (res.data.data) {
            setRows(res.data.data.content);
            setPage({
              ...page,
              page: val,
              count: res.data.data.totalElements,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });

      return;
    }

    axios
      .get("/api/board?page=" + (val - 1).toString())
      .then((res) => {
        console.log(res);
        if (res.data.data) {
          setRows(res.data.data.content);
          setPage({
            ...page,
            page: val,
            count: res.data.data.totalElements,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Stack alignItems={"center"} pb={10}>
      <Box sx={{ width: { xs: "95%", md: "75%" }, display: "flex" }}>
        <Typography component={"h3"} fontSize="2.5rem" lineHeight={3}>
          Board
        </Typography>

        <Box sx={{ flexGrow: 1 }}></Box>
        <Box
          sx={{
            width: { xs: "35%", md: "15%" },

            pt: 7,

            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <TextField
            label="제목으로 찾기"
            variant="standard"
            onChange={(e) => {
              setSearchTitleText(e.target.value);
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={(e) => {
                      setSearchTitle(searchTitleText);
                    }}
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>

      <BoardTable rows={rows}></BoardTable>
      <Box
        sx={{
          width: { xs: "95%", md: "75%" },
          display: "flex",
          justifyContent: "space-between",
          mt: 3,
        }}
      >
        <Box></Box>
        <Paging
          page={Number(page["page"])}
          count={Number(page["count"])}
          setPage={paging}
        ></Paging>

        {isLogin && (
          <Button
            sx={{ color: "text.primary" }}
            onClick={() => {
              navigate("/write");
            }}
          >
            <CreateIcon fontSize="large"></CreateIcon>
          </Button>
        )}

        {!isLogin && <Box></Box>}
      </Box>
    </Stack>
  );
}

export default BoardList;
