import React from "react";
import "./Home.css"; // Ensure your CSS file is updated with new styles
import WithP from "./withP.png";
import WithoutP from "./withoutP.png";

function Home() {
  return (
    <main className="overflow-y-auto p-10 bg-gray-50 text-gray-900">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h3 className="text-3xl font-bold mb-6 text-center text-custom-teal underline">
          Tutor Information Upload Guidelines
        </h3>
        <p className="mb-4 text-lg">
          When uploading the Excel file, please adhere to the following format to ensure accurate data processing. The Excel file should contain the following columns in the specified order:
        </p>
        <div className="p-4 bg-gray-100 rounded-lg mb-6">
          <p className="font-bold text-xl">Required Columns:</p>
          <ul className="list-disc ml-6 mb-4">
            <li>
              <strong>Name (Column A):</strong> Full name of the student.
            </li>
            <li>
              <strong>Student ID (Column B):</strong> Unique identifier for each student.
            </li>
            <li>
              <strong>CA (Column C):</strong> Continuous Assessment marks.
            </li>
            <li>
              <strong>Practical (Column D, optional):</strong> Practical assessment marks (if applicable).
            </li>
            <li>
              <strong>Exam (Column E):</strong> Examination marks.
            </li>
          </ul>
        </div>
        <p className="mt-4 text-lg">
          If there is practical assessment, the structure should look like this:
        </p>
        <img
          src={WithP}
          className="border border-gray-300 rounded shadow-lg m-2"
          alt="Example with Practical"
        />
        
        <p className="mt-4 text-lg">
          If there is no practical assessment, the file should include only Name, Student ID, CA, and Exam columns. Below is an example of the Excel file structure:
        </p>
        <img
          src={WithoutP}
          className="border border-gray-300 rounded shadow-lg m-2"
          alt="Example with No Practical"
        />
        
        <p className="mt-4 font-semibold text-lg">
          Please make sure to follow this format to facilitate a smooth and error-free data upload process.
        </p>
        <div className="flex justify-center mt-6">
          <button className="bg-custom-teal text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
            Download Template
          </button>
        </div>
      </div>
    </main>
  );
}

export default Home;


