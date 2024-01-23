import { YOUTUBE_API_KEY } from "../config";

export default async function fetchYoutubeChannelFromChannelId(
  bookmarkYoutubeChannels
) {
  let result = [];
  const urls = bookmarkYoutubeChannels.map(
    (channel) =>
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&channelId=${channel.channelId}&key=${YOUTUBE_API_KEY}`
  );

  try {
    const response = await Promise.all(urls.map((url) => fetch(url)));

    for (const channelData in response) {
      if (response[channelData].ok === false) {
        throw new Error("fetch 실패");
      }
      const data = await response[channelData].json();
      result.push(data);
    }
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    if (error.message === "fetch 실패") {
      throw new Error("fetch 실패");
    }
    throw new Error("youtube channel 정보를 불러오는데 실패했습니다");
  }
}
