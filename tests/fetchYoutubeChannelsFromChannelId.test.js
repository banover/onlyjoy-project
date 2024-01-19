import { describe, expect, it, vi, beforeEach } from "vitest";
import fetchYoutubeChannelFromChannelId from "../src/services/fetchYoutubeChannelsFromChannelId";
import { YOUTUBE_API_KEY } from "../src/config";

// const Promise.all = vi.fn(()=>{})

// const testResponseData = { items: "testData" };
// const fetchMock = vi.fn((url) => {
//   return new Promise((resolve, reject) => {
//     const testResponse = {
//       ok: true,
//       json() {
//         return new Promise((resolve, reject) => {
//           resolve(testResponseData);
//         });
//       },
//     };
//     resolve(testResponse);
//   });
// });

// vi.stubGlobal("fetch", fetchMock);

describe("fetchYoutubeChannelsFromChannelId 함수", () => {
  const testresponseData = { items: "testData" };

  const fetchMock = vi.fn((url) => {
    return new Promise((resolve, reject) => {
      const testresponse = {
        ok: true,
        json() {
          return new Promise((resolve, reject) => {
            resolve(testresponseData);
          });
        },
      };
      resolve(testresponse);
    });
  });
  vi.stubGlobal("fetch", fetchMock);

  const testBookmarkYoutubeChannels = [
    { channelId: 1 },
    { channelId: 2 },
    { channelId: 3 },
  ];

  beforeEach(() => {
    fetch.mockClear();
  });

  it("올바른 data format을 return한다", async () => {
    const data = await fetchYoutubeChannelFromChannelId(
      testBookmarkYoutubeChannels
    );

    expect(data).toEqual([
      testresponseData,
      testresponseData,
      testresponseData,
    ]);
  });

  it("잘못된 data format을 return한 경우, throw error한다", async () => {
    fetch.mockResolvedValueOnce({ ok: false });

    const resultFn = () =>
      fetchYoutubeChannelFromChannelId(testBookmarkYoutubeChannels);

    await expect(resultFn).rejects.toThrowError(
      /^youtube channel 정보를 불러오는데 실패했습니다$/
    );
  });

  it("rejected data를 fetch한 경우, throw error한다", async () => {
    fetch.mockRejectedValueOnce({ ok: false });

    const resultFn = () =>
      fetchYoutubeChannelFromChannelId(testBookmarkYoutubeChannels);

    await expect(resultFn).rejects.toThrowError(
      /^youtube channel 정보를 불러오는데 실패했습니다$/
    );
  });

  describe("fetch 함수", () => {
    it("bookmarkYoutubeChannel 수만큼 호출된다", async () => {
      await fetchYoutubeChannelFromChannelId(testBookmarkYoutubeChannels);

      expect(fetch).toHaveBeenCalledTimes(testBookmarkYoutubeChannels.length);
    });

    it("올바른 input을 가진다", async () => {
      await fetchYoutubeChannelFromChannelId(testBookmarkYoutubeChannels);

      expect(fetch).toHaveBeenCalledWith(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&channelId=${testBookmarkYoutubeChannels[0].channelId}&key=${YOUTUBE_API_KEY}`
      );
    });
  });
});
