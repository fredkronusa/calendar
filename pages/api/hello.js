// pages/api/hello.ts
var Acuity = require("acuityscheduling");

import { startOfWeek, endOfWeek, getDate, startOfDay, format } from "date-fns";

export default (request, response) => {
  var acuity = Acuity.basic({
    userId: process.env.ACUITY_USER_ID,
    apiKey: process.env.ACUITY_API_KEY,
  });

  const today = startOfDay(new Date());
  const test2 = startOfWeek(today, { weekStartsOn: 2 });
  const test3 = endOfWeek(today, { weekStartsOn: 1 });

  const minDate = format(test2, "MMMM dd',' yyyy");
  const maxDate = format(test3, "MMMM dd',' yyyy");

  request = acuity.request(
    `appointments?calendarID=1368948&direction=ASC&excludeForms=true&minDate=${minDate}&maxDate=${maxDate}`,
    function (err, res, appointments) {
      if (err) {
        return console.error(err);
      } else {
        response.status(200).send({ appointments });
      }
    }
  );
};