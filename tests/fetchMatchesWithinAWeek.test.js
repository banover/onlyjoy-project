import fetchMatchesWithinAWeek from "../src/services/fetchMatchesWithinAWeek";
import axios from "axios";
import { FOOTBALL_API_TOKEN, BASE_URL } from "../src/config.js";
import DateString from "../src/helpers/DateString.js";
import { describe, it, vi, expect, beforeEach } from "vitest";

vi.mock("axios");

describe("fetchMatchesWithinAWeek 함수", () => {
  function setAxiosGetRightFormat() {
    axios.get.mockResolvedValue(
      new Promise((resolve, reject) => {
        resolve({
          data: {
            matches: "tempMatchesData",
          },
        });
      })
    );
  }

  async function setAxiosAllRightFormat() {
    axios.all.mockImplementation(async (args) => {
      const temp = [];
      for (let i = 0; i < args.length; i++) {
        // resolvedItem = await args[i];
        // if (!resolvedItem) {
        //   return new Error("test");
        // }
        temp.push(await args[i]);
        // temp.push(resolvedItem);
      }
      return temp;
    });
  }

  const tempBookmarkTeams = [
    {
      id: 73,
    },
    {
      id: 524,
    },
    {
      id: 5,
    },
  ];

  beforeEach(async () => {
    axios.get.mockReset();
    axios.all.mockReset();
    setAxiosGetRightFormat();
    await setAxiosAllRightFormat();
  });

  // it("axios.get의 잘못된 fetched data를 받은 경우, throw error한다", async () => {
  //   // it("잘못된 data format을 return할 경우, throw error한다", async () => {
  //   axios.get.mockResolvedValue(
  //     new Promise((resolve, reject) => {
  //       resolve({
  //         data: {
  //           player: "tempPlayData",
  //         },
  //       });
  //     })
  //   );

  //   const resultFn = () => fetchMatchesWithinAWeek(tempBookmarkTeams);

  //   await expect(resultFn).rejects.toThrowError(
  //     /^경기 정보 format이 이상합니다.$/
  //   );
  // });

  it("axios.all의 return값이 reject Promise일 경우, throw error한다", async () => {
    axios.all.mockRejectedValue("axios.get fail!");

    const resultFn = () => fetchMatchesWithinAWeek(tempBookmarkTeams);

    await expect(resultFn).rejects.toThrowError(
      /^경기 정보를 불러오는데 실패했습니다.$/
    );
  });

  it("axios.all이 잘못된 data format을 return할 경우, throw error한다", async () => {
    axios.all.mockResolvedValue([
      {
        data: {
          player: "tempPlayData",
        },
      },
    ]);

    const resultFn = () => fetchMatchesWithinAWeek(tempBookmarkTeams);

    await expect(resultFn).rejects.toThrowError(
      /^경기 정보 format이 이상합니다.$/
    );
  });

  describe("axios.get", () => {
    it("bookmarkTeam에 등록된 team 수만큼 호출된다", async () => {
      await fetchMatchesWithinAWeek(tempBookmarkTeams);

      expect(axios.get).toHaveBeenCalledTimes(tempBookmarkTeams.length);
    });

    it("올바른 url을 첫번쨰 input으로 사용한다", async () => {
      const tempDate = new DateString();
      const expectedDateParameter = `dateFrom=${tempDate.yesterday}&&dateTo=${tempDate.afterAWeekFromYesterday}`;

      await fetchMatchesWithinAWeek(tempBookmarkTeams);

      expect(axios.get.mock.calls[0][0]).toBe(
        `${BASE_URL}/teams/${tempBookmarkTeams[0].id}/matches?${expectedDateParameter}`
      );
    });

    it("올바른 header를 두번쨰 input으로 사용한다", async () => {
      await fetchMatchesWithinAWeek(tempBookmarkTeams);

      expect(axios.get.mock.calls[0][1]).toEqual({
        headers: { "X-Auth-Token": FOOTBALL_API_TOKEN },
      });
    });

    it("올바른 data format을 return한다", async () => {
      await fetchMatchesWithinAWeek(tempBookmarkTeams);

      expect(axios.get.mock.results[0].value).toEqual({
        data: {
          matches: "tempMatchesData",
        },
      });
    });
  });

  describe("axios.all", () => {
    it("올바른 data format을 return한다", async () => {
      await fetchMatchesWithinAWeek(tempBookmarkTeams);

      expect(axios.all.mock.results[0].value[0]).toEqual({
        data: {
          matches: "tempMatchesData",
        },
      });
    });
  });
});

// axios.all 부분을
// 1번 호출하는지?
// input은 적절한지?
// return한 값을 array인지?
//
//
