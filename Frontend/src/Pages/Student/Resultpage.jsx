import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { selectUser } from "../../features/userSlice";
import { useSelector } from "react-redux";

function Resultpage({ Year, semOne, semTwo }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = useSelector(selectUser);

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
        const response = await fetch(
          `http://localhost:8080/Result-processing-system/Backend/api/studentResult.php?stdno=${user.uid}`
        );
        const data = await response.json();
        setResults(data);
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user.uid]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const grandTotal = results.reduce(
    (acc, module) => acc + module.total * 12,
    0
  );

  const maxTotal = 6000;
  const aggregate = (grandTotal / maxTotal) * 100;

  return (
    <div className="result-page">
      <div>Semester: 1</div>
      <table className="result-table">
        <thead>
          <tr>
            <th>Name of Module</th>
            <th>Module Code</th>
            <th>Credits</th>
            <th>Type</th>
            <th>Max. Marks</th>
            <th>Marks Secured</th>
            <th>Individual Remarks</th>
            <th>Total Marks</th>
            <th>Total CM</th>
            <th>Total CM Max Marks</th>
            <th>Final Remarks</th>
          </tr>
        </thead>
        <tbody>
          {results.map((module, index) => {
            const moduleName = moduleNames[module.Mcode] || module.Mcode; // Lookup module name

            return (
              <React.Fragment key={index}>
                <tr>
                  <td
                    rowSpan={module.Practical && module.Practical !== 0 ? 3 : 2}
                  >
                    {moduleName}
                  </td>
                  <td
                    rowSpan={module.Practical && module.Practical !== 0 ? 3 : 2}
                  >
                    {module.Mcode}
                  </td>
                  <td
                    rowSpan={module.Practical && module.Practical !== 0 ? 3 : 2}
                  >
                    12
                  </td>
                  <td>CA</td>
                  <td>
                    {module.Practical && module.Practical !== 0 ? "35" : "50"}
                  </td>
                  <td>{module.CA}</td>
                  <td>
                    {module.CA === 0
                      ? module.Exam >= 14
                        ? "Pass"
                        : "Fail"
                      : module.Exam >= 20
                      ? "Pass"
                      : "Fail"}
                  </td>
                  <td
                    rowSpan={module.Practical && module.Practical !== 0 ? 3 : 2}
                  >
                    {module.total}
                  </td>
                  <td
                    rowSpan={module.Practical && module.Practical !== 0 ? 3 : 2}
                  >
                    {module.total * 12}
                  </td>
                  <td
                    rowSpan={module.Practical && module.Practical !== 0 ? 3 : 2}
                  >
                    1200
                  </td>
                  <td
                    rowSpan={module.Practical && module.Practical !== 0 ? 3 : 2}
                  >
                    {module.total >= 50 ? "Pass" : "Fail"}
                  </td>
                </tr>
                {module.Practical && module.Practical !== 0 && (
                  <tr>
                    <td>Practical</td>
                    <td>25</td>
                    <td>{module.Practical}</td>
                    <td>{module.Practical >= 8 ? "Pass" : "Fail"}</td>
                  </tr>
                )}
                <tr>
                  <td>Exam</td>
                  <td>
                    {module.Practical && module.Practical !== 0 ? "40" : "50"}
                  </td>
                  <td>{module.Exam}</td>
                  <td>
                    {module.Practical === 0
                      ? module.Exam >= 20
                        ? "Pass"
                        : "Fail"
                      : module.Exam >= 16
                      ? "Pass"
                      : "Fail"}
                  </td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="8" className="text-right">
              Grand Total:
            </td>
            <td>{grandTotal}</td>
            <td>{maxTotal}</td>
          </tr>
          <tr>
            <td colSpan="9" className="text-right">
              Aggregate:
            </td>
            <td>{aggregate}%</td>
          </tr>
        </tfoot>
      </table>

      <div>Semester: 2</div>
      <table className="result-table">
        <thead>
          <tr>
            <th>Name of Module</th>
            <th>Module Code</th>
            <th>Credits</th>
            <th>Type</th>
            <th>Max. Marks</th>
            <th>Marks Secured</th>
            <th>Individual Remarks</th>
            <th>Total Marks</th>
            <th>Total CM</th>
            <th>Total CM Max Marks</th>
            <th>Final Remarks</th>
          </tr>
        </thead>
        <tbody>
          {results.map((module, index) => {
            const moduleName = moduleNames[module.Mcode] || module.Mcode; // Lookup module name

            return (
              <React.Fragment key={index}>
                <tr>
                  <td
                    rowSpan={module.Practical && module.Practical !== 0 ? 3 : 2}
                  >
                    {moduleName}
                  </td>
                  <td
                    rowSpan={module.Practical && module.Practical !== 0 ? 3 : 2}
                  >
                    {module.Mcode}
                  </td>
                  <td
                    rowSpan={module.Practical && module.Practical !== 0 ? 3 : 2}
                  >
                    12
                  </td>
                  <td>CA</td>
                  <td>
                    {module.Practical && module.Practical !== 0 ? "35" : "50"}
                  </td>
                  <td>{module.CA}</td>
                  <td>
                    {module.CA === 0
                      ? module.Exam >= 14
                        ? "Pass"
                        : "Fail"
                      : module.Exam >= 20
                      ? "Pass"
                      : "Fail"}
                  </td>
                  <td
                    rowSpan={module.Practical && module.Practical !== 0 ? 3 : 2}
                  >
                    {module.total}
                  </td>
                  <td
                    rowSpan={module.Practical && module.Practical !== 0 ? 3 : 2}
                  >
                    {module.total * 12}
                  </td>
                  <td
                    rowSpan={module.Practical && module.Practical !== 0 ? 3 : 2}
                  >
                    1200
                  </td>
                  <td
                    rowSpan={module.Practical && module.Practical !== 0 ? 3 : 2}
                  >
                    {module.total >= 50 ? "Pass" : "Fail"}
                  </td>
                </tr>
                {module.Practical && module.Practical !== 0 && (
                  <tr>
                    <td>Practical</td>
                    <td>25</td>
                    <td>{module.Practical}</td>
                    <td>{module.Practical >= 8 ? "Pass" : "Fail"}</td>
                  </tr>
                )}
                <tr>
                  <td>Exam</td>
                  <td>
                    {module.Practical && module.Practical !== 0 ? "40" : "50"}
                  </td>
                  <td>{module.Exam}</td>
                  <td>
                    {module.Practical === 0
                      ? module.Exam >= 20
                        ? "Pass"
                        : "Fail"
                      : module.Exam >= 16
                      ? "Pass"
                      : "Fail"}
                  </td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="8" className="text-right">
              Grand Total:
            </td>
            <td>{grandTotal}</td>
            <td>{maxTotal}</td>
          </tr>
          <tr>
            <td colSpan="9" className="text-right">
              Aggregate:
            </td>
            <td>{aggregate}%</td>
          </tr>
        </tfoot>
      </table>

      <style jsx>{`
        .result-page {
          padding: 20px;
          font-family: Arial, sans-serif;
        }
        .result-table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
        }
        .result-table th,
        .result-table td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: center;
          font-weight: normal;
        }
        .result-table thead th {
          background-color: #2c3e50;
          color: white;
        }
        .text-right {
          text-align: right;
          padding-right: 10px;
        }
      `}</style>
    </div>
  );
}

export default Resultpage;
