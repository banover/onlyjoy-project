import axios from "axios";
import { BASE_URL, FOOTBALL_API_TOKEN } from "../config";
export default async function fetchAllTeamsInALeague(leagueCode) {
  const url = `${BASE_URL}/competitions/${leagueCode}/teams`;
  try {
    const data = await axios
      .get(url, {
        headers: {
          "X-Auth-Token": FOOTBALL_API_TOKEN,
        },
      })
      .then((response) => response);

    return data?.data?.teams ?? throwError();
  } catch (error) {
    console.log(error);
    console.log(typeof error);
    if (error?.response?.status === "404") {
      throw new Error("fetch url에 문제가 있습니다.");
    }
    throw new Error("해당 리그의 모든 팀을 불러오는데 실패했습니다.");
  }
}

function throwError() {
  throw new Error("axios.get error");
}
