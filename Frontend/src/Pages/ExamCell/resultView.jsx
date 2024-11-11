import React, { useEffect, useState, useRef } from "react";
import "./resultView.css";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { useStateContext } from "../../Contexts/ContextProvider";
import Loader from "react-js-loader";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell, Tooltip as PieTooltip, Legend as PieLegend } from 'recharts';

const ResultView = ({ department, year, semester }) => {
  const tableRef = useRef(null);

  const { activeMenu, setActiveMenu, screenSize, currentColor } = useStateContext();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [analysisData, setAnalysisData] = useState(null); // Store analysis data
  const [passFailData, setPassFailData] = useState({ pass: 0, fail: 0 }); // Store overall pass/fail data
  const [isAnalysisVisible, setIsAnalysisVisible] = useState(false); // Control visibility of analysis charts
  const [buttonText, setButtonText] = useState("Analyze Results"); // Control button text

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

  // Analyze function: This will compute average module performance for the analysis and pass/fail rates
  const analyzeData = () => {
    const modulePerformance = {};
    let passCount = 0;
    let failCount = 0;

    students.forEach(student => {
      student.modules.forEach(module => {
        const moduleName = moduleNames[module.Mcode] || "Unknown Module";
        const isPassed = module.total >= passingMarks;

        // Track pass/fail counts for overall pie chart
        if (isPassed) passCount++;
        else failCount++;

        if (!modulePerformance[moduleName]) {
          modulePerformance[moduleName] = { pass: 0, fail: 0 };
        }

        // Count pass/fail based on the module total marks
        if (isPassed) modulePerformance[moduleName].pass++;
        else modulePerformance[moduleName].fail++;
      });
    });

    setAnalysisData(modulePerformance); // Update the state with analyzed data
    setPassFailData({ pass: passCount, fail: failCount }); // Set overall pass/fail data
    setIsAnalysisVisible(true); // Show the analysis charts
    setButtonText("Back"); // Change button text to "Back"
  };

  // Toggle function for "Back" functionality
  const toggleAnalysisVisibility = () => {
    if (isAnalysisVisible) {
      setIsAnalysisVisible(false); // Hide the charts when the "Back" button is clicked
      setButtonText("Analyze Results"); // Change button text back to "Analyze"
    }
  };

  return (
    <div className="m-4 ">
      <div className="m-2">
        <p className="m-2">{department}</p>
        <p className="m-2">{year}</p>
      </div>

      <div className="table-container overflow-x-auto">
        <table ref={tableRef} className="dark:bg-white min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th rowSpan="2" className={thsty}>Student No.</th>
              <th rowSpan="2" className={thsty}>Name</th>
              {students[0]?.modules.map((module, index) => (
                <React.Fragment key={index}>
                  {module.Practical !== null ? (
                    <th colSpan="6" className={thsty}>{module.Mcode} - {moduleNames[module.Mcode]}</th>
                  ) : (
                    <th colSpan="5" className={thsty}>{module.Mcode} - {moduleNames[module.Mcode]}</th>
                  )}
                </React.Fragment>
              ))}
              <th rowSpan="2" className={thsty}>Percentage</th>
              <th rowSpan="2" className={thsty}>Remarks</th>
            </tr>
            <tr>
              {students[0]?.modules.map((module, index) => (
                <React.Fragment key={index}>
                  <th className={thsty}>CA</th>
                  {module.Practical !== null && <th className={thsty}>Practical</th>}
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
                      {module.Practical !== null && <td className={valst}>{module.Practical || "-"}</td>}
                      <td className={valst}>{module.Exam}</td>
                      <td className={valst}>{module.total}</td>
                      <td className={valst}>12</td>
                      <td className={valst}>{module.total * 12}</td>
                    </React.Fragment>
                  ))}
                  <td className={valst}>{percentage.toFixed(2)}%</td>
                  <td className={valst}>{percentage >= 50 ? "Pass" : "Fail"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-start gap-4">
        {/* Analyze/Back Button */}
        <button
          onClick={isAnalysisVisible ? toggleAnalysisVisibility : analyzeData}
          style={{
            backgroundColor: currentColor,
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            cursor: "pointer",
          }}
        >
          {buttonText}
        </button>

        {/* Export Excel Button */}
        <DownloadTableExcel
          filename="student-results"
          sheet="Sheet1"
          currentTableRef={tableRef.current}
        >
          <button
            style={{
              backgroundColor: currentColor,
              color: "#fff",
              padding: "10px 20px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Export to Excel
          </button>
        </DownloadTableExcel>
      </div>

      {isAnalysisVisible && (
        <div className="mt-6 flex justify-between gap-4">
          {/* Module-wise pass/fail bar chart */}
          <div style={{ width: '48%', height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={Object.keys(analysisData).map(module => ({
                  module,
                  pass: analysisData[module].pass,
                  fail: analysisData[module].fail,
                }))}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="module" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pass" fill="#4CAF50" />
                <Bar dataKey="fail" fill="#F44336" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Overall Pass/Fail Pie Chart */}
          <div style={{ width: '48%', height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Pass', value: passFailData.pass },
                    { name: 'Fail', value: passFailData.fail },
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  <Cell fill="#4CAF50" />
                  <Cell fill="#F44336" />
                </Pie>
                <PieTooltip />
                <PieLegend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultView;
