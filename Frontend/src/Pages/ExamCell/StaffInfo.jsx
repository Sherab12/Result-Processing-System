import React, { useEffect, useState, useRef } from "react";
import "./resultView.css";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { useStateContext } from "../../Contexts/ContextProvider";
import Loader from "react-js-loader";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Search,
  Inject,
  Toolbar,
} from "@syncfusion/ej2-react-grids";

const StaffInfo = ({ department, year, semester }) => {
  const tableRef = useRef(null);

  const { activeMenu, setActiveMenu, screenSize, currentColor } =
    useStateContext();

  const [data, setData] = useState([]);
  const apiUrl = "https://resultsystemdb.000webhostapp.com/staffInfo.php";

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

  const valst = "px-2 py-1 whitespace-nowrap  text-xs font-medium text-black ";
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <p className="text-2xl font-bold mb-4">Staft Information</p>
      <GridComponent
        dataSource={data}
        allowPaging
        allowSorting
        toolbar={["Search"]}
        width="auto"
      >
        {/* <ColumnsDirective>
        {employeesGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
      </ColumnsDirective> */}
        <Inject services={[Page, Search, Toolbar]} />
      </GridComponent>
    </div>
  );
};

export default StaffInfo;
