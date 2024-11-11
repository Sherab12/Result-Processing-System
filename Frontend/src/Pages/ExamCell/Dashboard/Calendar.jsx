import React from "react";
import {
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
  Resize,
  DragAndDrop,
} from "@syncfusion/ej2-react-schedule";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";

import { scheduleData } from "./dummy";

const Calendar = () => {
  return (
    <div className="">
      <ScheduleComponent
        height={"400px"}
        width={"450px"}
        eventSettings={{ dataSource: scheduleData }}
        selectedDate={new Date(2024, 11, 1)}
        currentView={window.innerWidth < 768 ? "Day" : "Month"}
        enableAdaptiveUI={true}
      >
        <Inject
          services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]}
        />
      </ScheduleComponent>
    </div>
  );
};

export default Calendar;
