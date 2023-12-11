import fetchYoutubeChannelData from "./services/fetchYoutubeChannelData.js";
import fetchMatchesDataWithinAWeek from "./services/fetchMatchesDataWithinAWeek.js";
import { ONE_HOURS, NUMBER_OF_SPINNING_LOGO } from "./config.js";

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

  LivechannelData: [],
  matchCardData: [],
  spinnerItem: [],
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
    state.LivechannelData.push(createLiveStreamObject(data));
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
    // competition: data.competition.emblem,
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

    youtubeLiveChannels: isMatchStartWithinOneHours(data.utcDate)
      ? state.LivechannelData.filter((channel) => channel.liveStatus === "live")
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
  if (score.winner) {
    return `${score.fullTime.home} : ${score.fullTime.away}`;
  }
  return null;
}

function isMatchStartWithinOneHours(matchDate) {
  return new Date(matchDate) - Date.now() < ONE_HOURS;
}
