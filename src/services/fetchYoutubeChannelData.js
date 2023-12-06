import { YOUTUBE_API_KEY } from "../config";
export default async function fetchYoutubeChannelData(channelHandle) {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${channelHandle}&key=${YOUTUBE_API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
