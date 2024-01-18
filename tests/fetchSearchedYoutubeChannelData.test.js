import { beforeEach, describe, expect, it, vi } from "vitest";
import fetchSearchedYoutubeChannelData from "../src/services/fetchSearchedYoutubeChannelData";
import { YOUTUBE_API_KEY } from "../src/config";

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

describe("fetchSearchedYoutubeChannelData 함수", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it("올바른 data format을 return한다", async () => {
    const tempChannelTitle = "testTitle";

    const data = await fetchSearchedYoutubeChannelData(tempChannelTitle);

    expect(data).toEqual({ items: "testData" });
  });

  it("잘못된 fetched data를 받은 경우, throw error한다", () => {
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
    const tempChannelTitle = "testTitle";

    const resultFn = async () =>
      await fetchSearchedYoutubeChannelData(tempChannelTitle);

    expect(resultFn).rejects.toThrowError(
      /^Youtube Channel 정보를 불러오는데 실패했습니다.$/
    );
  });

  it("rejected Promise 값을 fetch한 경우, throw error한다", async () => {
    fetch.mockResolvedValueOnce(
      new Promise((resolve, reject) => {
        reject("fetch fail!");
      })
    );
    const tempChannelTitle = "testTitle";

    const resultFn = () => fetchSearchedYoutubeChannelData(tempChannelTitle);

    expect(resultFn).rejects.toThrowError(
      /^Youtube Channel 정보를 불러오는데 실패했습니다.$/
    );
  });

  describe("fetch 함수", () => {
    it("1번 호출된다", async () => {
      const tempChannelTitle = "testTitle";

      await fetchSearchedYoutubeChannelData(tempChannelTitle);

      expect(fetch).toHaveBeenCalledTimes(1);
    });

    it("올바른 url을 input으로 가진다", async () => {
      const tempChannelTitle = "testTitle";

      await fetchSearchedYoutubeChannelData(tempChannelTitle);

      expect(fetch).toHaveBeenCalledWith(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${tempChannelTitle}&key=${YOUTUBE_API_KEY}`
      );
    });
  });
});

// fetch 함수에서
// 제대로된 결과 값을 return하는지 확인
