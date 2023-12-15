import { Box, Button, Typography } from "@mui/material";
import EditOnGuarantee from "../image/EditOnService/EditOnGuarantee.png";
import HowItWorkLogo from "../image/EditOnService/HowItWorkLogo.png";
import WorldWideConnectLogo from "../image/EditOnService/WorldWideConnectLogo.png";
import InspireLogo from "../image/EditOnService/InspireLogo.png";
import { useNavigate } from "react-router-dom";
const Edit = () => {
  const services = [
    { id: 1, logo: InspireLogo, text: "Inspire with great movies" },
    {
      id: 2,
      logo: WorldWideConnectLogo,
      text: "Connect you with editors worldwide",
    },
    { id: 3, logo: HowItWorkLogo, text: "Simplify movie production" },
    { id: 4, logo: EditOnGuarantee, text: "Money-back guarantee" },
  ];

  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/register"); // Replace '/register' with the desired register page route
  };

  const Content = [
    { id: 1, count: 4, text: "Movies" },
    { id: 2, count: 11, text: "Creators" },
    { id: 3, count: 5, text: "Languages" },
    { id: 4, count: 3, text: "Countries" },
  ];
  const serivceBackgroundImage =
    "https://d1puzd1182zmjc.cloudfront.net/h/earth.jpg";

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          backgroundColor: "#6BB52E",
          p: "0px 15px",
          flexDirection: "column",
        }}
      >
        <Typography
          sx={{ fontSize: "26px", m: "16px 0px", textAlign: "center" }}
        >
          What EditON can do for you
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
          {services.map((service) => (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                padding: "0px 12px",
                alignItems: "center",
              }}
              key={service.id}
            >
              <img
                src={service.logo}
                style={{ height: "180px", width: "180px" }}
              />
              <Typography sx={{ pt: "8px", mb: "16px", textAlign: "center" }}>
                {service.text}
              </Typography>
            </Box>
          ))}
        </Box>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#F8F9FA",
            color: "black",
            m: "0px 342.2px 20px",
            fontSize: "20px",
            pl: "0px",
            pr: "0px",
            width: "400px",
            height: "47px",
            alignSelf: "center",
          }}
          onClick={handleRegisterClick}
        >
          Register
        </Button>
      </Box>
      <Box
        sx={{
          // backgroundImage: `url(${serivceBackgroundImage})`,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          paddingTop: "20px",
          backgroundColor: "#1F2937",
        }}
      >
        <img
          src="https://d1puzd1182zmjc.cloudfront.net/h/24-7_800x.png"
          height="80px"
          width="178.69px"
        />
        <Typography
          sx={{
            color: "white",
            m: "16px 0px",
            fontSize: "26px",

            fontFamily: "Noto Sans, sans-serif",
          }}
          component="h2"
        >
          Crowdsourced Video Creation Service
        </Typography>

        {Content.map((cont) => (
          <Box sx={{ display: "flex", alignItems: "center" }} key={cont.id}>
            <Typography
              sx={{
                fontSize: "35px",
                fontFamily: "Numbers, sans-serif",
                pr: "5px",
                letterSpacing: "5px",
                backgroundColor: "transparent",

                color: "#fff",
              }}
            >
              {cont.count}
            </Typography>
            <Typography
              sx={{
                pl: "5px",
                fontSize: "25px",
                fontFamily: "Noto Sans, sans-serif",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "10px",
              }}
            >
              {cont.text}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
export default Edit;
