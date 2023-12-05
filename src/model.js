import fetchMatchesData from "./services/fetchMatchesData";

export const state = {
  bookmarkTeam: [
    {
      leagueId: 2021,
      name: "Tottenham",
      id: 73,
      player: "손흥민",
      liveStream: "Spotv",
      liveUrl: "https://www.spotvnow.co.kr/",
    },
    {
      leagueId: 2015,
      name: "PSG",
      id: 524,
      player: "이강인",
      liveStream: "쿠팡플레이",
      liveUrl: "https://www.coupangplay.com/",
    },
    {
      leagueId: 2002,
      name: "Bayern",
      id: 5,
      player: "김민재",
      liveStream: "Tving",
      liveUrl: "https://www.tving.com/",
    },
  ],

  matchData: [],
};

export async function loadMatchesData() {
  const DataDummys = await fetchMatchesData();

  DataDummys.forEach((DataDummy) => {
    DataDummy.data.matches.forEach((match) => {
      state.matchData.push(createMatchObject(match));
    });
  });
}

function createMatchObject(data) {
  const targetTeam = state.bookmarkTeam.filter(
    (team) => team.id === data.homeTeam.id || team.id === data.awayTeam.id
  );

  return {
    searchedTeam: targetTeam.at(0)?.name,
    competition: data.competition.name,
    homeTeam: data.homeTeam.name,
    awayTeam: data.awayTeam.name,
    Date: new Date(data.utcDate).toLocaleString(),
    player: targetTeam.at(0)?.player,
    liveStream: targetTeam.at(0)?.liveStream,
    liveUrl: targetTeam.at(0)?.liveUrl,
  };
}
