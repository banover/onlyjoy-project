import axios from "axios";
import { FOOTBALL_API_TOKEN, BASE_URL } from "../config.js";
import DateString from "../helpers/DateString.js";
import * as Model from "../model.js";

export default async function fetchMatchesDataWithinAWeek() {
  const date = new DateString();
  const dateParameter = `dateFrom=${date.yesterday}&&dateTo=${date.afterAWeekFromYesterday}`;
  console.log(dateParameter);
  let urls = Model.state.bookmarkTeam.map((team) => {
    return `${BASE_URL}/teams/${team.id}/matches?${dateParameter}`;
  });

  const requests = urls.map((url) =>
    axios.get(url, {
      headers: {
        "X-Auth-Token": FOOTBALL_API_TOKEN,
      },
    })
  );

  try {
    const responses = await axios.all(requests);
    return responses;
  } catch (error) {
    console.error(error);
    // 추후 error 처리 추가
  }
}