import { afterAll, describe, expect, it, test, vi } from "vitest";
// import fetchYoutubeChannelsFromChannelId from "../../src/services/fetchYoutubeChannelsFromChannelId.js";
import {
  loadBookmarkYoutubeChannelLiveStream,
  state,
} from "../../src/model.js";

vi.mock("../../src/services/fetchYoutubeChannelsFromChannelId.js", () => {
  return {
    default: () => {
      return [
        {
          items: [
            {
              snippet: {
                channelTitle: "test",
                channelId: 1,
                liveBroadcastContent: false,
                channelLogo: "logoTest",
              },
            },
          ],
        },
      ];
    },
  };
});

describe("model", () => {
  describe("loadBookmarkYoutubeChannelLiveStream 함수", () => {
    it("올바른 값을 return한다", async () => {
      state.bookmarkYoutubeChannels = [
        {
          channelId: 1,
        },
      ];

      await loadBookmarkYoutubeChannelLiveStream();

      expect(state.liveChannels).toEqual([
        {
          title: "test",
          id: 1,
          liveStatus: false,
          url: "https://www.youtube.com/channel/1",
        },
      ]);
    });
  });
});
