import { Button, Box, Typography } from "@mui/material";
import AnimationLogo from "../image/Multimedia/AnimationLogo.png";
import VideoEditingLogo from "../image/Multimedia/VideoEditingLogo.png";
import VideoProductionLogo from "../image/Multimedia/VideoProductionLogo.png";
import CameraWorkLogo from "../image/Multimedia/CameraWorkLogo.png";

const Manu = () => {
  const multiMediaContent = [
    { id: 1, logo: VideoEditingLogo, text: "Video Editing" },
    { id: 2, logo: AnimationLogo, text: "Animation" },
    { id: 3, logo: CameraWorkLogo, text: "Camera Work" },
    { id: 4, logo: VideoProductionLogo, text: "Video Production" },
  ];
  return (
    <Box>
      <Box
        component="span"
        sx={{
          p: "0px 15px",
          border: "1px dashed grey",
          backgroundColor: "#0099db",
          width: "100%",
          display: "inline-block",
        }}
      >
        <Typography
          sx={{
            m: "16px 0px",
            textAlign: "center",
            p: "0px 10px",
            fontSize: "26px",
          }}
        >
          Decide your own budget
        </Typography>
        <Typography
          sx={{
            p: "0px 12px 16px",
            m: "16px 0px",
            textAlign: "center",
            fontSize: "18px",
          }}
        >
          Receive offers from our movie makers
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
          {multiMediaContent.map((mulCont) => (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                p: "0px 12px",
                mb: "12px",
                alignItems: "center",
              }}
              key={mulCont.id}
            >
              <img src={mulCont.logo} height="180px" width="180px" />
              <Typography sx={{ pt: "8px", mb: "8px" }}>
                {mulCont.text}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Manu;
