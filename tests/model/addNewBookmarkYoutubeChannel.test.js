import { describe, expect, it } from "vitest";
import { addNewBookmarkYoutubeChannel, state } from "../../src/model";

describe("addNewBookmarkYoutubeChannel 함수", () => {
  it("올바른 값을 return한다", () => {
    const tempChannelData = {
      channelTitle: "testTitle",
      channelId: 1,
      thumbnails: { high: { url: "testUrl" } },
    };
    addNewBookmarkYoutubeChannel(tempChannelData);

    expect(state.bookmarkYoutubeChannels).toEqual([
      {
        channelTitle: tempChannelData.channelTitle,
        channelId: tempChannelData.channelId,
        channelLogo: tempChannelData.thumbnails.high.url,
      },
    ]);
  });

  
});
