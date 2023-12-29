import axios from "axios";
import { FOOTBALL_API_TOKEN, BASE_URL } from "../config.js";
import DateString from "../helpers/DateString.js";

export default async function fetchMatchesDataWithinAWeek(bookmarkTeams) {
  if (!bookmarkTeams) {
    return;
  }
  const date = new DateString();
  const dateParameter = `dateFrom=${date.yesterday}&&dateTo=${date.afterAWeekFromYesterday}`;
  let urls = bookmarkTeams.map((team) => {
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
    console.log(error);
    throw new Error(`fail to fetch matches data: ${error.message}`);
  }
}
