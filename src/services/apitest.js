import axios from "axios";

const API_TOKEN = "1c3b561f4bea453b9b5ee70e5b097924";
const baseUrl = "/api";

export async function getLeagueStandings() {
  const url = `${baseUrl}/matches`;

  try {
    const response = await axios.get(url, {
      headers: {
        "X-Auth-Token": API_TOKEN,
      },
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}
