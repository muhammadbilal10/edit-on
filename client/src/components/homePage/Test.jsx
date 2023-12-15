import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
} from "@mui/material";

const Test = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    country: "",
    city: "",
    state: "",
    language: "",
  });

  const [selectedCities, setSelectedCities] = useState([]);

  const [formErrors, setFormErrors] = useState({
    firstName: "",
    country: "",
    city: "",
    state: "",
    language: "",
  });

  const validateForm = () => {
    let valid = true;
    const newFormErrors = { ...formErrors };

    // Validation checks
    if (!formData.firstName) {
      valid = false;
      newFormErrors.firstName = "First Name is required";
    }

    if (!formData.country) {
      valid = false;
      newFormErrors.country = "Please select your country";
    }

    if (!formData.state) {
      valid = false;
      newFormErrors.state = "Please select your state";
    }

    if (!formData.city) {
      valid = false;
      newFormErrors.city = "Please select your city";
    }

    if (!formData.language) {
      valid = false;
      newFormErrors.language = "Please select your language";
    }

    setFormErrors(newFormErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Your signup logic here
      console.log("Form is valid, submit the data:", formData);
    } else {
      console.log("Form contains errors. Please correct them.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" }); // Clear the error when user starts typing
    // alert(JSON.stringify(formData));
  };

  const languages = ["English", "Urdu", "German", "Hindi"];
  const countries = [
    {
      value: "Pakistan",
      label: "PK",
      cities: ["Sargodha", "Faislabad", "Lahore", "Islamabad"],
      state: ["Punjab", "Sindh", "Balochistan"],
    },
    {
      value: "India",
      label: "IND",
      cities: ["Sargodha", "Faislabad", "Lahore", "Islamabad"],
      state: ["Punjab", "Sindh", "Balochistan"],
    },
    {
      value: "United Kingdom",
      label: "UK",
      cities: ["Sargodha", "Faislabad", "Lahore", "Islamabad"],
      state: ["Punjab", "Sindh", "Balochistan"],
    },
    {
      value: "Australia",
      label: "AUS",
      cities: ["Sargodha", "Faislabad", "Lahore", "Islamabad"],
      state: ["Punjab", "Sindh", "Balochistan"],
    },
  ];

  return (
    <Container sx={{ backgroundColor: "pink" }} maxWidth="xs">
      <Typography variant="h4" gutterBottom>
        Update Profile
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/*  */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              error={!!formErrors.firstName}
              helperText={formErrors.firstName}
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-select-currency"
              select
              label="Select"
              value={formData.country}
              helperText={formErrors.country}
              fullWidth
              variant="standard"
              onChange={handleInputChange}
              name="country"
              error={!!formErrors.country}
            >
              {countries.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-select-currency"
              select
              label="Select"
              defaultValue="Faislabad"
              value={formData.city}
              helperText="Please select your city"
              fullWidth
              variant="standard"
              name="city"
              onChange={handleInputChange}
              error={!!formErrors.city}
            >
              {countries
                .filter((country) => country.value === formData.country)
                .map((country) => country.cities)
                .flat()
                .map((city) => (
                  <MenuItem key={city} value={city}>
                    {city}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-select-currency"
              select
              label="Select"
              helperText={formErrors.state}
              fullWidth
              value={formData.state}
              variant="standard"
              name="state"
              onChange={handleInputChange}
              error={!!formErrors.state}
            >
              {countries
                .filter((country) => country.value === formData.country)
                .map((country) => country.state)
                .flat()
                .map((state) => (
                  <MenuItem key={state} value={state}>
                    {state}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-select-currency"
              select
              label="Select"
              helperText={formErrors.language}
              fullWidth
              value={formData.language}
              variant="standard"
              name="language"
              onChange={handleInputChange}
              error={!!formErrors.language}
            >
              {languages.map((lang) => (
                <MenuItem key={lang} value={lang}>
                  {lang}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Sign Up
        </Button>
      </form>
    </Container>
  );
};

export default Test;
