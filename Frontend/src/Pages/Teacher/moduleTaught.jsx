import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import FileUpload from "./FileUpload.jsx";

function ModuleTaught({ department, year, semester }) {
  const moduleData = {
    "First Year": {
      "Information Technology": ["Introduction to Programming"],
    },
    "Second Year": {
      "Information Technology": ["Introduction to Programming"],
    },
    "Third Year": {
      "Information Technology": ["Mobile Application Development"],
      "Electronics & Communication Engineering": ["Module3", "Module4"],
    },
    "Fourth Year": {
      "Information Technology": ["Introduction to Programming"],
    },
  };

  const moduleCodeData = {
    "First Year": {
      "Information Technology": ["CPL101"],
    },
    "Second Year": {
      "Information Technology": ["CPL101"],
      "Electronics & Communication Engineering": ["Module3", "Module4"],
    },
    "Third Year": {
      "Information Technology": ["CTE306"],
    },
    "Fourth Year": {
      "Information Technology": ["CPL101"],
    },
  };

  const [selectedModule, setSelectedModule] = useState(null);
  const [activeModules, setActiveModules] = useState(Array(10).fill(false)); // Assuming a maximum of 10 modules

  const modules = moduleData[year] && moduleData[year][department];
  const moduleCodes = moduleCodeData[year] && moduleCodeData[year][department];

  const handleModuleClick = (module, moduleCode, index) => {
    setSelectedModule({ module, moduleCode, year, department, semester });
    setActiveModules(activeModules.map((_, i) => i === index));
  };

  const viewResult = (module) => {
    setSelectedModule({ module, year, department });
  };

  useEffect(() => {
    // Reset selected module and active modules when the year changes
    setSelectedModule(null);
    setActiveModules(Array(10).fill(false));
  }, [year]);

  return (
    <div className="md:flex md:flex-row h-screen">
      <div className="w-full md:w-2/5 md:h-1/2 m-5">
        <div className="md:flex md:flex-col">
          <div className="flex justify-between px-10 bg-blue-500 text-white font-extrabold h-14 items-center">
            <p>{department}</p>
            <p>{year}</p>
          </div>
          {modules && moduleCodes ? (
            <div className="p-4 bg-opacity-90 bg-gray-100">
              {modules.map((module, index) => (
                <div
                  className={`m-2 bg-gray-100 cursor-pointer text-black flex items-center transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg ${
                    activeModules[index] ? "scale-105 shadow-lg" : ""
                  }`}
                  key={index}
                  onClick={() =>
                    handleModuleClick(module, moduleCodes[index], index)
                  }
                >
                  <div
                    className={`w-16 h-16 bg-blue-500 ${
                      activeModules[index] ? "w-4 h-16" : ""
                    }`}
                  ></div>
                  <div className="flex items-center justify-between w-full px-2">
                    <div className="p-2">{module}</div>
                    <div className="p-2">{moduleCodes[index]}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No modules found for the selected department and year.</p>
          )}
        </div>
      </div>
      <div className="w-full md:w-3/5 md:h-1/2 m-5">
        {selectedModule && (
          <FileUpload
            department={department}
            year={year}
            moduleC={selectedModule.moduleCode}
          />
          // <></>
        )}
      </div>
    </div>
  );
}

export default ModuleTaught;
