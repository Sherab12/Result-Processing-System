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
  const apiUrl = "https://resultsystemdb.000webhostapp.com/examcell/dummy.php";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Loading indicator
  if (data.length === 0) {
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

  const modules = data[0].modules;

  // Check if any student has practical marks
  const hasPracticalMarks = data.some((student) =>
    student.modules.some((module) => module.marks.practical !== null)
  );

  // Add "showPractical" property to modules
  const adjustedModules = modules.map((module) => ({
    ...module,
    showPractical: hasPracticalMarks && module.marks.practical !== null,
  }));

  const countColumns = adjustedModules.reduce(
    (count, module) => count + (module.showPractical ? 4 : 3),
    0
  );

  const thsty =
    "px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-black";
  const valst = "px-2 py-1 whitespace-nowrap  text-xs font-medium text-black ";
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
            <th rowSpan="4" className={thsty}>
              Student No.
            </th>
            <th rowSpan="4" className={thsty}>
              Name
            </th>
            {adjustedModules.map((module, moduleIndex) => (
              <React.Fragment key={moduleIndex}>
                {module.showPractical && (
                  <th
                    colSpan="4"
                    className={thsty}
                  >{`${module.Module} - ${module.ModuleCode}`}</th>
                )}
                {!module.showPractical && (
                  <th
                    colSpan="3"
                    className={thsty}
                  >{`${module.Module} - ${module.ModuleCode}`}</th>
                )}
              </React.Fragment>
            ))}
            <th rowSpan="3" className={thsty}>
              TOTAL CV
            </th>
            <th rowSpan="4" className={thsty}>
              %
            </th>
            <th rowSpan="4" className={thsty}>
              Results
            </th>
          </tr>

          {hasPracticalMarks && (
            <>
              <tr>
                {adjustedModules.map((module, moduleIndex) => (
                  <React.Fragment key={moduleIndex}>
                    {module.showPractical && (
                      <th colSpan="3" className={thsty}>
                        Credit Value:
                      </th>
                    )}
                    {module.showPractical && (
                      <th colSpan="1" className={thsty}>
                        {/* {`${module.totalCredit}`} */}
                        12
                      </th>
                    )}
                    {!module.showPractical && (
                      <th colSpan="2" className={thsty}>
                        Credit Value:
                      </th>
                    )}
                    {!module.showPractical && (
                      <th colSpan="1" className={thsty}>
                        {/* {`${module.totalCredit}`} */}
                        12
                      </th>
                    )}
                  </React.Fragment>
                ))}
              </tr>

              <tr>
                {adjustedModules.map((module, moduleIndex) => (
                  <React.Fragment key={moduleIndex}>
                    {module.showPractical && <th className={thsty}>CA</th>}
                    {module.showPractical && <th className={thsty}>PR</th>}
                    {module.showPractical && <th className={thsty}>EX</th>}
                    {module.showPractical && <th className={thsty}>TL</th>}
                    {!module.showPractical && <th className={thsty}>CA</th>}
                    {!module.showPractical && <th className={thsty}>EX</th>}
                    {!module.showPractical && <th className={thsty}>TL</th>}
                  </React.Fragment>
                ))}
              </tr>
            </>
          )}

          <tr>
            {adjustedModules.map((module, moduleIndex) => (
              <React.Fragment key={moduleIndex}>
                {module.showPractical && (
                  <th className={thsty}>{`MM: ${module.maxMarks.maxCA}`}</th>
                )}
                {module.showPractical && (
                  <th
                    className={thsty}
                  >{`MM: ${module.maxMarks.maxPractical}`}</th>
                )}
                {module.showPractical && (
                  <th className={thsty}>{`MM: ${module.maxMarks.maxExam}`}</th>
                )}
                {module.showPractical && <th className={thsty}>MM:100</th>}
                {!module.showPractical && (
                  <th className={thsty}>{`MM: ${module.maxMarks.maxCA}`}</th>
                )}
                {!module.showPractical && (
                  <th className={thsty}>{`MM: ${module.maxMarks.maxExam}`}</th>
                )}
                {!module.showPractical && <th className={thsty}>MM:100</th>}
              </React.Fragment>
            ))}
            {data.map((module, moduleIndex) => (
              <React.Fragment key={moduleIndex}>
                {moduleIndex === 0 && (
                  <th className={thsty} rowSpan={data.length}>
                    {/* {module.totalCredits} */}
                    1200
                  </th>
                )}
              </React.Fragment>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((student, index) => (
            <tr key={index}>
              <td className={valst}>{student.id}</td>
              <td className={valst}>{student.name}</td>

              {adjustedModules.map((module, moduleIndex) => (
                <React.Fragment key={moduleIndex}>
                  <td className={valst}>{module.marks.ca}</td>
                  {module.showPractical && (
                    <td className={valst}>{module.marks.practical}</td>
                  )}
                  <td className={valst}>{module.marks.exam}</td>
                  <td className={valst}>{module.total}</td>
                </React.Fragment>
              ))}

              <td className={valst}>{student.semCredits}</td>
              <td className={valst}>{student.semPercentage}</td>
              <td className={valst}>{student.PassSemester}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <DownloadTableExcel
          filename={`${year} ${department}`}
          sheet="users"
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
