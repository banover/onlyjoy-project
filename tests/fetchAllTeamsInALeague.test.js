import { afterAll, beforeEach, describe, expect, it, vi, test } from "vitest";
import fetchAllTeamsInALeague from "../src/services/fetchAllTeamsInALeague";
import axios from "axios";
import { BASE_URL, FOOTBALL_API_TOKEN } from "../src/config.js";

vi.mock("axios");

function setAxiosGetRightFormat() {
  axios.get.mockResolvedValue(
    new Promise((resolve, reject) => {
      resolve({
        data: {
          teams: "tempTeamData",
        },
      });
    })
  );
}

describe("fetchAllTeamsInALeague 함수", () => {
  describe("axios 모듈의 get method", () => {
    beforeEach(() => {
      axios.get.mockReset();
    });

    it("1번 호출된다", async () => {
      setAxiosGetRightFormat();

      const data = await fetchAllTeamsInALeague();

      expect(axios.get).toHaveBeenCalledTimes(1);
    });

    it("올바른 url을 첫번쨰 input으로 사용한다", async () => {
      setAxiosGetRightFormat();
      const tempLeagueCode = "forTest";

      const data = await fetchAllTeamsInALeague(tempLeagueCode);

      expect(axios.get.mock.calls[0][0]).toBe(
        `${BASE_URL}/competitions/${tempLeagueCode}/teams`
      );
    });

    it("올바른 header를 두번쨰 input으로 사용한다", async () => {
      setAxiosGetRightFormat();
      const tempLeagueCode = "12345679";

      const data = await fetchAllTeamsInALeague(tempLeagueCode);

      expect(axios.get.mock.calls[0][1]).toEqual({
        headers: { "X-Auth-Token": FOOTBALL_API_TOKEN },
      });
    });

    it("올바른 data format을 return한다", async () => {
      setAxiosGetRightFormat();

      const data = await fetchAllTeamsInALeague();

      expect(data).toBe("tempTeamData");
    });

    it("잘못된 data format을 return할 경우, throw error한다", async () => {
      axios.get.mockResolvedValue(
        new Promise((resolve, reject) => {
          resolve({
            data: {
              player: "tempPlayData",
            },
          });
        })
      );

      const resultFn = () => fetchAllTeamsInALeague();

      await expect(resultFn).rejects.toThrowError(
        /^해당 리그의 모든 팀을 불러오는데 실패했습니다.$/
      );
    });

    it("return값이 reject Promise일 경우, throw error한다", async () => {
      axios.get.mockRejectedValue("axios.get fail!");

      const resultFn = () => fetchAllTeamsInALeague();

      await expect(resultFn).rejects.toThrowError(
        /^해당 리그의 모든 팀을 불러오는데 실패했습니다.$/
      );
    });
  });
});
