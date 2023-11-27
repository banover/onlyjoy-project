import axios from "axios";
import { API_TOKEN, BASE_URL } from "../config";
export default async function fetchTeamId(leagueId, teamName) {
  const url = `${BASE_URL}/competitions/${leagueId}/teams`;

  try {
    const response = await axios.get(url, {
      headers: {
        "X-Auth-Token": API_TOKEN,
      },
    });

    return response.data.teams
      .filter((team) => team.shortName === teamName)
      .at(0).id;
  } catch (error) {
    console.error(error);
  }
}
