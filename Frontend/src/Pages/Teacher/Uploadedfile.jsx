import React, { useEffect, useRef, useState } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import Loader from "react-js-loader";
import Pending from "../img/noData.png";
import PopupDialog from "../../Components/PopupDialog";

function Uploadedfile({ data, isLoading, year, moduleC, department, user }) {
  const tableRef = useRef(null);
  const hasPracticalMarks =
    data.length > 0 && data.some((student) => student.Practical !== null);

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
        ) : data.length > 0 ? (
          <>
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
                  {hasPracticalMarks && (
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-black">
                      Practical
                    </th>
                  )}
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-black">
                    Exam
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-black">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((student, index) => (
                  <tr key={index}>
                    <td className="px-3 py-2 whitespace-nowrap text-xs font-medium text-black">
                      {student.Sid}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs font-medium text-black">
                      {student.name}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs font-medium text-black">
                      {student.CA}
                    </td>
                    {hasPracticalMarks && (
                      <td className="px-3 py-2 whitespace-nowrap text-xs font-medium text-black">
                        {student.Practical !== null ? student.Practical : "-"}
                      </td>
                    )}
                    <td className="px-3 py-2 whitespace-nowrap text-xs font-medium text-black">
                      {student.Exam}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-xs font-medium text-black">
                      {student.total}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex items-center">
              <DownloadTableExcel
                filename={`${moduleC}_Year_${year}`}
                sheet="users"
                currentTableRef={tableRef.current}
              >
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                  Download Excel
                </button>
              </DownloadTableExcel>

              {/* <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={onDelete}
              >
                Delete
              </button> */}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <img
              src={Pending}
              alt="pending"
              className="mb-4 w-24 h-24 object-contain"
            />
            <p className="text-lg font-semibold mb-2">No FileUploaded...</p>
          </div>
        )}
        {/* <PopupDialog
          isOpen={isConfirmDialogOpen}
          onClose={cancelDelete}
          onYesClick={confirmDelete}
          title="Confirm Delete"
          content="Are you sure you want to delete?"
        /> */}
      </div>
    </div>
  );
}

export default Uploadedfile;
