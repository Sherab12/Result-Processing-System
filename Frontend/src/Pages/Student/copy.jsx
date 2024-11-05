import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { selectUser } from "../../features/userSlice";
import { useSelector } from "react-redux";

const dummyResults = {
  "First Year": {
    semOne: [
      {
        name: "Dzongkha for Communication",
        Mcode: "DZG101",
        CA: 25,
        Exam: 50,
        Practical: 15,
        total: 90,
      },
      {
        name: "Calculus and Infinite Series",
        Mcode: "MAT101",
        CA: 30,
        Exam: 60,
        total: 90,
      },
      {
        name: "Engineering Physics-I",
        Mcode: "PHY101",
        CA: 40,
        Exam: 55,
        total: 95,
      },
      { name: "Academic Skills", Mcode: "ASC101", CA: 28, Exam: 50, total: 78 },
      {
        name: "Introduction to Programming",
        Mcode: "CPL101",
        CA: 30,
        Exam: 65,
        Practical: 20,
        total: 115,
      },
    ],
    semTwo: [
      {
        name: "Object-Oriented Programming",
        Mcode: "CPL103",
        CA: 32,
        Exam: 55,
        Practical: 15,
        total: 102,
      },
      {
        name: "Engineering Mathematics-II",
        Mcode: "MAT102",
        CA: 35,
        Exam: 60,
        total: 95,
      },
      {
        name: "Discrete Mathematics",
        Mcode: "MAT107",
        CA: 33,
        Exam: 52,
        total: 85,
      },
      {
        name: "Electrical Workshop",
        Mcode: "EWP101",
        CA: 20,
        Exam: 45,
        total: 65,
      },
      {
        name: "Digital Electronics and Logic Design",
        Mcode: "ECD202",
        CA: 30,
        Exam: 50,
        total: 80,
      },
    ],
  },
  "Second Year": {
    semOne: [
      {
        name: "Human Computer Interaction",
        Mcode: "CTE203",
        CA: 30,
        Exam: 55,
        total: 85,
      },
      {
        name: "Statistics & Theory of Probability",
        Mcode: "MAT205",
        CA: 28,
        Exam: 50,
        total: 78,
      },
      {
        name: "Data Structures & Algorithms",
        Mcode: "CTE202",
        CA: 30,
        Exam: 60,
        total: 90,
      },
      {
        name: "Computer Communication Networks",
        Mcode: "CCN101",
        CA: 35,
        Exam: 55,
        total: 90,
      },
      {
        name: "Dzongkha for Communication",
        Mcode: "DZG101",
        CA: 40,
        Exam: 50,
        total: 90,
      },
    ],
    semTwo: [
      {
        name: "Database Management Systems",
        Mcode: "DIS201",
        CA: 28,
        Exam: 57,
        Practical: 20,
        total: 105,
      },
      {
        name: "Operating Systems",
        Mcode: "CTE203",
        CA: 30,
        Exam: 50,
        total: 80,
      },
      {
        name: "Internet Technologies & Web Engineering",
        Mcode: "CTE204",
        CA: 25,
        Exam: 60,
        Practical: 18,
        total: 103,
      },
      {
        name: "Computer Communication Networks",
        Mcode: "NWC201",
        CA: 32,
        Exam: 53,
        total: 85,
      },
      {
        name: "Environmental Science",
        Mcode: "EVS301",
        CA: 27,
        Exam: 52,
        total: 79,
      },
    ],
  },
  "Third Year": {
    semOne: [
      {
        name: "Professionalism & Ethics in IT",
        Mcode: "ITM301",
        CA: 35,
        Exam: 55,
        total: 90,
      },
      {
        name: "Machine Learning",
        Mcode: "CTE309",
        CA: 40,
        Exam: 60,
        total: 100,
      },
      {
        name: "Mobile Application Development",
        Mcode: "CTE308",
        CA: 38,
        Exam: 55,
        total: 93,
      },
      {
        name: "Entrepreneurship Development",
        Mcode: "EDP101",
        CA: 30,
        Exam: 50,
        total: 80,
      },
      {
        name: "System Administration",
        Mcode: "ITM302",
        CA: 32,
        Exam: 56,
        total: 88,
      },
    ],
    semTwo: [
      {
        name: "Database Management Systems",
        Mcode: "DIS201",
        CA: 33,
        Exam: 55,
        total: 88,
      },
      {
        name: "Operating Systems",
        Mcode: "CTE203",
        CA: 35,
        Exam: 55,
        total: 90,
      },
      {
        name: "Internet Technologies & Web Engineering",
        Mcode: "CTE204",
        CA: 30,
        Exam: 60,
        total: 90,
      },
      {
        name: "Computer Communication Networks",
        Mcode: "NWC201",
        CA: 28,
        Exam: 55,
        total: 83,
      },
      {
        name: "Environmental Science",
        Mcode: "EVS301",
        CA: 30,
        Exam: 52,
        total: 82,
      },
    ],
  },
};

const moduleNames = {
  DIS404: "Management Information Systems",
  CTE411: "Artificial Intelligence (Elective II)",
  MAT412: "Optimization Techniques",
  ITM403: "Financial Management and Accounts",
  ITM404: "Professional Practices in IT",
};

function Resultpage({ Year }) {
  const [resultsSemOne, setResultsSemOne] = useState([]);
  const [resultsSemTwo, setResultsSemTwo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = useSelector(selectUser);

  useEffect(() => {
    if (Year === "Fourth Year") {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `http://localhost:8080/Result-processing-system/Backend/api/studentResult.php?stdno=${user.uid}`
          );
          const data = await response.json();
          setResultsSemOne(data);
          //   setResultsSemTwo(data.filter((result) => result.semester === "2"));
        } catch (err) {
          setError("Failed to fetch data");
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    } else {
      // Set dummy results based on Year for both semesters
      const yearResults = dummyResults[Year];
      if (yearResults) {
        setResultsSemOne(yearResults.semOne || []);
        setResultsSemTwo(yearResults.semTwo || []);
      }
      setLoading(false);
    }
  }, [Year, user.uid]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const calculateTotals = (results) => {
    const grandTotal = results.reduce(
      (acc, module) => acc + module.total * 12,
      0
    );
    const maxTotal = 6000;
    const aggregate = (grandTotal / maxTotal) * 100;
    return { grandTotal, maxTotal, aggregate };
  };

  const { grandTotal: grandTotalSemOne, aggregate: aggregateSemOne } =
    calculateTotals(resultsSemOne);
  const { grandTotal: grandTotalSemTwo, aggregate: aggregateSemTwo } =
    calculateTotals(resultsSemTwo);

  return (
    <div className="result-page">
      <h2>Semester: 1</h2>
      <ResultTable
        year={Year}
        results={resultsSemOne}
        grandTotal={grandTotalSemOne}
        aggregate={aggregateSemOne}
      />

      <h2>Semester: 2</h2>
      <ResultTable
        results={resultsSemTwo}
        grandTotal={grandTotalSemTwo}
        aggregate={aggregateSemTwo}
      />

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

function ResultTable({ results, grandTotal, aggregate, year }) {
  return (
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
          const moduleName =
            year === "Fourth Year"
              ? moduleNames[module.Mcode] || module.Mcode
              : module.name;

          return (
            <React.Fragment key={index}>
              <tr>
                <td rowSpan={module.Practical ? 3 : 2}>{moduleName}</td>
                <td rowSpan={module.Practical ? 3 : 2}>{module.Mcode}</td>
                <td rowSpan={module.Practical ? 3 : 2}>12</td>
                <td>CA</td>
                <td>{module.Practical ? "35" : "50"}</td>
                <td>{module.CA}</td>
                <td>{module.CA >= 20 ? "Pass" : "Fail"}</td>
                <td rowSpan={module.Practical ? 3 : 2}>{module.total}</td>
                <td rowSpan={module.Practical ? 3 : 2}>{module.total * 12}</td>
                <td rowSpan={module.Practical ? 3 : 2}>1200</td>
                <td rowSpan={module.Practical ? 3 : 2}>
                  {module.total >= 50 ? "Pass" : "Fail"}
                </td>
              </tr>
              {module.Practical && (
                <tr>
                  <td>Practical</td>
                  <td>25</td>
                  <td>{module.Practical}</td>
                  <td>{module.Practical >= 8 ? "Pass" : "Fail"}</td>
                </tr>
              )}
              <tr>
                <td>Exam</td>
                <td>{module.Practical ? "40" : "50"}</td>
                <td>{module.Exam}</td>
                <td>{module.Exam >= 20 ? "Pass" : "Fail"}</td>
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
          <td>6000</td>
        </tr>
        <tr>
          <td colSpan="9" className="text-right">
            Aggregate:
          </td>
          <td>{aggregate.toFixed(2)}%</td>
        </tr>
      </tfoot>
    </table>
  );
}

export default Resultpage;
