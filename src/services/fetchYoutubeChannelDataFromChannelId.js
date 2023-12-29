import { YOUTUBE_API_KEY } from "../config";
export default async function fetchYoutubeChannelDataFromChannelId(channelId) {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&channelId=${channelId}&key=${YOUTUBE_API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`fail to fetch youtube channel data: ${error.message}`);
  }
}

// channelId 가 handler임
