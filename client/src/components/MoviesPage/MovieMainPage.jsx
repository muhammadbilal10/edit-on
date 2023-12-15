import { Box, Grid, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import MovieCardPage from "./MovieCardPage";
import axios from "axios";

export const MovieMainPage = () => {
  const [movieData, setMovieData] = useState([]);
  const [showMovies, setShowMovies] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    // Fetch data from the API
    axios
      .get(`${import.meta.env.VITE_NODE_API}usersVideos`)
      .then((response) => {
        // Filter out users with no videos
        const usersWithVideos = response.data.filter(
          (user) => user.videos.length > 0
        );
        setMovieData(usersWithVideos);
        setShowMovies(usersWithVideos);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleVedioListByName = (event) => {
    if (event.key === "Enter" && search != "") {
      const updateMoviesList = movieData.filter((movie) =>
        movie.videos.some((video) =>
          video.title.toLowerCase().includes(search.toLowerCase())
        )
      );
      setShowMovies(updateMoviesList);
    }
  };

  return (
    <Box sx={{ backgroundColor: "white", pt: 2.5 }}>
      <Typography gutterBottom textAlign="center" fontSize="24px" color="black">
        Creativity from EditON Freelancers
      </Typography>
      <Stack mt="30px" justifyContent="center" direction="row">
        <TextField
          label="Search"
          onChange={(event) => setSearch(event.target.value)}
          value={search}
          onKeyDown={handleVedioListByName}
          onBlur={() => setShowMovies(movieData)}
        />
      </Stack>
      <Grid sx={{ p: 6 }} container spacing={2}>
        {showMovies.map((userData, index) => (
          <Grid
            key={index}
            item
            xs={12}
            sm={4}
            ms={3}
            md={3}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <MovieCardPage cardDetails={userData} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
