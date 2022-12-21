import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { Link } from "react-router-dom";
import { Box, useMediaQuery } from "@mui/material";

export default function BoardTable(props) {
  const matches = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const rows = props.rows;
  return matches ? (
    <TableContainer sx={{ display: "flex", justifyContent: "center" }}>
      <Table sx={{ width: { md: "75%" } }} aria-label="simple table">
        <TableHead sx={{ bgcolor: "#EEF6FA" }}>
          <TableRow>
            <TableCell
              align="justify"
              sx={{ width: { md: "5%" }, p: 0, textAlign: "center" }}
            >
              번호
            </TableCell>
            <TableCell
              align="justify"
              sx={{ width: { md: "66%" }, pl: { md: 10 } }}
            >
              제목
            </TableCell>

            <TableCell align="justify" sx={{ width: { md: "10%" } }}>
              작성자
            </TableCell>
            <TableCell align="justify" sx={{ width: " 10%" }}>
              작성일
            </TableCell>
            <TableCell
              align="justify"
              sx={{ width: " 7%", p: 0, textAlign: "center" }}
            >
              조회수
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell sx={{ textAlign: "center", p: 0 }}>{row.id}</TableCell>
              <TableCell align="justify" sx={{ pl: 10 }}>
                <Link
                  to={`/board/${row.id}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  {" "}
                  {row.title} [
                  {row.comments.length +
                    row.comments.reduce((acc, cur, i) => {
                      return acc + cur.replies.length;
                    }, 0)}
                  ]
                </Link>
              </TableCell>
              <TableCell align="justify">{row.username}</TableCell>
              <TableCell align="justify">
                {row.createDate.split("T")[0]}
              </TableCell>
              <TableCell align="justify" sx={{ textAlign: "center", p: 0 }}>
                {row.views}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <TableContainer sx={{ display: "flex", justifyContent: "center" }}>
      <Table sx={{ width: "95%" }} aria-label="simple table">
        <TableHead sx={{ bgcolor: "#EEF6FA" }}>
          <TableRow>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>
                <Link
                  to={`/board/${row.id}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <Box sx={{ display: "flex" }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      {row.title} [
                      {row.comments.length +
                        row.comments.reduce((acc, cur, i) => {
                          return acc + cur.replies.length;
                        }, 0)}
                      ]
                    </Box>
                    <Box flexGrow={1}></Box>

                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Box>{row.username}</Box>
                      <Box>{row.createDate.split("T")[0]}</Box>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        ml: 3,
                      }}
                    >
                      {row.views}
                    </Box>
                  </Box>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
