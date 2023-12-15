import { Box, Icon, IconButton, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import React from "react";

const Footer = () => {
  const NavigationValue = [
    { id: 1, val: "Blog" },
    { id: 1, val: "Contact us" },
    { id: 1, val: "About OnEdit" },
    { id: 1, val: "Affiliate" },
    { id: 1, val: "Terms & privacy" },
  ];
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          backgroundColor: "rgb(21, 21, 37)",
          gap: "8px",
          pt: "16px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "368.8px",
            p: "8px 0px 8px",
          }}
        >
          <Typography
            sx={{
              display: "inline-block",
              fontSize: "50px",
              ml: "-15",
              color: "#D8B4FE",
            }}
          >
            EditON
          </Typography>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {NavigationValue.map((NavVal, index) => (
              <React.Fragment key={index}>
                <Typography>{NavVal.val}</Typography>
                {index !== NavigationValue.length - 1 && (
                  <Typography sx={{ m: "0px 8px 4.8px" }}>|</Typography>
                )}
              </React.Fragment>
            ))}
          </Box>
          <Typography sx={{ p: "4.8px 0px", textAlign: "center" }}>
            Phone: +92 300 9449466 - WhatsApp, Telegram
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <LinkedInIcon sx={{ fontSize: "35px", m: "8px 16px" }} />
            <InstagramIcon sx={{ fontSize: "35px", m: "8px 16px" }} />
            <FacebookIcon sx={{ fontSize: "35px", m: "8px 16px" }} />
            <TwitterIcon sx={{ fontSize: "35px", m: "8px 16px" }} />
          </Box>
        </Box>
      </Box>
      <Typography
        sx={{  backgroundColor: "rgb(21, 21, 37)", p: "11.2px 0px 9.6px 30px" }}
      >
        © 2013-2023 EditOn. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
