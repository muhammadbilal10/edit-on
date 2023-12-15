import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Avatar, CardActionArea, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getCreators } from "../Utils/data";

export default function MovieCardPage({ cardDetails }) {
  // Check if there are videos available for this user
  if (!cardDetails.videos || cardDetails.videos.length === 0) {
    return null; // Return null if no videos are available
  }

  const firstVideo = cardDetails.videos[0]; // Get the first video

  // State variable to track whether the user is hovering over the card
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  // Function to handle hover events
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const [creatorList, setCreatorList] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getCreators();
        setCreatorList(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <Card
      sx={{
        maxWidth: 400,
        borderRadius: "12px",
        border: "1px solid #ced4da",
        position: "relative",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CardMedia
        component="img"
        sx={{ height: 200, width: 393, "&:hover": { filter: "none" } }}
        image={firstVideo.thumbnail} // Use the thumbnail of the first video
        alt={firstVideo.title} // Use the title of the first video as alt text
      />
      {isHovered && (
        // Show video on hover and play it
        <video
          src={firstVideo.video}
          controls
          width="100%"
          height="auto"
          autoPlay
          loop
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1,
          }}
        />
      )}
      <CardContent
        style={{
          position: "relative",
          zIndex: 2,
        }}
      >
        <Typography gutterBottom variant="h6">
          {firstVideo.title} {/* Use the title of the first video */}
        </Typography>
        <CardActionArea
          onClick={() => {
            const creator = creatorList.filter(
              (creator) => creator._id === cardDetails.id
            );
            // alert(JSON.stringify(cardDetails));
            // alert(JSON.stringify(creatorList));
            // alert(JSON.stringify(creator));
            navigate("/creatorProfile", { state: creator[0] });
          }}
        >
          <Stack direction="row" spacing={1} p={1} alignItems="center">
            <Avatar
              alt={cardDetails.name}
              variant="square"
              src="https://i.postimg.cc/zXb9ntkn/pngegg-1.png"
              sx={{ borderRadius: "0px 7px", height: 60, width: 60 }}
            />
            <Typography>by {cardDetails.name}</Typography>
          </Stack>
        </CardActionArea>
      </CardContent>
    </Card>
  );
}
