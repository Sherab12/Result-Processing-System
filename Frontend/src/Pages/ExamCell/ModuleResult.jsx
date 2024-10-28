import React, { useEffect, useState, useRef } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import Loader from "react-js-loader";
import Pending from "../img/pending.png";

function ModuleResult({ moduleC, year, department }) {
  const tableRef = useRef(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const apiUrl = `http://localhost:8080/Result-processing-system/Backend/api/getModuleMark.php`;

  const moduleTutorMapping = {
    DIS404: { tutorName: "Kezang Dema", tutorID: "RUB201001001" },
    CTE411: { tutorName: "Manoj Chhetri", tutorID: "RUB201001002" },
    MAT412: { tutorName: "Jigme Namgyal", tutorID: "RUB201001003" },
    ITM403: { tutorName: "Yogita Tiwari", tutorID: "RUB201001004" },
    ITM404: { tutorName: "Yeshi Jamtsho", tutorID: "RUB201001005" },
  };

  const tutorInfo = moduleTutorMapping[moduleC] || {
    tutorName: "Unknown",
    tutorID: "Unknown",
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            code: moduleC,
          }),
        });

        if (response.ok) {
          const result = await response.json();
          if (result.message) {
            console.log(result.message);
            setData([]); // Set data to an empty array if no marks found
          } else {
            setData(result);
          }
        } else {
          const errorMessage = await response.text();
          console.error(
            "Error fetching data:",
            response.statusText,
            errorMessage
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [moduleC]);

  const hasPracticalMarks =
    data.length > 0 && data.some((student) => student.Practical !== null);

  return (
    <div>
      <div className="m-4">
        {isLoading ? (
          <Loader
            bgColor="black"
            color="white"
            title={"spinner-cub"}
            size={100}
          />
        ) : data.length > 0 ? (
          <>
            {/* Use the tutor info based on the module code */}
            <p>{`Taught By ${tutorInfo.tutorName}`}</p>
            <p>{`Tutor ID: ${tutorInfo.tutorID}`}</p>

            <table
              ref={tableRef}
              className="dark:bg-white min-w-full divide-y divide-gray-200"
            >
              <thead>
                <tr>
                  <th>Student No.</th>
                  <th>Name</th>
                  <th>CA</th>
                  {hasPracticalMarks && <th>Practical</th>}
                  <th>Exam</th>
                  <th>Total</th>
                  <th>Credit</th>
                  <th>Remark</th>
                </tr>
              </thead>
              <tbody>
                {data.map((student, index) => (
                  <tr key={index}>
                    <td>{student.Sid}</td>
                    <td>{student.name}</td>
                    <td>{student.CA}</td>
                    {hasPracticalMarks && (
                      <td>
                        {student.Practical !== null ? student.Practical : "-"}
                      </td>
                    )}
                    <td>{student.Exam}</td>
                    <td>{student.total}</td>
                    <td>12</td>
                    <td>{student.total >= 50 ? "Pass" : "Fail"}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <DownloadTableExcel
              filename={`${year}_${department}_${moduleC}`}
              sheet="moduleC"
              currentTableRef={tableRef.current}
            >
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Export Excel
              </button>
            </DownloadTableExcel>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <img
              src={Pending}
              alt="pending"
              className="mb-4 w-24 h-24 object-contain"
            />
            <p className="text-lg font-semibold mb-2">Marks Pending...</p>
            <button className="bg-blue-500 text-white py-2 px-4 rounded">
              Send Reminder
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ModuleResult;
