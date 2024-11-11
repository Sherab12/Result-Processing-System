// App.js
import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/LogIn/logIn.jsx";

import "./App.css";

import { useStateContext } from "./Contexts/ContextProvider";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";

import ExamcellHome from "./Pages/ExamCell/ExamcellHome.jsx";
import TeacherHome from "./Pages/Teacher/TeacherHome.jsx";
import StudentHome from "./Pages/Student/StudentHome.jsx";
import StaffInfo from "./Pages/ExamCell/StaffInfo.jsx";

const App = () => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  const user = useSelector(selectUser);

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      {/* <ExamcellHome user={user} /> */}
      {/* <TeacherHome user={user} /> */}
      {/* <Login /> */}
      {!user ? (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      ) : (
        <>
          {user.role == "examcell" && <ExamcellHome user={user} />}
          {user.role == "tutor" && <TeacherHome user={user} />}
          {user.role == "student" && <StudentHome user={user} />}
          {user.role == "Error" && <Login />}
        </>
      )}
    </div>
    
  );
};

export default App;
