import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./routes/error-page";
import WelcomeSpeech from "./routes/administration/WelcomeSpeech";
import Committee from "./routes/administration/Committee";
import DonorMember from "./routes/administration/DonorMember";
import TeacherList from "./routes/list/TeacherList";
import StudentList from "./routes/list/StudentList";
import StaffList from "./routes/list/StaffList";
import InstituteDetails from "./routes/administration/InstituteDetails";
import BookList from "./routes/academic/BookList";
import DressCode from "./routes/academic/DressCode";
import SeatInfo from "./routes/academic/SeatInfo";
import Syllabus from "./routes/academic/Syllabus";
import FeesInfo from "./routes/admission/FeesInfo";
import FindPayslip from "./routes/admission/FindPayslip";
import SectionWise from "./routes/attendance/SectionWise";
import StudentWise from "./routes/attendance/StudentWise";
import ClassRoutine from "./routes/academic/ClassRoutine";
import OnlineClassRoutine from "./routes/academic/OnlineClassRoutine";
import ExamRoutine from "./routes/academic/ExamRoutine";
import MeritList from "./routes/results/MeritList";
import FailList from "./routes/results/FailList";
import SectionWiseResult from "./routes/results/SectionWiseResult";
import Indivitual from "./routes/results/Indivitual";
import PhotoGallery from "./routes/more/PhotoGallery";
import InstituteNotice from "./routes/administration/InstituteNotice";
import DownloadCorner from "./routes/more/DownloadCorner";
import MujibCorner from "./routes/more/MujibCorner";
import GJCorner from "./routes/more/GJCorner";
import APACorner from "./routes/more/APACorner";
import ISCorner from "./routes/more/ISCorner";
import IRCorner from "./routes/more/IRCorner";
import ApplyOnline from "./routes/admission/ApplyOnline";
import Payment from "./routes/admission/Payment";
import Search from "./routes/more/Search";
import Download from "./routes/admission/Download";
import ImportantLink from "./routes/more/ImportantLink";

import { persistor, store } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
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
        children: [
          {
            path: "portal/*",
            element: <Portal />,
          },
        ],
      }
    ],
  },
]);


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </PersistGate>
);