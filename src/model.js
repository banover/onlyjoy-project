import fetchYoutubeChannelsFromChannelId from "./services/fetchYoutubeChannelsFromChannelId.js";
import fetchMatchesWithinAWeek from "./services/fetchMatchesWithinAWeek.js";
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

  liveChannels: [],
  matchCards: [],
  bookmarkTeamLogos: [],
  allTeamsInALeague: [],
  searchedYoutubeChannels: [],
};

function init() {
  state.bookmarkTeams = getBookmarkTeamsDataFromLocalStorage();
  console.log(state.bookmarkTeams);
  state.bookmarkYoutubeChannels =
    getBookmarkYoutubeChannelDataFromLocalStorage();
  state.bookmarkTeamLogos = createbookmarkTeamLogo();
}
init();

function getBookmarkTeamsDataFromLocalStorage() {
  return localStorage.getItem("bookmarkTeams")
    ? JSON.parse(localStorage.getItem("bookmarkTeams"))
    : [];
}
function getBookmarkYoutubeChannelDataFromLocalStorage() {
  return localStorage.getItem("bookmarkYoutubeChannels")
    ? JSON.parse(localStorage.getItem("bookmarkYoutubeChannels"))
    : [];
}

function createbookmarkTeamLogo() {
  if (!state.bookmarkTeams.length) {
    return [];
  }
  return state.bookmarkTeams
    .map((team) => {
      return { name: team.name, logoUrl: team.logoUrl };
    })
    .filter((_, index) => index < NUMBER_OF_SPINNING_LOGO);
}

export async function loadBookmarkYoutubeChannelLiveStream() {
  console.log(state.bookmarkYoutubeChannels);
  if (state.bookmarkYoutubeChannels.length === 0) {
    return;
  }
  clearStateLiveChannels();
  try {
    const channels = await fetchYoutubeChannelsFromChannelId(
      state.bookmarkYoutubeChannels
    );
    channels.forEach((channel) => {
      state.liveChannels.push(createLiveStreamObject(channel.items[0].snippet));
    });
    console.log(state.liveChannels);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

function clearStateLiveChannels() {
  state.liveChannels = [];
}

function createLiveStreamObject(channel) {
  return {
    title: channel.channelTitle,
    id: channel.channelId,
    liveStatus: channel.liveBroadcastContent,
    url: `https://www.youtube.com/channel/${channel.channelId}`,
  };
}

export async function loadBookmarkTeamMatches() {
  try {
    clearStateMatchCards();
    const matchesDummy = await fetchMatchesWithinAWeek(state.bookmarkTeams);
    matchesDummy?.forEach((matchDummy) => {
      matchDummy.data.matches.forEach((match) => {
        state.matchCards.push(createMatchObject(match));
      });
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

function clearStateMatchCards() {
  state.matchCards = [];
}

function createMatchObject(match) {
  const targetTeam = getTargetTeam(match);

  return {
    searchedTeam: targetTeam.name,
    competition: match.competition.name,
    homeTeam: match.homeTeam.shortName,
    homeTeamEmblem: match.homeTeam.crest,
    awayTeam: match.awayTeam.shortName,
    awayTeamEmblem: match.awayTeam.crest,
    rawDate: match.utcDate,
    Date: getMatchDate(match.utcDate),
    player: targetTeam.player,
    status: getMatchStatus(match.status),
    winner: getWinnerTeam(match),
    score: getMatchScore(match.score),

    liveStream: targetTeam.liveStream,
    liveUrl: targetTeam.liveUrl,

    youtubeLiveChannels: isCurrentTimeNearMatchTime(match.utcDate)
      ? state.liveChannels.filter((channel) => channel.liveStatus === "live")
      : [],
  };
}

// 버그 예상됨, bookmark에 추가된 두 팀이 상대로 만나서 경기할 경우..
function getTargetTeam(match) {
  return state.bookmarkTeams
    .filter(
      (team) => team.id === match.homeTeam.id || team.id === match.awayTeam.id
    )
    .at(0);
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

// getWinnerTeam보다 getMatchResult가 어떨까.. winnerTeam과 draw 경우를 분리하는게..더..깔끔하긴한데..
function getWinnerTeam(match) {
  if (!match.score.winner) {
    return null;
  }
  if (match.score.winner === "DRAW") {
    return "DRAW";
  }
  if (match.score.winner === "AWAY_TEAM") {
    return match.awayTeam.name;
  }
  return match.homeTeam.name;
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
  try {
    const data = await fetchAllTeamsInALeague(league);
    state.allTeamsInALeague = data.map((team) => {
      return {
        name: team.shortName,
        id: team.id,
        logo: team.crest,
      };
    });
    console.log(data);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export function getAllBookmarkTeamName() {
  return state.bookmarkTeams.map((team) => team.name);
}

export function getFilterdMatchCards(formData) {
  let result;
  if (formData.filteringMethod === "date") {
    result =
      formData.filteringTeam === "all"
        ? state.matchCards
            .slice()
            .sort((a, b) => new Date(a.rawDate) - new Date(b.rawDate))
        : state.matchCards
            .filter(
              (matchData) => matchData.searchedTeam === formData.filteringTeam
            )
            .sort((a, b) => new Date(a.rawDate) - new Date(b.rawDate));
  }
  if (formData.filteringMethod === "team") {
    result =
      formData.filteringTeam === "all"
        ? state.matchCards.slice()
        : state.matchCards.filter(
            (matchData) => matchData.searchedTeam === formData.filteringTeam
          );
  }

  return result;
}

export function getRestSelectOptions() {
  return {
    teams: state.allTeamsInALeague,
    liveStreams: state.bookmarkLiveStreams,
  };
}

export function addNewBookmarkTeam(formData) {
  state.bookmarkTeams.push(createNewBookmarkTeam(formData));
  setLocalStorageBookmarkTeamsData();
}

function createNewBookmarkTeam(formData) {
  const teamData = JSON.parse(formData.team);
  const liveStreamData = JSON.parse(formData.liveStream);
  return {
    name: teamData.name,
    id: teamData.id,
    player: formData.player,
    liveStream: liveStreamData.name,
    liveUrl: liveStreamData.url,
    logoUrl: teamData.logo,
  };
}

function setLocalStorageBookmarkTeamsData() {
  localStorage.setItem("bookmarkTeams", JSON.stringify(state.bookmarkTeams));
}

export function removeBookmarkTeam(formData) {
  state.bookmarkTeams = getNewBookmarkTeamsAfterRemove(formData);
  setLocalStorageBookmarkTeamsData();
}

function getNewBookmarkTeamsAfterRemove(formData) {
  return state.bookmarkTeams.filter(
    (team) => team.name !== formData.removeTeam
  );
}

export async function loadSearchedYoutubeChannels(channelTitle) {
  try {
    const channelData = await fetchSearchedYoutubeChannelData(channelTitle);
    state.searchedYoutubeChannels = channelData.items;
    console.log(state.searchedYoutubeChannels);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export function addNewBookmarkYoutubeChannel(channelData) {
  console.log(channelData);
  state.bookmarkYoutubeChannels.push(createBookmarkYoutubeChannel(channelData));
  setLocalStorageBookmarkYoutubeChannelData();
}

function createBookmarkYoutubeChannel(channelData) {
  return {
    channelTitle: channelData.channelTitle,
    channelId: channelData.channelId,
    channelLogo: channelData.thumbnails.high.url,
  };
}

function setLocalStorageBookmarkYoutubeChannelData() {
  localStorage.setItem(
    "bookmarkYoutubeChannels",
    JSON.stringify(state.bookmarkYoutubeChannels)
  );
}

export function removeBookmarkYoutubeChannel(formData) {
  console.log(formData);
  state.bookmarkYoutubeChannels = getNewBookmarkYoutubeChannelsAfterRemove(
    formData.removeChannel
  );
  setLocalStorageBookmarkYoutubeChannelData();
}

function getNewBookmarkYoutubeChannelsAfterRemove(removedChannel) {
  return state.bookmarkYoutubeChannels.filter(
    (channel) => channel.channelTitle !== removedChannel
  );
}
