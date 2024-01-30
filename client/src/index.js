import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./routes/error-page";
import WelcomeSpeech from "./routes/WelcomeSpeech";
import Committee from "./routes/Committee";
import DonorMember from "./routes/DonorMember";
import TeacherList from "./routes/TeacherList";
import StudentList from "./routes/StudentList";
import StaffList from "./routes/StaffList";
import InstituteDetails from "./routes/InstituteDetails";
import BookList from "./routes/BookList";
import DressCode from "./routes/DressCode";
import SeatInfo from "./routes/SeatInfo";
import Syllabus from "./routes/Syllabus";
import FeesInfo from "./routes/FeesInfo";
import FindPayslip from "./routes/FindPayslip";
import SectionWise from "./routes/SectionWise";
import StudentWise from "./routes/StudentWise";
import ClassRoutine from "./routes/ClassRoutine";
import OnlineClassRoutine from "./routes/OnlineClassRoutine";
import ExamRoutine from "./routes/ExamRoutine";
import MeritList from "./routes/MeritList";
import FailList from "./routes/FailList";
import SectionWiseResult from "./routes/SectionWiseResult";
import Indivitual from "./routes/Indivitual";
import PhotoGallery from "./routes/PhotoGallery";
import InstituteNotice from "./routes/InstituteNotice";
import DownloadCorner from "./routes/DownloadCorner";
import MujibCorner from "./routes/MujibCorner";
import GJCorner from "./routes/GJCorner";
import APACorner from "./routes/APACorner";
import ISCorner from "./routes/ISCorner";
import IRCorner from "./routes/IRCorner";
import ApplyOnline from "./routes/ApplyOnline";
import Payment from "./routes/Payment";
import Search from "./routes/Search";
import Download from "./routes/Download";
import Teacher from "./routes/portals/Teacher";
import Student from "./routes/portals/Student";
import Parent from "./routes/portals/Parent";
import Login from "./routes/portals/Login";
import ImportantLink from "./routes/ImportantLink";
import SignUp from "./routes/portals/Signup";
import Admin from "./routes/portals/Admin";
import Portal from "./routes/portals/Portal";


const router = createBrowserRouter([
  {
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "WelcomeSpeech",
        element: <WelcomeSpeech />,
      },
      {
        path: "Committee",
        element: <Committee />,
      },
      {
        path: "DonorMember",
        element: <DonorMember />,
      },
      {
        path: "TeacherList",
        element: <TeacherList />
      },
      {
        path: "StudentList",
        element: <StudentList />,
      },
      {
        path: "StaffList",
        element: <StaffList />,
      },
      {
        path: "InstituteDetails",
        element: <InstituteDetails />,
      },
      {
        path: "BookList",
        element: <BookList />,
      },
      {
        path: "DressCode",
        element: <DressCode />,
      },
      {
        path: "SeatInfo",
        element: <SeatInfo />,
      },
      {
        path: "Syllabus",
        element: <Syllabus />,
      },
      {
        path: "FeesInfo",
        element: <FeesInfo />,
      },
      {
        path: "FindPayslip",
        element: <FindPayslip />,
      },
      {
        path: "SectionWise",
        element: <SectionWise />,
      },
      {
        path: "StudentWise",
        element: <StudentWise />,
      },
      {
        path: "ClassRoutine",
        element: <ClassRoutine />,
      },
      {
        path: "OnlineClassRoutine",
        element: <OnlineClassRoutine />,
      },
      {
        path: "ExamRoutine",
        element: <ExamRoutine />,
      },
      {
        path: "MeritList",
        element: <MeritList />,
      },
      {
        path: "FailList",
        element: <FailList />,
      },
      {
        path: "SectionWiseResult",
        element: <SectionWiseResult />,
      },
      {
        path: "Indivitual",
        element: <Indivitual />,
      },
      {
        path: "PhotoGallery",
        element: <PhotoGallery />,
      },
      {
        path: "InstituteNotice",
        element: <InstituteNotice />,
      },
      {
        path: "DownloadCorner",
        element: <DownloadCorner />,
      },
      {
        path: "MujibCorner",
        element: <MujibCorner />,
      },
      {
        path: "GJCorner",
        element: <GJCorner />,
      },
      {
        path: "APACorner",
        element: <APACorner />,
      },
      {
        path: "ISCorner",
        element: <ISCorner />,
      },
      {
        path: "IRCorner",
        element: <IRCorner />,
      },
      {
        path: "ApplyOnline",
        element: <ApplyOnline />,
      },
      {
        path: "Payment",
        element: <Payment />,
      },
      {
        path: "Search",
        element: <Search />,
      },
      {
        path: "Download",
        element: <Download />,
      },
      {
        path: "importantLink",
        element: <ImportantLink />,
      },
      {
        path: "/portal",
        children: [
          {
            path: "/portal",
            element: <Portal />,
          },
          {
            path: "/portal/student",
            element: <Student />,
          },
          {
            path: "/portal/teacher",
            element: <Teacher />,
          },
          {
            path: "/portal/admin",
            element: <Admin />,
          },
          {
            path: "/portal/parent",
            element: <Parent />,
          },
          {
            path: "/portal/login",
            element: <Login />,
          },
          {
            path: "/portal/signup",
            element: <SignUp />,
          },
        ],
      },
    ],
  },
]);


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);