import styles from "../styles/Home.module.css";

import React, { useState, useEffect } from "react";
import { Calendar, globalizeLocalizer } from "react-big-calendar";
import Axios from "axios";
import globalize from "globalize";
import moment from "moment";

const localizer = globalizeLocalizer(globalize);


export default function Home() {
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await Axios.get("/api/calendar");

      if (response) {
        setLoading(false);



        const test = response.data.appointments.map((item) => ({
          start: moment(item.datetime).toDate(),
          end: moment(item.datetime).add(item.duration, "minutes").toDate(),
          title: item.firstName,
        }));
        setAppointments(test);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  const myEventsList = [
    {
      start: moment().toDate(),
      end: moment().add(1, "hour").toDate(),
      title: "Some title",
    },
  ];

  console.log(myEventsList);
  console.log(appointments);

  return (
    <>
      <p>Hello, Kate</p>

      <Calendar
        localizer={localizer}
        events={appointments}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 700 }}
        defaultView="week"
        view="week"
        toolbar={false}
        selectable="ignoreEvents"
        drilldownView={null}
        min={new Date(1972, 0, 1, 7, 0, 0, 0)}
        max={new Date(2099, 0, 1, 22, 0, 0, 0)}
      />

      {/* {name.map((item) => (
        <p key={item.id}>
          {item.firstName} - {item.datetime} - {item.type}
        </p>
      ))} */}
    </>
  );
}