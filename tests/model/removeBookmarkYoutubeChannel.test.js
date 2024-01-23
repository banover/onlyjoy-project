import { describe, expect, it } from "vitest";
import { removeBookmarkYoutubeChannel, state } from "../../src/model";

describe("removeBookmarkYoutubeChannel 함수", () => {
  it("올바른 값을 return한다", () => {
    state.bookmarkYoutubeChannels = [{ channelTitle: "testChannel" }];
    const tempFormData = { removeChannel: "testChannel" };

    removeBookmarkYoutubeChannel(tempFormData);

    expect(state.bookmarkYoutubeChannels).toEqual([]);
  });
});
