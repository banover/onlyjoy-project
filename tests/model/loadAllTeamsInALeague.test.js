import { afterEach, describe, expect, it, vi } from "vitest";
import { loadAllTeamsInALeague, state } from "../../src/model";
import fetchAllTeamsInALeague from "../../src/services/fetchAllTeamsInALeague";

const mocks = vi.hoisted(() => {
  return {
    fetchAllTeamsInALeague: vi.fn((league) => {
      return [
        {
          shortName: "testName",
          id: 1234,
          crest: "testLogo",
        },
      ];
    }),
  };
});

vi.mock("../../src/services/fetchAllTeamsInALeague.js", () => {
  return {
    default: () => mocks.fetchAllTeamsInALeague(),
  };
});

// vi.mock("../../src/services/fetchAllTeamsInALeague.js", () => {
//   return {
//     default: () => {
//       return [
//         {
//           shortName: "testName",
//           id: 1234,
//           crest: "testLogo",
//         },
//       ];
//     },
//   };
// });

describe("loadAllTeamsInALeague 함수", () => {
  afterEach(() => {
    mocks.fetchAllTeamsInALeague.mockReset();
  });

  it("올바른 값을 return한다", async () => {
    const tempLeagueCode = 1234;

    await loadAllTeamsInALeague(tempLeagueCode);

    expect(state.allTeamsInALeague).toEqual([
      {
        name: "testName",
        id: 1234,
        logo: "testLogo",
      },
    ]);
  });

  it("잘못된 값이 return할 때, throw error한다", async () => {
    mocks.fetchAllTeamsInALeague.mockReturnValue(new Error("forTestError"));

    const tempLeagueCode = 1234;

    const resultFn = () => loadAllTeamsInALeague(tempLeagueCode);

    expect(resultFn).rejects.toThrow();
  });
});
