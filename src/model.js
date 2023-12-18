import fetchYoutubeChannelData from "./services/fetchYoutubeChannelData.js";
import fetchMatchesDataWithinAWeek from "./services/fetchMatchesDataWithinAWeek.js";
import fetchAllTeamsInALeague from "./services/fetchAllTeamsInALeague.js";
import { ONE_HOURS, NUMBER_OF_SPINNING_LOGO, THREE_HOURS } from "./config.js";

export const state = {
  bookmarkTeams: [
    {
      leagueId: 2021,
      name: "Tottenham",
      id: 73,
      player: "손흥민",
      liveStream: "Spotv",
      liveUrl: "https://www.spotvnow.co.kr/",
      logoUrl: "https://crests.football-data.org/73.svg",
    },
    {
      leagueId: 2015,
      name: "PSG",
      id: 524,
      player: "이강인",
      liveStream: "쿠팡플레이",
      liveUrl: "https://www.coupangplay.com/",
      logoUrl: "https://crests.football-data.org/524.png",
    },
    {
      leagueId: 2002,
      name: "Bayern",
      id: 5,
      player: "김민재",
      liveStream: "Tving",
      liveUrl: "https://www.tving.com/",
      logoUrl: "https://crests.football-data.org/5.svg",
    },
  ],

  bookmarkYoutubeChannels: [
    {
      channelTitle: "문도그",
      channelId: "UCIJD-n6RnrFkO45qBjbdoVA",
      channelHandle: "moondog10",
    },
    {
      channelTitle: "이스타TV",
      channelId: "UCIJD-n6RnrFkO45qBjbdoVA",
      channelHandle: "@leestartv",
    },
  ],

  bookmarkLiveStreams: [
    {
      name: "Spotv",
      url: "https://www.spotvnow.co.kr/",
    },
    {
      name: "Tving",
      url: "https://www.tving.com/",
    },
    {
      name: "쿠팡플레이",
      url: "https://www.coupangplay.com/",
    },
  ],

  // 리그 관련 array도 하나 만들어야함

  livechannelData: [],
  matchCardData: [],
  spinnerItem: [],
  allTeamInALeague: [],
};

function init() {
  state.spinnerItem = createSpinnerItem();
}
init();

function createSpinnerItem() {
  return state.bookmarkTeams
    .map((team) => {
      return { name: team.name, logoUrl: team.logoUrl };
    })
    .filter((_, index) => index < NUMBER_OF_SPINNING_LOGO);
}

export async function loadYoutubeLiveStreamData() {
  state.bookmarkYoutubeChannels.forEach(async (channel) => {
    const data = await fetchYoutubeChannelData(channel.channelHandle);
    console.log(data.items[0].snippet);
    state.livechannelData.push(createLiveStreamObject(data));
  });
}

function createLiveStreamObject(data) {
  return {
    title: data.items[0].snippet.channelTitle,
    id: data.items[0].snippet.channelId,
    liveStatus: data.items[0].snippet.liveBroadcastContent,
    url: `https://www.youtube.com/channel/${data.items[0].snippet.channelId}`,
  };
}

export async function loadMatchesData() {
  try {
    const DataDummys = await fetchMatchesDataWithinAWeek(state.bookmarkTeams);
    console.log(DataDummys);
    DataDummys.forEach((DataDummy) => {
      DataDummy.data.matches.forEach((match) => {
        state.matchCardData.push(createMatchObject(match));
      });
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

function createMatchObject(data) {
  const targetTeam = state.bookmarkTeams.filter(
    (team) => team.id === data.homeTeam.id || team.id === data.awayTeam.id
  );

  return {
    searchedTeam: targetTeam.at(0)?.name,
    competition: data.competition.name,
    homeTeam: data.homeTeam.shortName,
    homeTeamEmblem: data.homeTeam.crest,
    awayTeam: data.awayTeam.shortName,
    awayTeamEmblem: data.awayTeam.crest,
    rawDate: data.utcDate,
    Date: getMatchDate(data.utcDate),
    player: targetTeam.at(0)?.player,
    status: getMatchStatus(data.status),
    winner: getWinnerTeam(data),
    score: getMatchScore(data.score),

    liveStream: targetTeam.at(0)?.liveStream,
    liveUrl: targetTeam.at(0)?.liveUrl,

    youtubeLiveChannels: isCurrentTimeNearMatchTime(data.utcDate)
      ? state.livechannelData.filter((channel) => channel.liveStatus === "live")
      : [],
  };
}

function getMatchDate(date) {
  return new Date(date).toLocaleString("ko-KR", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getMatchStatus(status) {
  if (status === "TIMED") {
    return "경기 전";
  }
  if (status === "IN_PLAY") {
    return "경기 중";
  }
  if (status === "FINISHED") {
    return "경기 종료";
  }
  return "식별 불가능";
}

function getWinnerTeam(data) {
  if (!data.score.winner) {
    return null;
  }
  if (data.score.winner === "DRAW") {
    return "DRAW";
  }
  if (data.score.winner === "AWAY_TEAM") {
    return data.awayTeam.name;
  }
  return data.homeTeam.name;
}

function getMatchScore(score) {
  // if (score.winner) {
  //   return `${score.fullTime.home} : ${score.fullTime.away}`;
  // }
  // return null;
  return `${score.fullTime.home} : ${score.fullTime.away}`;
}

function isCurrentTimeNearMatchTime(matchDate) {
  return (
    new Date(matchDate) - Date.now() < ONE_HOURS &&
    Date.now() - new Date(matchDate) < THREE_HOURS
  );
}

export async function loadAllTeamsInALeague(league) {
  const data = await fetchAllTeamsInALeague(league);
  state.allTeamInALeague = data.map((team) => {
    return {
      name: team.shortName,
      id: team.id,
      logo: team.crest,
    };
  });
  console.log(data);
}

export function getMatchCardData() {
  return {
    allBookmarkTeam: getAllBookmarkTeam(),
    matchesData: state.matchCardData,
  };
}

function getAllBookmarkTeam() {
  return state.bookmarkTeams.map((team) => team.name);
}

export function clearMatchCardData() {
  state.matchCardData = [];
}

export function getFilterdMatchCardData(data) {
  let matchesData;
  if (data.filteringMethod === "date") {
    matchesData =
      data.filteringTeam === "all"
        ? state.matchCardData
            .slice()
            .sort((a, b) => new Date(a.rawDate) - new Date(b.rawDate))
        : state.matchCardData
            .filter(
              (matchData) => matchData.searchedTeam === data.filteringTeam
            )
            .sort((a, b) => new Date(a.rawDate) - new Date(b.rawDate));
  }
  if (data.filteringMethod === "team") {
    matchesData =
      data.filteringTeam === "all"
        ? state.matchCardData.slice()
        : state.matchCardData.filter(
            (matchData) => matchData.searchedTeam === data.filteringTeam
          );
  }

  return { allBookmarkTeam: getAllBookmarkTeam(), matchesData };
}

export function createNewBookmarkTeam(data) {
  const passedTeamData = data.team.split(",");
  const team = passedTeamData[0];
  const teamId = Number(passedTeamData[1]);
  const teamLogoUrl = passedTeamData[2];
  const passedLiveData = data.liveStream.split(",");
  const liveStream = passedLiveData[0];
  const liveStreamUrl = passedLiveData[1];
  return {
    name: team,
    id: teamId,
    player: data.player,
    liveStream: liveStream,
    liveUrl: liveStreamUrl,
    logoUrl: teamLogoUrl,
  };
}
