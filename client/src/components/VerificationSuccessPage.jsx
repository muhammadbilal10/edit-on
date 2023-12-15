import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import axios from "axios"; // Import Axios

const VerificationSuccessPage = () => {
  const { token } = useParams(); // Access the 'token' parameter from the URL

  const [apiResponse, setApiResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      setError("Verification token not found in the URL");
      return;
    }
    // Call the API directly inside the component
    axios
      .get(`${import.meta.env.VITE_NODE_API}verify/${token}`)
      .then((response) => {
        setApiResponse(response.data);
      })
      .catch((err) => {
        setError(err.response.data); // Set the error message from the API response
      });
  }, [token]);

  const location = useLocation();
  const data = location.state;
  console.log(data);
  return (
    <div
      style={{
        backgroundColor: "#1F2937",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <div style={{ fontSize: "48px", marginBottom: "20px" }}>
        ✅ {/* Emoji for checkmark */}
      </div>
      <h2
        style={{ fontSize: "24px", marginBottom: "20px", textAlign: "center" }}
      >
        {error ? "Email Verification Failed" : "Email Verified Successfully!"}
      </h2>
      {error ? (
        <p style={{ color: "red" }}>{error.message}</p>
      ) : (
        <NavLink
          to="/completeRegistration"
          style={{ textDecoration: "none", color: "blue" }}
        >
          <button
            style={{
              padding: "10px 20px",
              fontSize: "18px",
              backgroundColor: "blue",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Click to Complete Registartion Process
          </button>
        </NavLink>
      )}
    </div>
  );
};

export default VerificationSuccessPage;
