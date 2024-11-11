import React, { useRef, useState, useEffect } from "react";
import Loader from "react-js-loader";
import Pending from "../img/noData.png";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, ResponsiveContainer } from "recharts";

function Uploadedfile({ data, isLoading, year, moduleC }) {
  const tableRef = useRef(null);
  const [showAnalysis, setShowAnalysis] = useState(false); // State to control visibility of analysis

  const hasPracticalMarks = data.length > 0 && data.some((student) => student.Practical !== null);

  const [grades, setGrades] = useState([]);

  // Function to calculate grade distribution
  const calculateGradeDistribution = () => {
    let gradeA = 0;
    let gradeB = 0;
    let gradeC = 0;
    let fail = 0;

    data.forEach(student => {
      const total = student.total;
      if (total >= 80) gradeA++;
      else if (total >= 60) gradeB++;
      else if (total >= 0 && total <= 50) gradeC++; // Updated Grade C to 0-50 range
      else fail++;
    });

    setGrades([gradeA, gradeB, gradeC, fail]);
  };

  const pieData = [
    { name: "Grade A (80-100)", value: grades[0] },
    { name: "Grade B (60-79)", value: grades[1] },
    { name: "Fail (<50)", value: grades[3] }, // Fail category (below 0)
  ];

  const barData = data.map((student) => ({
    name: student.Sid,
    total: student.total,
  }));

  const lineData = data.map((student) => ({
    name: student.Sid,
    CA: student.CA,
    Exam: student.Exam,
  }));

  // Trigger grade distribution calculation once data is loaded
  useEffect(() => {
    if (data.length > 0) {
      calculateGradeDistribution();
    }
  }, [data]);

  return (
    <div className="m-4">
      {isLoading ? (
        <div className="item">
          <Loader bgColor="black" color="white" title={"spinner-cub"} size={100} />
        </div>
      ) : data.length > 0 ? (
        <>
          {/* Table */}
          <table ref={tableRef} className="dark:bg-white min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-black">Student No.</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-black">Name</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-black">CA</th>
                {hasPracticalMarks && <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-black">Practical</th>}
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-black">Exam</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-black">Total</th>
              </tr>
            </thead>
            <tbody>
              {data.map((student, index) => (
                <tr key={index}>
                  <td className="px-3 py-2 whitespace-nowrap text-xs font-medium text-black">{student.Sid}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-xs font-medium text-black">{student.name}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-xs font-medium text-black">{student.CA}</td>
                  {hasPracticalMarks && <td className="px-3 py-2 whitespace-nowrap text-xs font-medium text-black">{student.Practical !== null ? student.Practical : "-"}</td>}
                  <td className="px-3 py-2 whitespace-nowrap text-xs font-medium text-black">{student.Exam}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-xs font-medium text-black">{student.total}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Excel Download */}
          <div className="flex items-center mt-4">
            <DownloadTableExcel filename={`${moduleC}_Year_${year}`} sheet="users" currentTableRef={tableRef.current}>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Download Excel</button>
            </DownloadTableExcel>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setShowAnalysis(!showAnalysis)}
            >
              {showAnalysis ? "Hide Analysis" : "Analyze Performance"}
            </button>
          </div>

          

          {/* Data Analysis Section */}
          {showAnalysis && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Student Performance Analysis</h3>
              <div className="grid grid-cols-2 gap-4">
                {/* Pie Chart - Grade Distribution */}
                <div>
                  <h4 className="text-md font-semibold mb-2">Grade Distribution</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie data={pieData} dataKey="value" outerRadius={80} label>
                        <Cell fill="#4CAF50" />
                        <Cell fill="#FF9800" />
                        <Cell fill="#F44336" />
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Bar Chart - Total Marks */}
                <div>
                  <h4 className="text-md font-semibold mb-2">Total Marks Distribution</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={barData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="total" fill="#42A5F5" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Line Chart - CA vs Exam Marks */}
              <div className="mt-4">
                <h4 className="text-md font-semibold mb-2">Comparison of CA and Exam Marks</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={lineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="CA" stroke="#FF5722" />
                    <Line type="monotone" dataKey="Exam" stroke="#8BC34A" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <img src={Pending} alt="pending" className="mb-4 w-24 h-24 object-contain" />
          <p className="text-lg font-semibold mb-2">No File Uploaded...</p>
        </div>
      )}
    </div>
  );
}

export default Uploadedfile;
