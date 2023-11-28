import fetchMatchData from "./services/fetchMatchData";

export const bookmarkTeam = [
  { leagueId: 2021, name: "Tottenham", id: 73, player: "손흥민" },
  { leagueId: 2015, name: "PSG", id: 524, player: "이강인" },
  { leagueId: 2002, name: "Bayern", id: 5, player: "김민재" },
];

export async function loadMatchData(teamId) {
  return fetchMatchData(teamId);
}
