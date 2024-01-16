import fetchMatchesWithinAWeek from "../src/services/fetchMatchesWithinAWeek";
import axios from "axios";
import { FOOTBALL_API_TOKEN, BASE_URL } from "../src/config.js";
import DateString from "../src/helpers/DateString.js";
import { describe, it, vi, expect, beforeEach } from "vitest";
// import { state } from "../src/model.js";

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
        temp.push(await args[i]);
      }
      return temp;

      // return [await args[0], await args[1], await args[2]];
    });

    //   axios.all.mockImplementation((...args) => {
    //     return args[0].map(() => {
    //       return {
    //         data: {
    //           matches: "tempMatchesData",
    //         },
    //       };
    //     });
    //   });
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

  beforeEach(() => {
    axios.get.mockReset();
    axios.all.mockReset();
  });

  describe("axios.get", () => {
    // beforeEach(() => {
    //   axios.get.mockReset();
    //   axios.all.mockReset();
    // });

    it("bookmarkTeam에 등록된 team 수만큼 호출된다", async () => {
      //   setAxiosGetRightFormat();

      const data = await fetchMatchesWithinAWeek(tempBookmarkTeams);

      //   expect(axios.all).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledTimes(tempBookmarkTeams.length);
    });

    it("올바른 url을 첫번쨰 input으로 사용한다", async () => {
      //   setAxiosGetRightFormat();
      const tempDate = new DateString();
      const expectedDateParameter = `dateFrom=${tempDate.yesterday}&&dateTo=${tempDate.afterAWeekFromYesterday}`;

      const data = await fetchMatchesWithinAWeek(tempBookmarkTeams);

      expect(axios.get.mock.calls[0][0]).toBe(
        `${BASE_URL}/teams/${tempBookmarkTeams[0].id}/matches?${expectedDateParameter}`
      );
      //   expect(axios.get.mock.calls[1][0]).toBe(
      //     `${BASE_URL}/teams/${tempBookmarkTeams[1].id}/matches?${expectedDateParameter}`
      //   );
      //   expect(axios.get.mock.calls[2][0]).toBe(
      //     `${BASE_URL}/teams/${tempBookmarkTeams[2].id}/matches?${expectedDateParameter}`
      //   );
    });

    it("올바른 header를 두번쨰 input으로 사용한다", async () => {
      //   setAxiosGetRightFormat();
      //   const tempLeagueCode = "12345679";

      const data = await fetchMatchesWithinAWeek(tempBookmarkTeams);

      expect(axios.get.mock.calls[0][1]).toEqual({
        headers: { "X-Auth-Token": FOOTBALL_API_TOKEN },
      });
    });

    it("올바른 data format을 return한다", async () => {
      setAxiosGetRightFormat();
      await setAxiosAllRightFormat();

      const data = await fetchMatchesWithinAWeek(tempBookmarkTeams);

      expect(axios.get.mock.results[0].value).toEqual({
        data: {
          matches: "tempMatchesData",
        },
      });

      //   expect(axios.all.mock).toEqual({
      //   expect(axios.all.mock.results).toEqual({
      //   expect(axios.all.mock.results).toEqual({
      expect(axios.all.mock.results[0].value[0]).toEqual({
        data: {
          matches: "tempMatchesData",
        },
      });
    });

    // 잠깐 대기*****************************************************************

    // it("잘못된 data format을 return할 경우, throw error한다", async () => {
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
    //     /^`경기 정보를 불러오는데 실패했습니다.`$/
    //   );
    // });

    // 잠깐 대기*****************************************************************

    // it("return값이 reject Promise일 경우, throw error한다", async () => {
    //   await setAxiosAllRightFormat();
    //   axios.get.mockRejectedValue("axios.get fail!");

    //   const resultFn = () => fetchMatchesWithinAWeek(tempBookmarkTeams);

    //   await expect(resultFn).rejects.toThrowError(
    //     /^해당 리그의 모든 팀을 불러오는데 실패했습니다.$/
    //   );
    // });
  });

  describe("axios.all", () => {
    // beforeEach(() => {
    //   axios.get.mockReset();
    //   axios.all.mockReset();
    // });

    it("올바른 data format을 return한다", async () => {
      setAxiosGetRightFormat();
      await setAxiosAllRightFormat();

      const data = await fetchMatchesWithinAWeek(tempBookmarkTeams);

      expect(axios.all.mock.results[0].value[0]).toEqual({
        data: {
          matches: "tempMatchesData",
        },
      });
    });
  });
});
