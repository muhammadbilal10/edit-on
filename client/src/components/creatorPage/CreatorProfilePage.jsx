import CreatorProfile from "./CreatorProfile";
import { Grid, Stack, Typography, Card, CardContent, Box } from "@mui/material";
import ReactPlayer from "react-player";
import { useLocation } from "react-router-dom";
import axios from "axios";
import * as React from "react";
import { json } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

export const CreatorProfilePage = ({ status }) => {
  // const videos = [
  //   { id: 1, title: "Michael Lukes - Life In A Bubble (Official Video)" },
  //   { id: 2, title: "Michael Lukes - Life In A Bubble (Official Video)" },
  //   { id: 3, title: "Michael Lukes - Life In A Bubble (Official Video)" },
  //   { id: 4, title: "Michael Lukes - Life In A Bubble (Official Video)" },
  //   // { id: 5, title: "Michael Lukes - Life In A Bubble (Official Video)" },
  //   // { id: 6, title: "Michael Lukes - Life In A Bubble (Official Video)" },
  //   // { id: 7, title: "Michael Lukes - Life In A Bubble (Official Video)" },
  //   // { id: 8, title: "Michael Lukes - Life In A Bubble (Official Video)" },
  //   // { id: 9, title: "Michael Lukes - Life In A Bubble (Official Video)" },
  //   // { id: 10, title: "Michael Lukes - Life In A Bubble (Official Video)" },
  //   // { id: 11, title: "Michael Lukes - Life In A Bubble (Official Video)" },
  //   // { id: 12, title: "Michael Lukes - Life In A Bubble (Official Video)" },
  // ];
  const location = useLocation();
  const profileData = location.state;

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // Define the API endpoint URL
    const apiUrl = `${import.meta.env.VITE_NODE_API}api/${
      profileData._id
    }/videos`; // Replace 'someUserId' with the actual user ID you want to fetch

    // Make the GET request to your backend API
    axios
      .get(apiUrl)
      .then((response) => {
        setVideos(response.data.videos);
      })
      .catch((error) => {
        // setError(error);
      });
  }, []);

  // alert(JSON.stringify(videos));

  return (
    <Box>
      <Grid
        sx={{ backgroundColor: "#fff", mt: "0px" }}
        container
        spacing={4}
        direction="column"
        alignItems="center"
      >
        <Grid item>
          <CreatorProfile cardDetails={profileData} status={status} />
        </Grid>
        {videos.length != 0 && (
          <Grid item>
            <Card sx={{ borderRadius: "12px" }}>
              <ReactPlayer
                url={videos[0].video}
                height="405px"
                width="720px"
                controls={true}
              />

              <Stack>
                <Typography p={2} fontSize="18px">
                  {videos[0].title}
                </Typography>
              </Stack>
            </Card>
          </Grid>
        )}

        <Grid item>
          <Grid
            // sx={{ backgroundColor: "black" }}
            container
            spacing={1.5}
            justifyContent="center"
            p={2}
          >
            {videos.length > 1 &&
              videos.map(
                (video, index) =>
                  index != 0 && (
                    <Grid
                      pl={2}
                      key={index}
                      item
                      xs={12}
                      md={videos.length === 2 ? 12 : 4}
                      lg={videos.length === 2 ? 12 : 3}
                    >
                      <Card sx={{ borderRadius: "12px", maxWidth: "394px" }}>
                        <ReactPlayer
                          url={video.video}
                          height="220px"
                          width="392px"
                          controls={true}
                        />

                        <Stack>
                          <Typography p={2} fontSize="18px">
                            {video.title}
                          </Typography>
                        </Stack>
                      </Card>
                    </Grid>
                  )
              )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
