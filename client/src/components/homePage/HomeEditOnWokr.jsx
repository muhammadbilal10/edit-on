import { Box, Typography, Button } from "@mui/material";
import ReactPlayer from "react-player";

import React from "react";
const EditonWork = () => {
  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "#fff",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          m: "16px 0px",
          color: "#212529",
          fontFamily: "Noto Sans,sans-serif",
          fontSize: "26px",
        }}
      >
        Find out how EditON works
      </Typography>

      <ReactPlayer
        url="https://www.youtube.com/watch?v=jSNj9Egs6A8"
        height="405px"
        width="720px"
        controls={true}
      />

<Typography
        variant="contained"
        sx={{
          m: "20px 0px",
          fontSize: "20px",
          pl: "0px",
          pr: "0px",
          width: "400px",
          height: "47px",
          alignSelf: "center",
          textTransform: "capitalize",
        }}
      ></Typography>
    </Box>
  );
};

export default EditonWork;
