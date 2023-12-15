import React, { useContext, useEffect, useState } from "react";
import "./Intro.css";
import { getAllVideos } from "../../services/nodeApi";
import { VideoContext } from "../../contextApi/VideoContextApi";
import Loader from "../Loader";
import HomeCarousel from "./HomeCarousel";
import Pagination from "../Pagination";
import Manu from "./Page";
import Footer from "./HomeFooter";
import Edit from "./EditOnServices";
import Reviews from "./HomeReviews";
import EditonWork from "./HomeEditOnWokr";
// import ActionAreaCard from "./Test";
import CreatorProfile from "../creatorPage/CreatorProfile";
import { CreatorProfilePage } from "../creatorPage/CreatorProfilePage";
import { Box } from "@mui/material";
import Test from "./Test";
import { Profile } from "../Profile";

const Content = () => {
  const [banner, setBanner] = useState("");
  const [name, setName] = useState("View all");
  const { handleSetAllVideos, updatedList, allVideos } =
    useContext(VideoContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getVideos = async () => {
      try {
        setIsLoading(true);
        const response = await getAllVideos();
        const reversedResponse = response.reverse();
        handleSetAllVideos(reversedResponse);
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };
    getVideos();
  }, [updatedList]);

  const handleViewButton = () => {
    if (banner) {
      setBanner("");
    } else {
      setBanner("class");
    }
    if (name === "View all") {
      setName("View less");
    } else {
      setName("View all");
    }
  };

  return (
    <>
      <HomeCarousel />
      {!isLoading ? (
        <div
          className={`video-content ${
            banner ? "relative translate-y-[-125px]" : ""
          }`}
        >
          {/* <div className="btns">
            <div className="recent">Recent</div>
            <div className="view-all" onClick={handleViewButton}>
              {name}
            </div>
          </div> */}
          {/* <div className="videos">
            {!banner ? (
              <Pagination
                videos={allVideos.slice(0, 4)}
                source={"home"}
                videosPerLoad={12}
              />
            ) : (
              <Pagination
                videos={allVideos}
                source={"home"}
                videosPerLoad={12}
              />
            )}
          </div> */}

          <Box>
            <Manu />
            <EditonWork />
            <Edit />
            <Reviews />
            {/* <Test text={"Hello"} backgroundColor={"white"} /> */}
            <Footer />
            {/* <Test /> */}
          </Box>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};
export default Content;
