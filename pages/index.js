import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Scheduler } from "@aldabil/react-scheduler";
import { addMinutes } from "date-fns";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await Axios.get("/api/calendar");

      if (response) {
        const data = response.data.results.map((item) => ({
          start: new Date(item.datetime),
          end: addMinutes(new Date(item.datetime), item.duration),
          title: item.name,
          event_id: item.id,
          description: item.type,
        }));

        setAppointments(data);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <p className="loading">Loading...</p>;
  }

  return (
    <div className="calendar-wrapper">
      <Scheduler
        view="week"
        month={null}
        week={{
          weekDays: [2, 3, 4, 5, 6],
          weekStartOn: 0,
          startHour: 7,
          endHour: 20,
          step: 60,
          cellRenderer: ({ height, start, onClick, ...props }) => {}
        }}
        navigation={true}
        editable={false}
        deletable={false}
        draggable={false}
        events={appointments}
        viewerExtraComponent={(_fields, event) => {
          return (
            <>
              {appointments.map((field, i) => {
                if (event.event_id === field.event_id) {
                  return (
                    <p key={`field_${i}`}>
                      {field.description} </p>
                  );
                }
              }
              )}
            </>
          );
        }}
      />
    </div>
  );
}