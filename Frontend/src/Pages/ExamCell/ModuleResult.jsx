import React, { useEffect, useState, useRef } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import Loader from "react-js-loader";
import Pending from "../img/pending.png";
import PopupDialog from "../../Components/PopupDialog";

function ModuleResult({ moduleC, year, department }) {
  const tableRef = useRef(null);

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // const apiUrl = `https://resultsystemdb.000webhostapp.com/examcell/getModuleMark.php?code=${moduleC}`;

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(apiUrl);
  //       const result = await response.json();
  //       setData(result);
  //       setIsLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, [moduleC]);

  // const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  // const hasPracticalMarks =
  //   data.length > 0 && data.some((student) => student.practical !== null);

  // const sendR = async () => {
  //   setIsConfirmDialogOpen(true);
  // };

  // const cancelInsert = () => {
  //   setIsConfirmDialogOpen(false);
  // };

  // const confirm = async () => {
  //   setIsConfirmDialogOpen(false);
  //   // Rest of your code
  //   try {
  //     const date = new Date().toISOString().split("T")[0];
  //     const tid = "RUB201204006";

  //     const url = `https://resultsystemdb.000webhostapp.com/examcell/tutorReminder.php?tid=${tid}&code=${moduleC}&date=${date}`;

  //     const response = await fetch(url);

  //     if (response.ok) {
  //       alert("Reminder send.");
  //     }
  //   } catch (error) {
  //     console.error("Error during login:", error.message);
  //   }
  // };

  return (
    <div>
      <div className="m-4">
        {isLoading ? (
          <div className={"item"}>
            <Loader
              bgColor="black"
              color="white"
              title={"spinner-cub"}
              size={100}
            />
          </div>
        ) : 1 > 0 ? (
          <>
            <p>{`Taught By Kezang Dema`}</p>
            <p>{`Tutor ID: 11223123`}</p>

            <table
              ref={tableRef}
              className="dark:bg-white min-w-full divide-y divide-gray-200"
            >
              <thead>
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-black">
                    Student No.
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-black">
                    Name
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-black">
                    CA
                  </th>
                  {/* {hasPracticalMarks && (
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-black">
                      Practical
                    </th>
                  )} */}
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-black">
                    Exam
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-black">
                    Total
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-black">
                    Credit
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-black">
                    Remark
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* {data.map((student, index) => (
                  <tr key={index}>
                    <td className="px-3 py-2 whitespace-nowrap text-xs font-medium text-black">
                      {student.sid}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs font-medium text-black">
                      {student.name}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs font-medium text-black">
                      {student.ca}
                    </td>
                    {hasPracticalMarks && (
                      <td className="px-3 py-2 whitespace-nowrap text-xs font-medium text-black">
                        {student.practical !== null ? student.practical : "-"}
                      </td>
                    )}
                    <td className="px-3 py-2 whitespace-nowrap text-xs font-medium text-black">
                      {student.exam}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs font-medium text-black">
                      {student.total}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs font-medium text-black">
                      {student.credit}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs font-medium text-black">
                      {student.remark}
                    </td>
                  </tr>
                ))} */}
              </tbody>
            </table>
            <div>
              <DownloadTableExcel
                filename={`${year}_${department}_${moduleC}`}
                sheet="users"
                currentTableRef={tableRef.current}
              >
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Export Excel
                </button>
              </DownloadTableExcel>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <img
              src={Pending}
              alt="pending"
              className="mb-4 w-24 h-24 object-contain"
            />
            <p className="text-lg font-semibold mb-2">MarKsheet Pending...</p>
            <button className="bg-blue-500 text-white py-2 px-4 rounded">
              Send Reminder
            </button>
          </div>
        )}
      </div>
      {/* <PopupDialog
        isOpen={isConfirmDialogOpen}
        onClose={cancelInsert}
        onYesClick={confirm}
        title="Confirm Insert"
        content="Send Reminder?"
      /> */}
    </div>
  );
}

export default ModuleResult;
