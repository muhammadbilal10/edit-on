import React, { useEffect, useState, useRef } from "react";
import { ChevronsLeft, ChevronsRight } from "react-feather";
import videoSource from "../../assets/video.mp4";
import videoSource2 from "../../assets/video2.mp4";
import { Typography, Box, Button } from "@mui/material";
const HomeCarousel = () => {
  const [curr, setCurr] = useState(0);
  const videoRef = useRef(null);

  const autoSlide = false;
  const autoSlideInterval = 5500;

  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  const next = () =>
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

  const slides = [
    { type: "video", source: videoSource2 },
    // Add more video objects if needed
  ];

  useEffect(() => {
    if (!autoSlide) return;

    const slideInterval = setInterval(next, autoSlideInterval);

    return () => {
      clearInterval(slideInterval);
    };
  }, []);

  useEffect(() => {
    if (slides[curr].type === "video") {
      videoRef.current.play();
    }
  }, [curr]);

  return (
    <div className="max-w-fit relative overflow-hidden w-screen h-7.5">
      <div
        style={{ transform: `translateX(-${curr * 100}%)` }}
        className="flex transition-transform ease-out duration-500"
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`w-full h-full ${
              slide.type === "video" ? "video-slide" : "image-slide"
            }`}
          >
            {slide.type === "video" ? (
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                className="w-full h-full object-cover"
              >
                <source src={slide.source} type="video/mp4" />
              </video>
            ) : (
              <img src={slide.source} alt={`Slide ${index}`} />
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center absolute inset-0">
        {/* <button
          onClick={prev}
          className="opacity-30 hover:opacity-80 bg-white rounded-full"
        >
          <ChevronsLeft size={40} color="black" />
        </button> */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignSelf: "end",
            mb: "40px",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Noto Sans,sans-serif",
              fontSize: "34px",
              color: "#fff",
              mb: "8px",
            }}
          >
            EditON help you make your perfect video
          </Typography>
          <Typography
            sx={{
              fontFamily: "Noto Sans,sans-serif",
              fontSize: "26px",
              color: "#fff",
              mb: "16px",
              textAlign: "center",
            }}
          >
            Easily collaborate with the best video creators
          </Typography>
         
        </Box>
        {/* <button
          onClick={next}
          className="opacity-30 hover:opacity-80 bg-white rounded-full"
        >
          <ChevronsRight size={40} color="black" />
        </button> */}
      </div>
      <div className="absolute bottom-4 right-0 left-0">
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`
                  transition-all w-3 h-3 bg-white rounded-full
                  ${curr === i ? "p-2" : "bg-opacity-50"}
              `}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeCarousel;
