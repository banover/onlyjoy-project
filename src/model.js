import fetchYoutubeChannelDataFromChannelId from "./services/fetchYoutubeChannelDataFromChannelId.js";
import fetchMatchesDataWithinAWeek from "./services/fetchMatchesDataWithinAWeek.js";
import fetchAllTeamsInALeague from "./services/fetchAllTeamsInALeague.js";
import fetchSearchedYoutubeChannelData from "./services/fetchSearchedYoutubeChannelData.js";
import { ONE_HOURS, NUMBER_OF_SPINNING_LOGO, THREE_HOURS } from "./config.js";

export const state = {
  bookmarkTeams: [
    // {
    //   name: "Tottenham",
    //   id: 73,
    //   player: "손흥민",
    //   liveStream: "Spotv",
    //   liveUrl: "https://www.spotvnow.co.kr/",
    //   logoUrl: "https://crests.football-data.org/73.svg",
    // },
    // {
    //   name: "PSG",
    //   id: 524,
    //   player: "이강인",
    //   liveStream: "쿠팡플레이",
    //   liveUrl: "https://www.coupangplay.com/",
    //   logoUrl: "https://crests.football-data.org/524.png",
    // },
    // {
    //   name: "Bayern",
    //   id: 5,
    //   player: "김민재",
    //   liveStream: "Tving",
    //   liveUrl: "https://www.tving.com/",
    //   logoUrl: "https://crests.football-data.org/5.svg",
    // },
  ],

  bookmarkYoutubeChannels: [
    // {
    //   channelTitle: "문도그",
    //   channelId: "UCIJD-n6RnrFkO45qBjbdoVA",
    // },
    // {
    //   channelTitle: "이스타TV",
    //   channelId: "UCIJD-n6RnrFkO45qBjbdoVA",
    // },
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

  availableLeague: [
    { name: "EPL", code: "PL" },
    { name: "Championship", code: "ELC" },
    { name: "Bundesliga", code: "BL1" },
    { name: "Ligue1", code: "FL1" },
    { name: "Seria A", code: "SA" },
    { name: "Primera Division", code: "PD" },
    { name: "Primeira Liga", code: "PPL" },
    { name: "Eredivisie", code: "DED" },
  ],

  livechannelData: [],
  matchCardData: [],
  spinnerItem: [],
  allTeamInALeague: [],
  searchedYoutubeChannels: [],
};

function init() {
  state.bookmarkTeams = getBookmarkTeamsDataFromLocalStorage();
  console.log(state.bookmarkTeams);
  state.bookmarkYoutubeChannels =
    getBookmarkYoutubeChannelDataFromLocalStorage();
  state.spinnerItem = createSpinnerItem();
}
init();

function getBookmarkTeamsDataFromLocalStorage() {
  return localStorage.getItem("bookmarkTeams")
    ? JSON.parse(localStorage.getItem("bookmarkTeams"))
    : [];
}
function getBookmarkYoutubeChannelDataFromLocalStorage() {
  return localStorage.getItem("bookmarkYoutubeChannels")
    ? JSON.parse(localStorage.getItem("bookmarkTeams"))
    : [];
}

function createSpinnerItem() {
  if (!state.bookmarkTeams.length) {
    return [];
  }
  return state.bookmarkTeams
    .map((team) => {
      return { name: team.name, logoUrl: team.logoUrl };
    })
    .filter((_, index) => index < NUMBER_OF_SPINNING_LOGO);
}

export async function loadYoutubeLiveStreamData() {
  try {
    clearStateLivechannelData();
    state.bookmarkYoutubeChannels.forEach(async (channel) => {
      const data = await fetchYoutubeChannelDataFromChannelId(
        channel.channelId
      );
      console.log(data);
      console.log(data.items[0].snippet);
      state.livechannelData.push(createLiveStreamObject(data.items[0].snippet));
      console.log(state.livechannelData);
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

function clearStateLivechannelData() {
  state.livechannelData = [];
}

function createLiveStreamObject(channel) {
  return {
    title: channel.channelTitle,
    id: channel.channelId,
    liveStatus: channel.liveBroadcastContent,
    url: `https://www.youtube.com/channel/${channel.channelId}`,
  };
}

export async function loadMatchesData() {
  try {
    clearStateMatchCardData();
    const DataDummys = await fetchMatchesDataWithinAWeek(state.bookmarkTeams);
    if (!DataDummys) {
      return;
    }
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

function clearStateMatchCardData() {
  state.matchCardData = [];
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
  return `${score.fullTime.home} : ${score.fullTime.away}`;
}

function isCurrentTimeNearMatchTime(matchDate) {
  const currentTime = Date.now();
  const matchTime = new Date(matchDate);
  return (
    matchTime - currentTime < ONE_HOURS && currentTime - matchTime < THREE_HOURS
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

export function getAllBookmarkTeam() {
  return state.bookmarkTeams.map((team) => team.name);
}

export function getFilterdMatchCardData(data) {
  let result;
  if (data.filteringMethod === "date") {
    result =
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
    result =
      data.filteringTeam === "all"
        ? state.matchCardData.slice()
        : state.matchCardData.filter(
            (matchData) => matchData.searchedTeam === data.filteringTeam
          );
  }

  return result;
}

export function getRestSelectionData() {
  return {
    teams: state.allTeamInALeague,
    liveStreams: state.bookmarkLiveStreams,
  };
}

export function addingNewBookmarkTeam(data) {
  state.bookmarkTeams.push(createNewBookmarkTeam(data));
  setLocalStorageBookmarkTeamsData();
}

function createNewBookmarkTeam(data) {
  const teamData = JSON.parse(data.team);
  const liveStreamData = JSON.parse(data.liveStream);
  return {
    name: teamData.name,
    id: teamData.id,
    player: data.player,
    liveStream: liveStreamData.name,
    liveUrl: liveStreamData.url,
    logoUrl: teamData.logo,
  };
}

function setLocalStorageBookmarkTeamsData() {
  localStorage.setItem("bookmarkTeams", JSON.stringify(state.bookmarkTeams));
}

export async function loadSearchedYoutubeChannels(channelTitle) {
  const channelData = await fetchSearchedYoutubeChannelData(channelTitle);
  state.searchedYoutubeChannels = channelData.items;
}

export function addingNewBookmarkYoutubeChannel(channelData) {
  console.log(channelData);
  state.bookmarkYoutubeChannels.push(createBookmarkYoutubeChannel(channelData));
  setLocalStorageBookmarkYoutubeChannelData();
}

function createBookmarkYoutubeChannel(channelData) {
  return {
    channelTitle: channelData.channelTitle,
    channelId: channelData.channelId,
  };
}

function setLocalStorageBookmarkYoutubeChannelData() {
  localStorage.setItem(
    "bookmarkYoutubeChannels",
    JSON.stringify(state.bookmarkYoutubeChannels)
  );
}
