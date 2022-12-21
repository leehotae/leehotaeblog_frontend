import { Typography } from "@mui/material";

function Copyright() {
  return (
    <Typography variant="footer1" color="text.secondary" align="center">
      {"Copyright © "}
      <strong style={{ text_decoration: "underline" }}>
        Lee Hotae Website
      </strong>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default Copyright;
