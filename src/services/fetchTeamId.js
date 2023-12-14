import axios from "axios";
import { BASE_URL, FOOTBALL_API_TOKEN } from "../config";
export default async function fetchTeamId(leagueId, teamName) {
  const url = `${BASE_URL}/competitions/${leagueId}/teams`;

  try {
    // let data;
    const response = await axios.get(url, {
      headers: {
        "X-Auth-Token": FOOTBALL_API_TOKEN,
      },
    });

    return response.data.teams
      .filter((team) => team.shortName === teamName)
      .at(0).id;
  } catch (error) {
    console.error(error);
  }
}
