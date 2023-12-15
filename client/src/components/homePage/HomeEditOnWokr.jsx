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
        url="https://www.youtube.com/watch?v=T8LdferdIPA"
        height="405px"
        width="720px"
        controls={true}
      />

      <Button
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
      >
        More on how EditON works
      </Button>
    </Box>
  );
};

export default EditonWork;
