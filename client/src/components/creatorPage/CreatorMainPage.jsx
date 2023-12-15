import {
  Stack,
  Box,
  Grid,
  Typography,
  Autocomplete,
  TextField,
} from "@mui/material";
import CreatorPageCard from "./CreatorPageCard";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { getCreators } from "../Utils/data";

const CreatorMainPage = () => {
  const [CreatorList, setCreatorList] = useState([]); // State to store movie data
  const [showCreator, setShowCreator] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Fetch data from your backend API when the component mounts
    // axios
    //   .get(`${import.meta.env.VITE_NODE_API}getCreators`)
    //   .then((response) => {
    //     setCreatorList(response.data);
    //     setShowCreator(response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching data:", error);
    //   });

    async function fetchData() {
      try {
        const data = await getCreators();
        setCreatorList(data);
        setShowCreator(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []); // Empty dependency array ensures this runs once on mount

  const handleCreatorListbyCountry = (event, value) => {
    if (value != null) {
      const updatedCreatorList = CreatorList.filter(
        (creator) => creator.country == value
      );
      setShowCreator(updatedCreatorList);
      // alert(JSON.stringify(updatedCreatorList));
    } else {
      setShowCreator(CreatorList);
    }
  };

  const handleCreatorListByName = (event) => {
    if (event.key === "Enter" && search != null) {
      const updatedCreatorList = CreatorList.filter((creator) =>
        creator.name.includes(search)
      );
      setShowCreator(updatedCreatorList);
    }
  };
  return (
    <Box sx={{ backgroundColor: "#fff", pt: "20px" }}>
      <Typography
        fontSize={{ md: "40px", xs: "24px", sm: "32px" }}
        gutterBottom
        variant="h3"
        color="#212529"
        textAlign="center"
      >
        Add creators to your exclusive list with
      </Typography>

      <Stack
        elevation={3}
        p={2}
        alignItems="center"
        direction={{ xs: "column", md: "row", lg: "row" }}
        spacing={2}
      >
        <Autocomplete
          fullWidth
          options={CreatorList.map((option) => option.country)}
          renderInput={(params) => (
            <TextField {...params} label="All countries" />
          )}
          onChange={handleCreatorListbyCountry}
        />
        <Autocomplete
          fullWidth
          options={CreatorList.map((option) => option.language)}
          renderInput={(params) => (
            <TextField {...params} label="All languages" />
          )}
        />

        <TextField
          label="Search"
          fullWidth
          onChange={(event) => setSearch(event.target.value)}
          value={search}
          onKeyDown={handleCreatorListByName}
          onBlur={() => setShowCreator(CreatorList)}
        />
        {/* <Autocomplete
          fullWidth
          options={CreatorList.map((option) => option.name)}
          renderInput={(params) => <TextField {...params} label="Search" />}
          onChange={handleCreatorListByName}
        /> */}
      </Stack>

      <Grid sx={{ backgroundColor: "#fff", p: 4 }} container spacing={2}>
        {showCreator.map((cardDetails, index) => (
          <Grid
            key={index}
            item
            xs={12}
            sm={4}
            ms={4}
            md={2.4}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CreatorPageCard cardDetails={cardDetails} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CreatorMainPage;
