import { Box, Container, Paper, Typography } from "@mui/material";
import Copyright from "./Copyright";

function Footer() {
  return (
    <>
      <Paper
        sx={{
          width: "100%",
          position: "fixed",
          bottom: 0,
        }}
        component="footer"
        square
        variant="outlined"
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              flexGrow: 1,
              justifyContent: "center",
              display: "flex",
              my: 1,
            }}
          ></Box>

          <Box
            sx={{
              flexGrow: 1,
              justifyContent: "center",
              display: "flex",
              mb: 2,
            }}
          >
            <Typography variant="caption" color="initial">
              <Copyright></Copyright>
            </Typography>
          </Box>
        </Container>
      </Paper>
    </>
  );
}
export default Footer;
