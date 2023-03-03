// pages/api/hello.ts
import Acuity from 'acuityscheduling';
import { startOfWeek, addDays , startOfDay, format } from "date-fns";

export default (request, response) => {
  var acuity = Acuity.basic({
    userId: process.env.ACUITY_USER_ID,
    apiKey: process.env.ACUITY_API_KEY,
  });

  const today = startOfDay(new Date());
  const weekStart = startOfWeek(today, { weekStartsOn: 2 });
  const weekFinish = addDays(weekStart, 14);

  const minDate = format(weekStart, "MMMM dd',' yyyy");
  const maxDate = format(weekFinish, "MMMM dd',' yyyy");

  request = acuity.request(
    `appointments?calendarID=1368948&direction=ASC&excludeForms=true&minDate=${minDate}&maxDate=${maxDate}`,
    function (err, res, appointments) {
      if (err) {
        return console.error(err);
      } else {
        const results = appointments.map((item) => ({
          datetime: item.datetime,
          duration: item.duration,
          name: `${item.firstName} ${item.lastName}`,
          id: item.id,
          type: item.type,
        }));
        response.status(200).send({ results });
      }
    }
  );
};