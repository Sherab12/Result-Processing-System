import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { SiShopware } from "react-icons/si";
import { MdOutlineCancel } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { links } from "../Data/dummy";
import { useStateContext } from "../Contexts/ContextProvider";
import {
  BsCart3,
  BsGrid1X2Fill,
  BsPeopleFill,
  BsMenuButtonWideFill,
  BsFillGearFill,
} from "react-icons/bs";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

const SidebarTeacher = ({ handleDeptSelection }) => {
  const { activeMenu, setActiveMenu, screenSize, currentColor } =
    useStateContext();

  const handleCloseSidebar = () => {
    if (activeMenu && screenSize <= 900) {
      setActiveMenu(false);
    }
    setActiveDept(null);
  };

  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white  text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";

  const [academicYears, setAcademicYears] = useState([
    {
      year: "First Year",
      departments: ["Information Technology"],
    },
    {
      year: "Second Year",
      departments: ["Information Technology"],
    },
    {
      year: "Third Year",
      departments: ["Information Technology"],
    },
    {
      year: "Fourth Year",
      departments: ["Information Technology"],
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

  const user = useSelector(selectUser);

  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tid, setTID] = useState(user.uid);

  // Fetch the data from the PHP backend
  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/Result-processing-system/Backend/api/module_taught.php?TID=${tid}`
        );
        const data = await response.json();
        setModules(data); // Save the fetched data into state
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the modules:", error);
        setLoading(false);
      }
    };

    fetchModules();
  }, [tid]); // Refetch whenever TID changes

  // Loading state
  if (loading) {
    return <div>Loading...</div>;
  }
  console.log(modules);
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
              <SiShopware /> <span>Tutor</span>
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
              Module Taught
            </p>

            <div>
              {modules.map((module) => (
                <div>
                  <Link to={`/Module/${module.ModuleCode}`}>
                    <li
                      style={{
                        backgroundColor:
                          activeDept === module.ModuleCode ? currentColor : "",
                        color: activeDept === module.ModuleCode ? "white" : "",
                      }}
                      className={
                        activeYear === module.ModuleCode
                          ? activeLink
                          : normalLink
                      }
                      // key={deptIndex}
                      onClick={() => {
                        handleDeptSelection(
                          module.ModuleCode,
                          module.ModuleName,
                          module.Year
                        );
                        setActiveDept(module.ModuleCode);
                      }}
                    >
                      <p>{module.ModuleName}</p>
                    </li>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SidebarTeacher;
