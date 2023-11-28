import axios from "axios";
import { API_TOKEN, BASE_URL } from "../config";
import getCurrentDate from "../helpers/getCurrentDate";
import getNextWeekDate from "../helpers/getNextWeekDate";

export default async function fetchMatchData(teamId) {
  const dateParameter = `dateFrom=${getCurrentDate()}&&dateTo=${getNextWeekDate()}`;
  const url = `${BASE_URL}/teams/${teamId}/matches?${dateParameter}`;

  try {
    const response = await axios.get(url, {
      headers: {
        "X-Auth-Token": API_TOKEN,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
}
