import styles from "../styles/Home.module.css";

import React, { useState, useEffect } from "react";
import { Calendar, globalizeLocalizer } from "react-big-calendar";
import Axios from "axios";
import globalize from "globalize";
import moment from "moment";

const localizer = globalizeLocalizer(globalize);

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("World");

  useEffect(() => {
    const fetchData = async () => {
      const response = await Axios.get("/api/hello");

      if (response) {
        setLoading(false);

        debugger;

        const test = response.data.appointments.map((item) => ({
          start: moment(item.datetime).toDate(),
          end: moment(item.datetime).add(item.duration, "minutes").toDate(),
          title: item.firstName,
        }));
        setName(test);
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
  console.log(name);

  return (
    <>
      <p>Hello, Kate</p>

      <Calendar
        localizer={localizer}
        events={name}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        defaultView="week"
        toolbar={false}
        selectable="ignoreEvents"
        drilldownView={null}
      />

      {/* {name.map((item) => (
        <p key={item.id}>
          {item.firstName} - {item.datetime} - {item.type}
        </p>
      ))} */}
    </>
  );
}