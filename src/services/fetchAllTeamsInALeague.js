import axios from "axios";
import { BASE_URL, FOOTBALL_API_TOKEN } from "../config";
export default async function fetchAllTeamsInALeague(leagueId) {
  const url = `${BASE_URL}/competitions/${leagueId}/teams`;
  // league id 뿐 아니라 code도 됨 ex. PL
  try {
    const data = await axios
      .get(url, {
        headers: {
          "X-Auth-Token": FOOTBALL_API_TOKEN,
        },
      })
      .then((response) => response);

    return data.data.teams;
  } catch (error) {
    console.error(error);
  }
}
