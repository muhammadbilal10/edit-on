import { Box, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import InspireLogo from "../image/EditOnService/InspireLogo.png";
import { useState } from "react";

const Reviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const reviewsProfile = [
    {
      id: 1,
      name: "Abdullah Younus",
      profileImage: "https://d1puzd1182zmjc.cloudfront.net/h/TimonHartman.jpg",
      about:
        "EditON jobs are a great opportunity to develop my creative skills as I work with very diverse footage. I like the fact that I can give my clients a visually attractive edit of their own material.",
      location: "Barcelona, Spain",
    },
    {
      id: 2,
      name: "Ahmad Asif",
      profileImage: "https://d1puzd1182zmjc.cloudfront.net/h/TimonHartman.jpg",
      about:
        "EditON jobs are a great opportunity to develop my creative skills as I work with very diverse footage. I like the fact that I can give my clients a visually attractive edit of their own material.",
      location: "Barcelona, Spain",
    },
    {
      id: 3,
      name: "Rehmoz Ahmad",
      profileImage: "https://d1puzd1182zmjc.cloudfront.net/h/TimonHartman.jpg",
      about:
        "EditON jobs are a great opportunity to develop my creative skills as I work with very diverse footage. I like the fact that I can give my clients a visually attractive edit of their own material.",
      location: "Barcelona, Spain",
    },
  ];
  const handleNext = () => {
    console.log(`im in handle next${currentIndex}`);
    if (currentIndex < reviewsProfile.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "#fff",
        justifyContent: "space-evenly",
        alignItems: "center",
        pb: "50px",
      }}
    >
      <img
        height="30px"
        width="30px"
        onClick={handlePrev}
        src="data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%230099DB' viewBox='0 0 8 8'%3E%3Cpath d='M5.25 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z'/%3E%3C/svg%3E"
      />
      <Box>
        <Typography
          variant="h2"
          sx={{
            color: "#0099db",
            m: "16px 0px",
            textAlign: "center",
            fontFamily: "Noto Sans,sans-serif",
            fontSize: "26px",
          }}
        >
          What others say about us
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Avatar
            sx={{ height: "210px", width: "210px", mb: "16px" }}
            alt="User Avatar"
            src={reviewsProfile[currentIndex].profileImage}
            variant="circular"
          />
          <Typography
            sx={{
              color: "#3f474e",
              mb: "8px",
            }}
          >
            {reviewsProfile[currentIndex].name}
          </Typography>
          <Typography
            sx={{
              color: "#3f474e",
              fontFamily: "Noto Sans,sans-serif",
              fontSize: "16px",
              height: "96px",
              width: "370px",
            }}
          >
            {reviewsProfile[currentIndex].about}
          </Typography>
          <Typography
            sx={{
              color: "#6c757d",
              mt: "2px",
              fontFamily: "Noto Sans,sans-serif",
              fontSize: "16px",
              alignSelf: "center",
            }}
          >
            {reviewsProfile[currentIndex].location}
          </Typography>
        </Box>
      </Box>
      <img
        height="30px"
        width="30px"
        onClick={handleNext}
        src="data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%230099DB' viewBox='0 0 8 8'%3E%3Cpath d='M2.75 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z'/%3E%3C/svg%3E"
      />
    </Box>
  );
};

export default Reviews;
