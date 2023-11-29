import axios from "axios";
import { API_TOKEN, BASE_URL } from "../config";
import getCurrentDate from "../helpers/getCurrentDate";
import getNextWeekDate from "../helpers/getNextWeekDate";
import * as Model from "../model.js";

export default async function fetchMatchesData() {
  const dateParameter = `dateFrom=${getCurrentDate()}&&dateTo=${getNextWeekDate()}`;
  //   const url = `${BASE_URL}/teams/${teamId}/matches?${dateParameter}`;
  let urls = Model.state.bookmarkTeam.map((team) => {
    return `${BASE_URL}/teams/${team.id}/matches?${dateParameter}`;
  });

  const requests = urls.map((url) =>
    axios.get(url, {
      headers: {
        "X-Auth-Token": API_TOKEN,
      },
    })
  );

  const responses = await axios.all(requests);
  return responses;
}
