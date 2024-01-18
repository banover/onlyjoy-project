import { YOUTUBE_API_KEY } from "../config";
export default async function fetchSearchedYoutubeChannelData(channelTitle) {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${channelTitle}&key=${YOUTUBE_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data?.items ? data : throwError();
  } catch (error) {
    throw new Error(`Youtube Channel 정보를 불러오는데 실패했습니다.`);
  }
}

function throwError() {
  throw new Error("response data format is weired");
}
