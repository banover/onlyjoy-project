import fetchYoutubeChannelData from "./services/fetchYoutubeChannelData.js";
import fetchMatchesDataWithinAWeek from "./services/fetchMatchesData";
import { ONE_HOURS } from "./config.js";

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
};

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
  const DataDummys = await fetchMatchesDataWithinAWeek();
  console.log(DataDummys);
  DataDummys.forEach((DataDummy) => {
    DataDummy.data.matches.forEach((match) => {
      state.matchCardData.push(createMatchObject(match));
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
    rawDate: data.utcDate,
    Date: new Date(data.utcDate).toLocaleString(),
    player: targetTeam.at(0)?.player,
    // Todo : 경기 상황 - 게임 끝, 게임 전, 게임 중 data 추가하기(status) 이 후 matchCard에 게임 진행여부 올리기
    liveStream: targetTeam.at(0)?.liveStream,
    liveUrl: targetTeam.at(0)?.liveUrl,

    youtubeLiveChannels: isMatchStartWithinOneHours(data.utcDate)
      ? state.LivechannelData.filter((channel) => channel.liveStatus === "live")
      : [],
  };
}

function isMatchStartWithinOneHours(matchDate) {
  return new Date(matchDate) - Date.now() < ONE_HOURS;
}
