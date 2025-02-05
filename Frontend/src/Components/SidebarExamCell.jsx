import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { SiShopware } from "react-icons/si";
import { MdOutlineCancel } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { useStateContext } from "../Contexts/ContextProvider";
import {
  BsCart3,
  BsGrid1X2Fill,
  BsPeopleFill,
  BsMenuButtonWideFill,
  BsFillGearFill,
} from "react-icons/bs";

const SidebarExamCell = ({ handleDeptSelection }) => {
  const { activeMenu, setActiveMenu, screenSize, currentColor } =
    useStateContext();

  const handleCloseSidebar = () => {
    if (activeMenu && screenSize <= 900) {
      setActiveMenu(false);
    }
    setActiveDept(null);
  };

  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-2 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";

  const [academicYears, setAcademicYears] = useState([
    {
      year: "Architecture Department",
      departments: [
        "First Year",
        "Second Year",
        "Third Year",
        "Fourth Year",
        "Fifth Year",
      ],
    },
    {
      year: "Civil Engineering",
      departments: ["First Year", "Second Year", "Third Year", "Fourth Year"],
    },
    {
      year: "Electronics & Communication",
      departments: ["First Year", "Second Year", "Third Year", "Fourth Year"],
    },
    {
      year: "Electrical Engineering",
      departments: ["First Year", "Second Year", "Third Year", "Fourth Year"],
    },
    {
      year: "Information Technology",
      departments: ["First Year", "Second Year", "Third Year", "Fourth Year"],
    },
    {
      year: "Engineering Geology",
      departments: ["First Year", "Second Year", "Third Year", "Fourth Year"],
    },
    {
      year: "Instrumentation and Control",
      departments: ["First Year", "Second Year", "Third Year", "Fourth Year"],
    },
  ]);
  const [activeYear, setActiveYear] = useState(null);
  const [activeDept, setActiveDept] = useState(null);
  const [semester, setSemester] = useState(null);

  const handleYearClick = (year) => {
    if (activeYear === year) {
      // If the year is already active, clicking again should close it
      setActiveYear(null);
      setActiveDept(null); // Close active department if year is closed
    } else {
      setActiveYear(year);
      setActiveDept(null);
    }
  };
  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/"
              onClick={handleCloseSidebar}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              <SiShopware /> <span>Exam Cell</span>
            </Link>
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: currentColor }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
          <div className="mt-10 ">
            <NavLink
              to={`/dashboard`}
              onClick={handleCloseSidebar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : "",
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <BsGrid1X2Fill className="icon" />
              <span className="capitalize ">Dashboard</span>
            </NavLink>

            <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
              Department
            </p>
            {/* <Link to="/dashboard">
              <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                <BsGrid1X2Fill className="icon" /> Dashboard
              </p>
            </Link> */}

            {academicYears.map((yearData) => (
              <div key={yearData.year}>
                {" "}
                {/* Use year name as key */}
                <a
                  onClick={() => {
                    setSemester((academicYears.indexOf(yearData) + 1) * 2);
                    handleYearClick(yearData.year);
                  }}
                  className={normalLink}
                >
                  <BsPeopleFill className="icon" /> {yearData.year}
                </a>
                {activeYear === yearData.year && (
                  <ul>
                    {yearData.departments.map((department) => (
                      <Link key={department} to={`/department/${department}`}>
                        {" "}
                        {/* Use department name as key */}
                        <li
                          style={{
                            backgroundColor:
                              activeDept === department ? currentColor : "",
                            color: activeDept === department ? "white" : "",
                          }}
                          className={
                            activeYear === department ? activeLink : normalLink
                          }
                          onClick={() => {
                            handleDeptSelection(
                              department,
                              activeYear,
                              semester
                            );
                            setActiveDept(department);
                          }}
                        >
                          {department}
                        </li>
                      </Link>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SidebarExamCell;
