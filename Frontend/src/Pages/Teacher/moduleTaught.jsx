import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import FileUpload from "./FileUpload.jsx";

function ModuleTaught({ modulecode, ModuleName, Year }) {
  // const moduleData = {
  //   "First Year": {
  //     "Information Technology": ["Introduction to Programming"],
  //   },
  //   "Second Year": {
  //     "Information Technology": ["Introduction to Programming"],
  //   },
  //   "Third Year": {
  //     "Information Technology": ["Mobile Application Development"],
  //     "Electronics & Communication Engineering": ["Module3", "Module4"],
  //   },
  //   "Fourth Year": {
  //     "Information Technology": ["Introduction to Programming"],
  //   },
  // };

  // const moduleCodeData = {
  //   "First Year": {
  //     "Information Technology": ["CPL101"],
  //   },
  //   "Second Year": {
  //     "Information Technology": ["CPL101"],
  //     "Electronics & Communication Engineering": ["Module3", "Module4"],
  //   },
  //   "Third Year": {
  //     "Information Technology": ["CTE306"],
  //   },
  //   "Fourth Year": {
  //     "Information Technology": ["CPL101"],
  //   },
  // };

  // const [selectedModule, setSelectedModule] = useState(null);
  // const [activeModules, setActiveModules] = useState(Array(10).fill(false)); // Assuming a maximum of 10 modules

  // const modules = moduleData[year] && moduleData[year][department];
  // const moduleCodes = moduleCodeData[year] && moduleCodeData[year][department];

  // const handleModuleClick = (module, moduleCode, index) => {
  //   setSelectedModule({ module, moduleCode, year, department, semester });
  //   setActiveModules(activeModules.map((_, i) => i === index));
  // };

  // const viewResult = (module) => {
  //   setSelectedModule({ module, year, department });
  // };

  // useEffect(() => {
  //   // Reset selected module and active modules when the year changes
  //   setSelectedModule(null);
  //   setActiveModules(Array(10).fill(false));
  // }, [year]);

  return (
    <div className="md:flex md:flex-row h-screen">
      <div className="w-full md:w-full md:h-1/2 m-5">
        <div className="md:flex md:flex-col">
          <div className="flex justify-between px-10 bg-blue-500 text-white font-extrabold h-14 items-center">
            {/* <p>{department}</p> */}
            <p>Module Code:{modulecode}</p>
            <p>Year: {Year}</p>
          </div>
          {modulecode && (
            <FileUpload moduleN={ModuleName} year={Year} moduleC={modulecode} />
            // <></>
          )}
        </div>
      </div>
      {/* <div className="w-full md:w-3/5 md:h-1/2 m-5">
       
      </div> */}
    </div>
  );
}

export default ModuleTaught;
