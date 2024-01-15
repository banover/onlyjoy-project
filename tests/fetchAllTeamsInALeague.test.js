import { afterAll, beforeEach, describe, expect, it, vi, test } from "vitest";
import fetchAllTeamsInALeague from "../src/services/fetchAllTeamsInALeague";
import axios from "axios";

vi.mock("axios");
// axios.get.mockResolvedValue(
//   new Promise((resolve, reject) => {
//     resolve({
//       data: {
//         teams: "tempTeamData",
//       },
//     });
//   })
// );

describe("fetchAllTeamsInALeague()", () => {
  beforeEach(() => {
    axios.get.mockReset();
  });

  it("fetch 성공 후, 올바른 data형식을 return한다", async () => {
    axios.get.mockResolvedValue(
      new Promise((resolve, reject) => {
        resolve({
          data: {
            teams: "tempTeamData",
          },
        });
      })
    );

    const data = await fetchAllTeamsInALeague();

    expect(data).toBe("tempTeamData");
  });

  it("fetch value가 reject Promise일 경우, throw error한다", async () => {
    axios.get.mockRejectedValue("fetch fail!");

    const resultFn = () => fetchAllTeamsInALeague();

    await expect(resultFn).rejects.toThrowError(
      /^해당 리그의 모든 팀을 불러오는데 실패했습니다.$/
    );
  });

  it("fetch value가 resolve error Promise일 경우, throw error한다", async () => {
    axios.get.mockResolvedValue(
      new Promise((resolve, reject) => {
        resolve(new Error("test"));
      })
    );

    const resultFn = () => fetchAllTeamsInALeague();

    await expect(resultFn).rejects.toThrowError(
      /^해당 리그의 모든 팀을 불러오는데 실패했습니다.$/
    );
  });
});

// url에 특정 string이 포함되어 있는지...
// axios.get은 호출되고 있는지, 몇번 됐는지..
//
