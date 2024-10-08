import React, { useState } from "react";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
} from "react-icons/bs";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import "./Home.css";
import { NavLink } from "react-router-dom";
import PopupDialog from "../../../Components/PopupDialog";

function Home() {
  const data = [
    {
      name: "BEIT",
      First: 2,
      Second: 2,
      amt: 6,
      Third: 3, // Additional bar value for BEIT
      Fourth: 5, // Additional bar value for BEIT
    },
    {
      name: "CE",
      First: 2,
      Second: 5,
      amt: 6,
      Third: 4, // Additional bar value for CE
      Fourth: 3, // Additional bar value for CE
    },
    // Add more objects for other programs similarly
    {
      name: "EE",
      First: 3,
      Second: 3,
      amt: 6,
      Third: 3,
      Fourth: 3,
    },
    {
      name: "BA",
      First: 3,
      Second: 3,
      amt: 6,
      Third: 3,
      Fourth: 3,
    },
    {
      name: "Geo",
      First: 3,
      Second: 3,
      amt: 6,
      Third: 3,
      Fourth: 3,
    },
    {
      name: "ICE",
      First: 3,
      Second: 3,
      amt: 6,
      Third: 3,
      Fourth: 3,
    },
    {
      name: "ECE",
      First: 3,
      Second: 3,
      amt: 6,
      Third: 3,
      Fourth: 3,
    },
  ];

  const notis = [
    {
      "tid": "RUB201204006",
      "mid": "CTE306",
      "date": "2023-11-15 20:59:37",
      "semester": "AS2023",
      "name": "Mobile Application Development"
    },
    {
      "tid": "RUB200604001",
      "mid": "DIS302",
      "date": "2023-11-09 00:00:00",
      "semester": "AS2023",
      "name": "Object Oriented Analysis & Design"
    },
    {
      "tid": "RUB200704052",
      "mid": "CTE305",
      "date": "2023-11-09 00:00:00",
      "semester": "AS2023",
      "name": "Software Engineering"
    },
    {
      "tid": "RUB201204008",
      "mid": "CTE308",
      "date": "2023-11-09 00:00:00",
      "semester": "AS2023",
      "name": "Advanced Web Technology"
    },
    {
      "tid": "RUB201404011",
      "mid": "CTE307",
      "date": "2023-11-09 00:00:00",
      "semester": "AS2023",
      "name": "Human Computer Interaction"
    }
  ];

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const Declare = async () => {
    setIsConfirmDialogOpen(true);
  };

  const cancelInsert = () => {
    setIsConfirmDialogOpen(false);
  };

  const modulesSubmittedByDate = notis.reduce((acc, curr) => {
    const date = curr.date.split(" ")[0]; // Extracting date part
    if (acc[date]) {
      acc[date]++;
    } else {
      acc[date] = 1;
    }
    return acc;
  }, {});

  const modulesSubmittedChartData = Object.keys(modulesSubmittedByDate).map(
    (date) => ({
      date,
      count: modulesSubmittedByDate[date],
    })
  );

  const reversedModulesSubmittedChartData = modulesSubmittedChartData.reverse();

  const confirm = async () => {
    setIsConfirmDialogOpen(false);
    try {
      const date = new Date().toISOString().split("T")[0];
      const semester = "AS2023";
      const status = "1";

      const url = `https://resultsystemdb.000webhostapp.com/examcell/declare.php?semester=${semester}&date=${date}&status=${status}`;

      // Move the fetch logic outside of useEffect
      const response = await fetch(url);
      if (response.ok) {
        alert("Result Declare");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("NO");
    }
  };

  return (
    <main className="overflow-y-auto p-10 text-white text-opacity-95">
      {/* <div className="flex justify-between">
        <h3 className="text-black">Dashboard</h3>
      </div> */}

      <div className="md:grid md:grid-cols-4 md:gap-10 my-15 h-28 grid-cols-1 gap-5 mt-10">
        <div className="bg-blue-500 flex flex-col justify-around py-0 px-4 rounded-md h-full md:my-0 my-10 cursor-pointer">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold">RESULT</h3>
            <BsFillArchiveFill className="text-2xl" />
          </div>
          <h1 className="text-3xl font-extrabold">AS2023</h1>
        </div>
        <div className="bg-orange-500 flex flex-col justify-around  py-0 px-4 rounded-md h-full md:my-0 my-10 cursor-pointer">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold">Result</h3>
            <BsFillGrid3X3GapFill className="text-2xl" />
          </div>
          <h1 className="text-3xl font-extrabold">Past Result</h1>
        </div>
        <NavLink to={"/StaffInfo"}>
          <div className="bg-green-500 flex flex-col justify-around py-0 px-4 rounded-md h-full md:my-0 my-10 cursor-pointer">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold">Staff Directory</h3>
              <BsPeopleFill className="text-2xl" />
            </div>

            <h1 className="text-3xl font-extrabold">78</h1>
          </div>
        </NavLink>

        <div
          className="bg-red-500 flex flex-col justify-around py-2 px-4 rounded-md h-full md:my-0 my-10 mb-10 cursor-pointer"
          onClick={Declare}
        >
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold">Declaration</h3>
            <BsFillBellFill className="text-2xl" />
          </div>
        </div>
      </div>
      
      <div className="charts">
        
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="First" fill="#363062" />
            <Bar dataKey="Second" fill="#9BBEC8" />
            <Bar dataKey="Third" fill="#427D9D" />
            <Bar dataKey="Fourth" fill="#164863" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={reversedModulesSubmittedChartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <PopupDialog
        isOpen={isConfirmDialogOpen}
        onClose={cancelInsert}
        onYesClick={confirm}
        title="Confirm Insert"
        content="Declare the Result for AS2023"
      />
    </main>
  );
}

export default Home;
