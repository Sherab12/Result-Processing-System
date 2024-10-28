import React, { useState } from "react";
import "./yeardept.css";
import ModuleResult from "./ModuleResult.jsx";
import ResultView from "./resultView.jsx";
import { NavLink } from "react-router-dom";

function YearDept({ department, year, semester }) {
  const moduleData = {
    "First Year": {
      "Information Technology": [
        "Introduction to Programming",
        "Calculus and Infinite Series",
      ],
      "Electrical Engineering": ["Module3", "Module4"],
      "Electronics & Communication Engineering": ["Module3", "Module4"],
      "Civil Engineering": ["Module3", "Module4"],
      "Architecture Department": ["Module3", "Module4"],
      "Engineering Geology": ["Module3", "Module4"],
      "Instrumentation and Control Engineering": ["Module3", "Module4"],
    },
    "Second Year": {
      "Information Technology": [
        "Introduction to Programming",
        "Calculus and Infinite Series",
      ],
      "Electrical Engineering": ["Module3", "Module4"],
      "Electronics & Communication Engineering": ["Module3", "Module4"],
      "Civil Engineering": ["Module3", "Module4"],
      "Architecture Department": ["Module3", "Module4"],
      "Engineering Geology": ["Module3", "Module4"],
      "Instrumentation and Control Engineering": ["Module3", "Module4"],
    },
    "Third Year": {
      "Information Technology": [
        "Software Engineering",
        "Mobile Application Development",
        "Object Oriented Analysis & Design",
        "Human Computer Interaction",
        "Advanced Web Technology",
      ],
      "Electrical Engineering": ["Module3", "Module4"],
      "Electronics & Communication Engineering": ["Module3", "Module4"],
      "Civil Engineering": ["Module3", "Module4"],
      "Architecture Department": ["Module3", "Module4"],
      "Engineering Geology": ["Module3", "Module4"],
      "Instrumentation and Control Engineering": ["Module3", "Module4"],
    },
    "Fourth Year": {
      "Information Technology": [
        "Management Information Systems",
        "Artificial Intelligence (Elective II)",
        "Optimization Techniques",
        "Financial Management and Accounts",
        "Professional Practices in IT",
      ],
      "Electrical Engineering": ["Module3", "Module4"],
      "Electronics & Communication Engineering": ["Module3", "Module4"],
      "Civil Engineering": ["Module3", "Module4"],
      "Architecture Department": ["Module3", "Module4"],
      "Engineering Geology": ["Module3", "Module4"],
      "Instrumentation and Control Engineering": ["Module3", "Module4"],
    },
    "Fifth Year": {
      "Architecture Department": ["Module3", "Module4"],
    },
  };

  const moduleCodeData = {
    "First Year": {
      "Information Technology": ["CPL101", "MAT101"],
      "Electrical Engineering": ["Module3", "Module4"],
      "Electronics & Communication Engineering": ["Module3", "Module4"],
      "Civil Engineering": ["Module3", "Module4"],
      "Architecture Department": ["Module3", "Module4"],
      "Engineering Geology": ["Module3", "Module4"],
      "Instrumentation and Control Engineering": ["Module3", "Module4"],
    },
    "Second Year": {
      "Information Technology": ["CPL101", "MAT101"],
      "Electrical Engineering": ["Module3", "Module4"],
      "Electronics & Communication Engineering": ["Module3", "Module4"],
      "Civil Engineering": ["Module3", "Module4"],
      "Architecture Department": ["Module3", "Module4"],
      "Engineering Geology": ["Module3", "Module4"],
      "Instrumentation and Control Engineering": ["Module3", "Module4"],
    },
    "Third Year": {
      "Information Technology": [
        "CTE305",
        "CTE306",
        "DIS302",
        "CTE307",
        "CTE308",
      ],
      "Electrical Engineering": ["Module3", "Module4"],
      "Electronics & Communication Engineering": ["Module3", "Module4"],
      "Civil Engineering": ["Module3", "Module4"],
      "Architecture Department": ["Module3", "Module4"],
      "Engineering Geology": ["Module3", "Module4"],
      "Instrumentation and Control Engineering": ["Module3", "Module4"],
    },
    "Fourth Year": {
      "Information Technology": [
        "DIS404",
        "CTE411",
        "MAT412",
        "ITM403",
        "ITM404",
      ],
      "Electrical Engineering": ["Module3", "Module4"],
      "Electronics & Communication Engineering": ["Module3", "Module4"],
      "Civil Engineering": ["Module3", "Module4"],
      "Architecture Department": ["Module3", "Module4"],
      "Engineering Geology": ["Module3", "Module4"],
      "Instrumentation and Control Engineering": ["Module3", "Module4"],
    },
    "Fifth Year": {
      "Architecture Department": ["Module3", "Module4"],
    },
    // ... Define module code data for other years and departments
  };
  const [selectedModule, setSelectedModule] = useState(null);
  const [activeModules, setActiveModules] = useState(Array(10).fill(false)); // Assuming a maximum of 10 modules

  const modules = moduleData[department] && moduleData[department][year];
  const moduleCodes =
    moduleCodeData[department] && moduleCodeData[department][year];

  const handleModuleClick = (module, moduleCode, index) => {
    setSelectedModule({ module, moduleCode, year, department, semester });
    setActiveModules(activeModules.map((_, i) => i === index));
  };

  const viewResult = (module) => {
    setSelectedModule({ module, year, department });
  };

  // useEffect(() => {
  //   // Reset selected module and active modules when the year changes
  //   setSelectedModule(null);
  //   setActiveModules(Array(10).fill(false));
  // }, [year]);

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
              <NavLink to={`/resultView`}>
                <button
                  className="viewResultButton"
                  onClick={() => viewResult()}
                >
                  View Result
                </button>
              </NavLink>
            </div>
          ) : (
            <p>No modules found for the selected department and year.</p>
          )}
        </div>
      </div>
      <div className="w-full md:w-3/5 md:h-1/2 m-5">
        {selectedModule && (
          <ModuleResult
            department={department}
            year={year}
            moduleC={selectedModule.moduleCode}
          />
        )}
      </div>
    </div>
  );
}

export default YearDept;
