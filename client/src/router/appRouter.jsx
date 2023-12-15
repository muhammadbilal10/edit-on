import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const LazyHome = lazy(() => import("../components/homePage/Home"));

const LazyRegister = lazy(() => import("../components/registerPage/Register"));
const LazyLogin = lazy(() => import("../components/loginPage/Login"));
const LazyTestForm = lazy(() => import("../components/skillTest/TestForm"));
const LazyMyVideosPage = lazy(() =>
  import("../components/myVideosPage/MyVideosPage")
);
const LazySearchedList = lazy(() =>
  import("../components/searchListPage/SearchedList")
);
const LazyVideoPage = lazy(() => import("../components/videoPage/VideoPage"));
const LazyPageNotFound = lazy(() => import("../components/PageNotFound"));
import VerificationSuccessPage from "../components/VerificationSuccessPage";
import FinishRegistration from "../components/FinishRegistrationPage/FinishRegistration";
import UpdateProfile from "../components/ProfileUpdation/UpdateProfile";
import { MovieMainPage } from "../components/MoviesPage/MovieMainPage";
import Navbar from "../components/Navbar";
import CreatorMainPage from "../components/creatorPage/CreatorMainPage";
import { CreatorProfilePage } from "../components/creatorPage/CreatorProfilePage";
import { Stack } from "@mui/material";

import Chat from "../components/chat/Chat";
import PaymentForm from "../components/paymentPage/PaymentForm";
import EditONAdmin from "../components/Admin/EditONAdmin";
import { Box } from "@mui/system";
import App from "../components/skillTest/SkillTest";
// import SkillTest from "../components/skillTest/skillTest";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback="Loading...">
              <LazyHome />
            </Suspense>
          }
        />
        <Route
          path="/register"
          element={
            <Suspense fallback="Loading...">
              <LazyRegister />
            </Suspense>
          }
        />
        <Route
          path="/myvideos"
          element={
            <Suspense fallback="Loading...">
              <LazyMyVideosPage />
            </Suspense>
          }
        />
        <Route
          path="/searchlist"
          element={
            <Suspense fallback="Loading...">
              <LazySearchedList />
            </Suspense>
          }
        />
        <Route
          path="/searchlist/video/:videoId"
          element={
            <Suspense fallback="Loading...">
              <LazyVideoPage />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback="Loading...">
              <LazyPageNotFound />
            </Suspense>
          }
        />
        <Route
          path="/login"
          element={
            <Suspense fallback="Loading...">
              <LazyLogin />
            </Suspense>
          }
        />
        <Route
          path="/testForm"
          element={
            <Suspense fallback="Loading...">
              <LazyTestForm />
            </Suspense>
          }
        />
        <Route
          path="/home/video/:videoId"
          element={
            <Suspense fallback="Loading...">
              <LazyVideoPage />
            </Suspense>
          }
        />
        <Route path="/completeRegistration" element={<FinishRegistration />} />
        <Route
          path="/editprofile"
          element={
            <Box sx={{ backgroundColor: "white" }}>
              <Navbar />
              <UpdateProfile />
            </Box>
          }
        />
        <Route
          path="/creatorProfile"
          element={
            <Stack spacing={0.5}>
              <Navbar />
              <CreatorProfilePage />
            </Stack>
          }
        />

        <Route
          path="/creator/creatorProfile"
          element={
            <Stack spacing={0.5}>
              <Navbar />
              <CreatorProfilePage status={true} />
            </Stack>
          }
        />

        <Route
          path="/movies"
          element={
            <>
              <Navbar />
              <MovieMainPage />
            </>
          }
        />

        <Route
          path="/creator"
          element={
            <>
              <Navbar />
              <CreatorMainPage />
            </>
          }
        />

        <Route
          path="/movies"
          element={
            <>
              <Navbar />
              <MovieMainPage />
            </>
          }
        />

        <Route
          path="/creator"
          element={
            <>
              <Navbar />
              <CreatorMainPage />
            </>
          }
        />
        <Route path="/verify/:token" element={<VerificationSuccessPage />} />
        <Route path="/chat" element={<Chat />} />

        <Route path="/payment" element={<PaymentForm />} />
        <Route path="/editONAdmin" element={<EditONAdmin />} />
        {/* <Route path="/skilltest/*" element={<App />} /> */}
      </Routes>
      <ToastContainer theme="dark" />
    </BrowserRouter>
  );
};

export default AppRouter;
