import { beforeEach, describe, expect, it, vi } from "vitest";
import fetchSearchedYoutubeChannelData from "../src/services/fetchSearchedYoutubeChannelData";
import { YOUTUBE_API_KEY } from "../src/config";

describe("fetchSearchedYoutubeChannelData 함수", () => {
  const testResponseData = { items: "testData" };
  const fetchMock = vi.fn((url) => {
    return new Promise((resolve, reject) => {
      const testResponse = {
        ok: true,
        json() {
          return new Promise((resolve, reject) => {
            resolve(testResponseData);
          });
        },
      };
      resolve(testResponse);
    });
  });

  vi.stubGlobal("fetch", fetchMock);

  const tempChannelTitle = "testTitle";

  beforeEach(() => {
    fetch.mockClear();
  });

  it("올바른 data format을 return한다", async () => {
    const data = await fetchSearchedYoutubeChannelData(tempChannelTitle);

    expect(data).toEqual({ items: "testData" });
  });

  it("잘못된 data를 fetch한 경우, throw error한다", async () => {
    const wrongtestResponseData = {
      otherProperty: "for test",
    };
    fetch.mockResolvedValueOnce(
      new Promise((resolve, reject) => {
        const testResponse = {
          ok: true,
          json() {
            return new Promise((resolve, reject) => {
              resolve(wrongtestResponseData);
            });
          },
        };
        resolve(testResponse);
      })
    );

    const resultFn = () => fetchSearchedYoutubeChannelData(tempChannelTitle);

    await expect(resultFn).rejects.toThrowError(
      /^Youtube Channel 정보를 불러오는데 실패했습니다.$/
    );
  });

  it("rejected Promise 값을 fetch한 경우, throw error한다", async () => {
    fetch.mockResolvedValueOnce(
      new Promise((resolve, reject) => {
        reject("fetch fail!");
      })
    );

    const resultFn = () => fetchSearchedYoutubeChannelData(tempChannelTitle);

    await expect(resultFn).rejects.toThrowError(
      /^Youtube Channel 정보를 불러오는데 실패했습니다.$/
    );
  });

  describe("fetch 함수", () => {
    it("1번 호출된다", async () => {
      await fetchSearchedYoutubeChannelData(tempChannelTitle);

      expect(fetch).toHaveBeenCalledTimes(1);
    });

    it("올바른 url을 input으로 가진다", async () => {
      await fetchSearchedYoutubeChannelData(tempChannelTitle);

      expect(fetch).toHaveBeenCalledWith(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${tempChannelTitle}&key=${YOUTUBE_API_KEY}`
      );
    });
  });
});
