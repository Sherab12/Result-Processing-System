import React, { useEffect, useState, useRef } from "react";
import "./resultView.css";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { useStateContext } from "../../Contexts/ContextProvider";
import Loader from "react-js-loader";

const ResultView = ({ department, year, semester }) => {
  const tableRef = useRef(null);

  const { activeMenu, setActiveMenu, screenSize, currentColor } =
    useStateContext();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const apiUrl = `http://localhost:8080/Result-processing-system/Backend/api/resultView.php`;

  // Static mapping of module codes to module names
  const moduleNames = {
    DIS404: "Management Information Systems",
    CTE411: "Artificial Intelligence (Elective II)",
    MAT412: "Optimization Techniques",
    ITM403: "Financial Management and Accounts",
    ITM404: "Professional Practices in IT",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const result = await response.json();
        setData(result);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Grouping students by Sid (Student ID)
  const groupedData = data.reduce((acc, curr) => {
    const { Sid, name, Mcode, CA, Exam, Practical, total } = curr;
    if (!acc[Sid]) {
      acc[Sid] = { Sid, name, modules: [] };
    }
    acc[Sid].modules.push({ Mcode, CA, Exam, Practical, total });
    return acc;
  }, {});

  const students = Object.values(groupedData); // Convert grouped data into array

  const passingMarks = 50; // Define the passing marks threshold (can be customized)

  const thsty =
    "px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-black";
  const valst = "px-2 py-1 whitespace-nowrap text-xs font-medium text-black";

  // Loading indicator
  if (isLoading) {
    return (
      <div className={"item"}>
        <Loader
          bgColor="black"
          color="white"
          title={"spinner-cub"}
          size={100}
        />
      </div>
    );
  }

  return (
    <div className="m-4 ">
      <div className="m-2">
        <p className="m-2">{department}</p>
        <p className="m-2">{year}</p>
      </div>
      <table
        ref={tableRef}
        className="dark:bg-white min-w-full divide-y divide-gray-200"
      >
        <thead>
          <tr>
            <th rowSpan="2" className={thsty}>
              Student No.
            </th>
            <th rowSpan="2" className={thsty}>
              Name
            </th>
            {students[0]?.modules.map((module, index) => (
              <React.Fragment key={index}>
                {/* Only render Practical column if the module has practical marks */}
                {module.Practical !== null ? (
                  <th colSpan="6" className={thsty}>
                    {module.Mcode} -{" "}
                    {moduleNames[module.Mcode] || "Unknown Module"}
                  </th>
                ) : (
                  <th colSpan="5" className={thsty}>
                    {module.Mcode} -{" "}
                    {moduleNames[module.Mcode] || "Unknown Module"}
                  </th>
                )}
              </React.Fragment>
            ))}
            <th rowSpan="2" className={thsty}>
              Percentage
            </th>
            <th rowSpan="2" className={thsty}>
              Remarks
            </th>
          </tr>

          <tr>
            {students[0]?.modules.map((module, index) => (
              <React.Fragment key={index}>
                <th className={thsty}>CA</th>
                {module.Practical !== null && (
                  <th className={thsty}>Practical</th>
                )}
                <th className={thsty}>Exam</th>
                <th className={thsty}>Total Marks</th>
                <th className={thsty}>Credits</th>
                <th className={thsty}>Total CM</th>
              </React.Fragment>
            ))}
          </tr>
        </thead>

        <tbody>
          {students.map((student, index) => {
            // Calculate total marks and percentage for each student
            const totalMarks = student.modules.reduce(
              (sum, module) => sum + parseFloat(module.total),
              0
            );
            const numberOfModules = student.modules.length;
            const percentage = (totalMarks / (numberOfModules * 100)) * 100;

            return (
              <tr key={index}>
                <td className={valst}>{student.Sid}</td>
                <td className={valst}>{student.name}</td>
                {student.modules.map((module, moduleIndex) => (
                  <React.Fragment key={moduleIndex}>
                    <td className={valst}>{module.CA}</td>
                    {module.Practical !== null && (
                      <td className={valst}>{module.Practical || "-"}</td>
                    )}
                    <td className={valst}>{module.Exam}</td>
                    <td className={valst}>{module.total}</td>
                    <td className={valst}>12</td>
                    <td className={valst}>{module.total * 12}</td>
                  </React.Fragment>
                ))}
                <td className={valst}>
                  {/* Display calculated percentage */}
                  {percentage.toFixed(2)}%
                </td>
                <td className={valst}>
                  {/* Remarks column logic */}
                  {percentage >= 50 ? "Pass" : "Fail"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <DownloadTableExcel
          filename={`${year} ${department}`}
          sheet="students"
          currentTableRef={tableRef.current}
        >
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Export Excel
          </button>
        </DownloadTableExcel>
      </div>
    </div>
  );
};

export default ResultView;
