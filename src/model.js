import fetchMatchesData from "./services/fetchMatchesData";
import fetchYoutubeChannelData from "./services/fetchYoutubeChannelData.js";

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

  bookmarkYoutubeChannel: [
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
  matchCardData: [],
  LivechannelData: [],
};

export async function loadMatchesData() {
  const DataDummys = await fetchMatchesData();

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
    liveStream: targetTeam.at(0)?.liveStream,
    liveUrl: targetTeam.at(0)?.liveUrl,
    youtubeLiveChannel:
      new Date(data.utcDate) - Date.now() < 3600000 !== false
        ? state.LivechannelData.filter(
            (channel) => channel.liveStatus === "live"
          )
        : [],
  };
}

export async function loadYoutubeLiveStreamData() {
  state.bookmarkYoutubeChannel.forEach(async (channel) => {
    const data = await fetchYoutubeChannelData(channel.channelHandle);
    console.log(data.items[0].snippet);
    state.LivechannelData.push(createLiveStreamObject(data));
  });
}

function createLiveStreamObject(data) {
  return {
    channelTitle: data.items[0].snippet.channelTitle,
    channelId: data.items[0].snippet.channelId,
    liveStatus: data.items[0].snippet.liveBroadcastContent,
    channelUrl: `https://www.youtube.com/channel/${data.items[0].snippet.channelId}`,
  };
}
