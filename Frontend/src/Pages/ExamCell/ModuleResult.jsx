import React, { useEffect, useState, useRef } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import Loader from "react-js-loader";
import Pending from "../img/pending.png";

function ModuleResult({ moduleC, year, department }) {
  const tableRef = useRef(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const apiUrl =
    "http://localhost:8080/Result-processing-system/Backend/api/getModuleMark.php";
  const updateUrl =
    "http://localhost:8080/Result-processing-system/Backend/api/updateModuleMark.php";

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
          body: new URLSearchParams({ code: moduleC }),
        });

        if (response.ok) {
          const result = await response.json();
          setData(result.message ? [] : result);
        } else {
          console.error("Error fetching data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [moduleC]);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (index, field, value) => {
    const newData = [...data];
    newData[index][field] = value;
    setData(newData);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(updateUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
      });

      if (response.ok) {
        alert("Data updated successfully");
      } else {
        console.error("Error updating data:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating data:", error);
    } finally {
      setIsEditing(false);
    }
  };

  const hasPracticalMarks = data.some((student) => student.Practical !== null);

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
                    <td>
                      <input
                        type="number"
                        value={student.CA}
                        disabled={!isEditing}
                        onChange={(e) =>
                          handleInputChange(index, "CA", e.target.value)
                        }
                        style={{ padding: 0, margin: 0, width: "40px" }}
                      />
                    </td>
                    {hasPracticalMarks && (
                      <td>
                        <input
                          type="number"
                          value={student.Practical || ""}
                          disabled={!isEditing}
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              "Practical",
                              e.target.value
                            )
                          }
                          style={{ padding: 0, margin: 0, width: "60px" }}
                        />
                      </td>
                    )}
                    <td>
                      <input
                        type="number"
                        value={student.Exam}
                        disabled={!isEditing}
                        onChange={(e) =>
                          handleInputChange(index, "Exam", e.target.value)
                        }
                        style={{ padding: 0, margin: 0, width: "40px" }}
                      />
                    </td>
                    <td>{student.total}</td>
                    <td>12</td>
                    <td>{student.total >= 50 ? "Pass" : "Fail"}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              onClick={isEditing ? handleSave : handleEditClick}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              {isEditing ? "Save" : "Edit"}
            </button>

            <DownloadTableExcel
              filename={`${year}_${department}_${moduleC}`}
              sheet="moduleC"
              currentTableRef={tableRef.current}
            >
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 ml-4">
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
