import React from "react";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Routes, Route } from "react-router-dom";
import {
  Navbar,
  Footer,
  SidebarStudent,
  ThemeSettings,
} from "../../Components";
import { useStateContext } from "../../Contexts/ContextProvider.jsx";
import Resultpage from "./Resultpage.jsx";

function StudentHome() {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  const [selectedYear, setSelectedYear] = React.useState(null);

  const handleYearSelection = (year) => {
    setSelectedYear(year);
  };

  return (
    <div>
      <div className="flex relative dark:bg-main-dark-bg">
        <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
          <TooltipComponent content="Settings" position="Top">
            <button
              type="button"
              onClick={() => setThemeSettings(true)}
              style={{ background: currentColor, borderRadius: "50%" }}
              className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
            >
              <FiSettings />
            </button>
          </TooltipComponent>
        </div>

        {activeMenu ? (
          <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
            <SidebarStudent handleYearSelection={handleYearSelection} />
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg">
            <SidebarStudent handleYearSelection={handleYearSelection} />
          </div>
        )}

        <div
          className={
            activeMenu
              ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full"
              : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2"
          }
        >
          <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
            <Navbar />
          </div>

          <div className="p-4">
            {themeSettings && <ThemeSettings />}

            {/* Display the selected year */}
            {/* {selectedYear && (
              <p className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                Selected Year: {selectedYear}
              </p>
            )} */}

            <Routes>
              {/* Render the Resultpage with selectedYear */}
              <Route
                exact
                path={`/year/${selectedYear}`}
                element={
                  <Resultpage Year={selectedYear} semOne={1} semTwo={2} />
                }
              />
            </Routes>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
}

export default StudentHome;
