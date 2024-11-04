import React from "react";
import "./Home.css";
import WithP from "./withP.png";
import WithoutP from "./withoutP.png";

function Home() {
  return (
    <main className="overflow-y-auto p-10  text-opacity-95">
      <div className="max-w-2xl">
        <h3 className="text-2xl font-bold mb-4">
          Tutor Information Upload Guidelines:
        </h3>
        <p>
          When uploading the Excel file, please adhere to the following format
          to ensure accurate data processing. The Excel file should contain the
          following columns in the specified order:
        </p>
        <div class="p-4">
          <p class="font-bold text-lg">Tutor Information Upload Guidelines:</p>
          <ul class="list-disc ml-6">
            <li>
              <strong>Name (Column A):</strong> Full name of the student.
            </li>
            <li>
              <strong>Student ID (Column B):</strong> Unique identifier for each
              student.
            </li>
            <li>
              <strong>CA (Column C):</strong> Continuous Assessment marks.
            </li>
            <li>
              <strong>Practical (Column D, optional):</strong> Practical
              assessment marks (if applicable).
            </li>
            <li>
              <strong>Exam (Column E):</strong> Examination marks.
            </li>
          </ul>
          <p class="mt-4">
            If there is practical assessment, the structure should look like
            this::
          </p>
          <img
            src={WithP}
            class="border border-gray-500 m-2"
            alt="Example with Practical"
          />

          <p class="mt-4">
            If there is no practical assessment, the file should include only
            Name, Student ID, CA, and Exam columns. Below is an example of the
            Excel file structure:
          </p>
          <img
            src={WithoutP}
            class="border border-gray-500 m-2"
            alt="Example with No Practical"
          />
          <p class="mt-4">
            Please make sure to follow this format to facilitate a smooth and
            error-free data upload process.
          </p>
        </div>
      </div>
    </main>
  );
}

export default Home;
