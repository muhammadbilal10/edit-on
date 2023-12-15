import React, { useState } from "react";
import axios from "axios";
import "./FinishRegistration.css";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { Grid, MenuItem, TextField } from "@mui/material";
import TestForm from "../skillTest/TestForm";

function FinishRegistration() {
  const [isClient, setIsClient] = useState(true);
  const [isCompany, setIsCompany] = useState(false);
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const [formData, setFormData] = useState({
    country: "",
    email: "",
    state: "",
    city: "",
    language: "",
    terms_conditions: false,
    companyName: "",
    companyRegistrationNumber: "",
  });

  const [errors, setErrors] = useState({});
  const storedData = localStorage.getItem("storedEmail");
  console.log({ ...formData, email: storedData });
  const navigate = useNavigate();
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

  const MUITextField = {
    "& .MuiInputBase-input": {
      color: "white",
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: "white", // Change the underline border color when not focused
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white", // Change the underline border color when focused
    },
    "& .MuiInputLabel-root": {
      color: "white", // Change the label color
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "white", // Change the label color when focused
    },
    "& .MuiFormLabel-root.Mui-error": {
      color: "red", // Change the label color when in error state
    },
    "& .MuiFormHelperText-root.Mui-error": {
      color: "red", // Change the helper text color when in error state
    },
    "& .MuiInputBase-input::placeholder": {
      color: "gray", // Change the placeholder text color
    },
  };

  const [formErrors, setFormErrors] = useState({
    name: "",
    country: "",
    city: "",
    state: "",
    language: "",
  });

  const handleInputFieldsChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" }); // Clear the error when user starts typing
    // alert(JSON.stringify(formData));
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };
  //.......profile upload
  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("image", image);
    console.log(formData.get("image"));
    try {
      await axios.post(
        `${import.meta.env.VITE_NODE_API}profileUpload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // Reset form fields after successful upload
      setImage(null);
      setPreviewImage(null);
    } catch (error) {
      console.error(error);
    }
  };

  //................
  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateForm = () => {
    let valid = true;
    const newFormErrors = { ...formErrors };

    // Validation checks
    // if (!formData.name) {
    //   valid = false;
    //   newFormErrors.name = "First Name is required";
    // }

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      try {
        const formDataToSend = new FormData();
        formDataToSend.append("image", image);
        formDataToSend.append("email", storedData);

        // Add other form data fields to the FormData object
        for (const key in formData) {
          formDataToSend.append(key, formData[key]);
          console.log(key);
        }
        // Set the userType based on the selected radio button
        formDataToSend.append(
          "userType",
          isClient ? "client" : isCompany ? "company" : "creator"
        );
        console.log(
          `Form Data ${isClient ? "client" : isCompany ? "company" : "creator"}`
        );
        // Complete user registration including profile image upload
        const response = await axios.post(
          `${import.meta.env.VITE_NODE_API}completeRegistration`,
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log(response.data);

        setTimeout(() => {
          if (!isClient && !isCompany) {
            toast.success(
              "You must pass the test to complete registration as creator."
            );
            navigate("/testForm");
          } else {
            toast.success(
              "Congratulations! You have successfully completed registration."
            );
            navigate("/login");
          }
        }, 2000);
      } catch (error) {
        console.error(error);
        toast.error("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className="sign_up">
      {/* <form encType="multipart/form-data"
        style={{ position: 'relative', top: '20px', left: '300px' }}>
           {previewImage && (
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <img src={previewImage} alt="Profile Preview" style={{ width: '150px', height: '150px' }} />
          
          </div>
        )}
        <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} />
        <button
          type="button"
          onClick={handleUpload}
          style={{ backgroundColor: 'gray', color: 'white', padding
          : '10px', borderRadius: '5px', border: 'none', cursor: 'pointer', marginTop: '10px' }}
        >
          Click to Upload
        </button>
       
      </form> */}
      <div style={{ position: "relative", top: "20px", left: "300px" }}>
        {previewImage && (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <img
              src={previewImage}
              alt="Profile Preview"
              style={{ width: "150px", height: "150px" }}
            />
          </div>
        )}
      </div>

      <div className="container">
        <h1 style={{ fontSize: "30px", marginTop: "-50px" }}>
          Finish Registration
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="radio-container">
            <div>
              <input
                type="radio"
                id="client"
                name="userType"
                value="client"
                checked={isClient}
                onChange={() => {
                  setIsClient(true);
                  setIsCompany(false);
                }}
                className="radio-button"
              />
              <label
                htmlFor="client"
                className={`radio-label ${
                  isClient ? "radio-label-selected" : "radio-label-unselected"
                }`}
              >
                As a Client
              </label>
            </div>
            <div className="radio-label-separator">or</div>
            <div>
              <input
                type="radio"
                id="creator"
                name="userType"
                value="creator"
                checked={!isClient && !isCompany}
                onChange={() => {
                  setIsClient(false);
                  setIsCompany(false);
                }}
                className="radio-button"
              />
              <label
                htmlFor="creator"
                className={`radio-label ${
                  !isClient && !isCompany
                    ? "radio-label-selected"
                    : "radio-label-unselected"
                }`}
              >
                As a Creator
              </label>
            </div>
            <div className="radio-label-separator">or</div>
            <div>
              <input
                type="radio"
                id="company"
                name="userType"
                value="company"
                checked={isCompany}
                onChange={() => {
                  setIsClient(false);
                  setIsCompany(true);
                }}
                className="radio-button"
              />
              <label
                htmlFor="company"
                className={`radio-label ${
                  isCompany ? "radio-label-selected" : "radio-label-unselected"
                }`}
              >
                As a Company
              </label>
            </div>
          </div>

          <div className="details">
            {/* <div className="flex items-center border-b-2 py-2 px-1 mb-2">
              <input
                type="text"
                placeholder="Enter Full Name"
                className="pl-2 outline-none bg-gray-800 border-none text-white px-5"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              {errors.name && <p className="text-red-500">{errors.name}</p>}
            </div> */}

            <div className="flex items-center border-b-2 py-2 px-1 mb-2">
              <input
                type="text"
                placeholder="Enter email that used during registration"
                className="pl-2 outline-none bg-gray-800 border-none text-white px-5"
                name="email"
                id="email"
                value={storedData}
                onChange={handleInputChange}
                required
                readOnly
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>

            <Grid item xs={12}>
              <TextField
                id="outlined-select-currency"
                select
                label="Select"
                value={formData.country}
                helperText={formErrors.country}
                fullWidth
                variant="standard"
                onChange={handleInputFieldsChange}
                name="country"
                error={!!formErrors.country}
                sx={MUITextField}
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
                helperText={formErrors.state}
                fullWidth
                value={formData.state}
                variant="standard"
                name="state"
                onChange={handleInputChange}
                error={!!formErrors.state}
                sx={MUITextField}
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
                value={formData.city}
                helperText={formErrors.city}
                fullWidth
                variant="standard"
                name="city"
                onChange={handleInputChange}
                error={!!formErrors.city}
                sx={MUITextField}
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
                helperText={formErrors.language}
                fullWidth
                value={formData.language}
                variant="standard"
                name="language"
                onChange={handleInputChange}
                error={!!formErrors.language}
                sx={MUITextField}
              >
                {languages.map((lang) => (
                  <MenuItem key={lang} value={lang}>
                    {lang}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            {/* <div className="flex items-center border-b-2 py-2 px-1 mb-2">
              <input
                type="text"
                placeholder="Enter Country"
                className="pl-2 outline-none bg-gray-800 border-none text-white px-5"
                name="country"
                id="country"
                value={formData.country}
                onChange={handleInputChange}
                required
              />
              {errors.country && (
                <p className="text-red-500">{errors.country}</p>
              )}
            </div> */}
          </div>

          {isCompany && (
            <>
              <div className="flex items-center border-b-2 py-2 px-1 mb-2">
                <input
                  type="text"
                  placeholder="Enter Company Name"
                  className="pl-2 outline-none bg-gray-800 border-none text-white px-5"
                  name="companyName"
                  id="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  required
                />
                {errors.companyName && (
                  <p className="text-red-500">{errors.companyName}</p>
                )}
              </div>
              <div className="flex items-center border-b-2 py-2 px-1 mb-2">
                <input
                  type="text"
                  placeholder="Enter Company Registration Number"
                  className="pl-2 outline-none bg-gray-800 border-none text-white px-5"
                  name="companyRegistrationNumber"
                  id="companyRegistrationNumber"
                  value={formData.companyRegistrationNumber}
                  onChange={handleInputChange}
                  required
                />
                {errors.companyRegistrationNumber && (
                  <p className="text-red-500">
                    {errors.companyRegistrationNumber}
                  </p>
                )}
              </div>
            </>
          )}
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            style={{ marginTop: "10px" }}
          />
          <br />

          <div className="check">
            <input
              type="checkbox"
              id="terms_conditions"
              name="terms_conditions"
              checked={formData.terms_conditions}
              onChange={handleInputChange}
            />
            <label htmlFor="terms_conditions">
              I agree to the <a href="/">terms</a> and{" "}
              <a href="/">conditions</a>
            </label>
            {errors.terms_conditions && (
              <p className="text-red-500">{errors.terms_conditions}</p>
            )}
          </div>

          <button
            id="register_btn"
            type="submit"
            className="block w-32 my-10 py-2 ml-0 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
          >
            Sign Up
          </button>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
}

export default FinishRegistration;
