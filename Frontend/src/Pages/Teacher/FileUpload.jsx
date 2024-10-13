import React, { useEffect, useState } from "react";
import { MdCloudUpload } from "react-icons/md";
import axios from "axios";
import PopupDialog from "../../Components/PopupDialog";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import * as XLSX from "xlsx";
import excel from "./images.jpeg";
import Uploadedfile from "./Uploadedfile";

function FileUpload({ moduleC, year, moduleN }) {
  const [data, setData] = useState([]);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileImage, setFileImage] = useState(null);
  const [isDataInserted, setisDataInserted] = useState(false);

  const user = useSelector(selectUser);

  useEffect(() => {
    setSelectedFile(null);
    setFileImage(null);
    setData([]);
    setDataIModule([]);
  }, [moduleC]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);

    if (file) {
      setSelectedFile(file);

      const reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet);

        const studentsWithModuleAndClass = parsedData.map((student) => ({
          ...student,
        }));

        setData(studentsWithModuleAndClass);

        setFileImage(excel);
      };
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setFile(file);
  };

  const setFile = (file) => {
    if (file) {
      setSelectedFile(file);

      const reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet);

        const studentsWithModuleAndClass = parsedData.map((student) => {
          const { [Object.keys(student)[0]]: _, ...rest } = student;
          return rest;
        });

        setData(studentsWithModuleAndClass);
      };
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    setFileImage(null);
    setData([]);
  };

  const insertData = async () => {
    setIsConfirmDialogOpen(true);
  };

  const cancelInsert = () => {
    setIsConfirmDialogOpen(false);
  };

  const confirm = async () => {
    setIsConfirmDialogOpen(false);

    const dataWithModuleAndClass = data.map((student) => ({
      ...student,
      code: moduleC,
      tid: user.uid,
      dateOfExam: "2023-11-22",
      semester: "AS2023",
      ID: `0${String(student.ID)}`, // Ensure ID is treated as a string
    }));

    console.log(dataWithModuleAndClass);

    try {
      const url =
        "http://localhost:8080/Result-processing-system/Backend/api/addMark.php";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dataWithModuleAndClass: dataWithModuleAndClass,
        }),
      });

      // Read the response as text first
      const textResponse = await response.text();

      if (response.ok) {
        // const result = await response.text();
        // console.log(result);
        setClick(!click);
        // sendNoti(
        //   dataWithModuleAndClass[0].tid,
        //   dataWithModuleAndClass[0].code,
        //   dataWithModuleAndClass[0].semester
        // );
        alert("Data inserted successfully!");
      } else {
        console.error("Error inserting data:", response.statusText);
        alert("Failed to insert data. Please check the console for details.");
      }

      // Now try to parse it as JSON
      const jsonResponse = JSON.parse(textResponse);
      console.log("Response from server:", jsonResponse);
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    // try {
    //   const url =
    //     "http://localhost:8080/Result-processing-system/Backend/api/addMark.php";

    //   const response = await fetch(url, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       dataWithModuleAndClass: dataWithModuleAndClass,
    //     }),
    //   });
    //   console.log(response);

    //   // if (response.ok) {
    //   //   // const result = await response.text();
    //   //   // console.log(result);
    //   //   setClick(!click);
    //   //   sendNoti(
    //   //     dataWithModuleAndClass[0].tid,
    //   //     dataWithModuleAndClass[0].code,
    //   //     dataWithModuleAndClass[0].semester
    //   //   );
    //   //   alert("Data inserted successfully!");
    //   // } else {
    //   //   console.error("Error inserting data:", response.statusText);
    //   //   alert("Failed to insert data. Please check the console for details.");
    //   // }
    // } catch (error) {
    //   console.error("Error inserting data:", error);
    //   alert("Failed to insert data. Please check the console for details.");
    // }
  };

  // const sendNoti = async (userID, module, semester) => {
  //   try {
  //     const notificationData = {
  //       tid: userID,
  //       mid: module,
  //       semester: semester,
  //     };

  //     const url = `https://resultsystemdb.000webhostapp.com/notiTutor.php?tid=${notificationData.tid}&mid=${notificationData.mid}&semester=${notificationData.semester}`;

  //     const response = await fetch(url);

  //     if (response.ok) {
  //       const successMsg = await response.text();
  //       console.log(successMsg); // Log success message if request is successful
  //     } else {
  //       console.error("Data Already exists", response.statusText);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  // const deleteNoti = async () => {
  //   try {
  //     // const notificationData = {
  //     //   tid: userID,
  //     //   mid: module,
  //     //   semester: semester
  //     // };

  //     // const url = `https://resultsystemdb.000webhostapp.com/deleteNoti.php?mid=${moduleC}`;

  //     const response = await fetch(url);

  //     console.log(moduleC);

  //     if (response.ok) {
  //       const successMsg = await response.text();
  //       console.log(successMsg); // Log success message if request is successful
  //     } else {
  //       console.error("Data Already deleted", response.statusText);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  //delete btn
  const [isConfirmDialogOpenDelete, setIsConfirmDialogOpenDelete] =
    useState(false);

  const fetchDelete = async () => {
    try {
      const url = `http://localhost:8080/Result-processing-system/Backend/api/deleteMark.php`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          code: moduleC, // Ensure this variable is correctly set before this function is called
        }),
      });

      // Check if the response is OK
      if (!response.ok) {
        const errorText = await response.text(); // Get the error response text
        console.error("Error response:", errorText); // Log the error response
        throw new Error(
          `HTTP error! status: ${response.status} - ${errorText}`
        );
      }

      const data = await response.json(); // Parse the response data as JSON
      console.log(data); // Log response data

      if (data.status === "success") {
        alert(data.message);
        setFileImage(null);
        setDataIModule([]);
        setSelectedFile(null);
      } else {
        alert(data.message); // Handle error message
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("An unexpected error occurred: " + error.message); // Show the actual error message
    }
  };

  //     // Move the fetch logic outside of useEffect
  //     const response = await fetch(url);
  //     console.log(response);
  //     if (response.ok) {
  //       setFileImage(null);
  //       setDataIModule([]);
  //       setSelectedFile(null);
  //       alert("Data deleted");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     alert("NO");
  //   }
  // };

  const onDelete = async () => {
    setIsConfirmDialogOpenDelete(true);
  };

  const cancelDelete = () => {
    setIsConfirmDialogOpenDelete(false);
  };

  const confirmDelete = async () => {
    setIsConfirmDialogOpenDelete(false);
    try {
      // Move the useEffect outside of the confirmDelete function
      fetchDelete();
      // deleteNoti();
    } catch (error) {
      console.error("Error deleting data to the server:", error);
      alert("NO");
    }
  };

  // Individual Module data

  const [dataIModule, setDataIModule] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const apiUrl =
    "http://localhost:8080/Result-processing-system/Backend/api/getUndeclaredMark.php";
  const [click, setClick] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            tid: user.uid, // replace with your dynamic value
            code: moduleC, // replace with your dynamic value
          }),
        });

        // Check if response is OK and if response is in JSON format
        if (response.ok) {
          const result = await response.json();
          console.log("Fetched data:", result);
          if (result.message) {
            console.log(result.message); // Log if no undeclared marks found
          } else {
            setDataIModule(result); // Set state if marks were found
          }
        } else {
          // If response is not ok, throw an error
          const errorMessage = await response.text(); // Read error response
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
  }, [click, moduleC]);

  return (
    <div>
      <header>
        <h1>Excel File Upload</h1>
      </header>
      <main>
        <div
          className="file-upload border border-dashed border-gray-500 p-4 relative "
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {dataIModule.length > 0 ? (
            <div>
              <img
                src={excel}
                alt="Excel Preview"
                className="w-8 h-8 object-contain rounded"
                style={{ border: "2px solid #ccc", borderRadius: "8px" }}
              />
              <p className="text-xs mt-2">{`${moduleC}.xlsx`}</p>
            </div>
          ) : (
            <>
              {fileImage && (
                <div>
                  <img
                    src={fileImage}
                    alt="Excel Preview"
                    className="w-8 h-8 object-contain rounded"
                    style={{ border: "2px solid #ccc", borderRadius: "8px" }}
                  />
                  <p className="text-xs mt-2">{`${moduleC}.xlsx`}</p>
                </div>
              )}
              {!fileImage && (
                <div className="drag-box">
                  <MdCloudUpload className="text-blue-500 text-4xl" />
                  <p>Drag & Drop Excel File Here</p>
                </div>
              )}
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept=".xlsx, .xls"
              />
            </>
          )}

          {selectedFile && (
            <div className="selected-file-box mt-4">
              <p className="font-medium text-gray-700">{selectedFile.name}</p>
              <button
                className="mt-2 bg-red-500 text-white py-1 px-2 rounded"
                onClick={clearFile}
              >
                Clear File
              </button>
            </div>
          )}
        </div>

        {dataIModule.length === 0 && (
          <div className="mt-4">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
              onClick={() =>
                document.querySelector('input[type="file"]').click()
              }
            >
              Select File
            </button>
            <button
              className="bg-green-500 text-white py-2 px-4 rounded"
              onClick={insertData}
            >
              Upload Data
            </button>
          </div>
        )}

        <Uploadedfile
          data={dataIModule}
          isLoading={isLoading}
          year={year}
          moduleC={moduleC}
          moduleN={moduleN}
        />
        {dataIModule.length !== 0 && (
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={onDelete}
          >
            Delete
          </button>
        )}

        <PopupDialog
          isOpen={isConfirmDialogOpen}
          onClose={cancelInsert}
          onYesClick={confirm}
          title="Confirm Insert"
          content="Are you sure you want to insert this data?"
        />
        <PopupDialog
          isOpen={isConfirmDialogOpenDelete}
          onClose={cancelDelete}
          onYesClick={confirmDelete}
          title="Confirm Delete"
          content="Are you sure you want to delete?"
        />
      </main>
    </div>
  );
}

export default FileUpload;
