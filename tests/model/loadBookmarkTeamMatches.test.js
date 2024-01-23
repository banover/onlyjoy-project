import { describe, it, vi } from "vitest";
import { loadBookmarkTeamMatches, state } from "../../src/model";

vi.mock("../../src/services/fetchMatchesWithinAWeek.js", () => {
  return {
    default: () => {
      return [
        {
          data: {
            matches: [],
          },
        },
      ];
    },
  };
});

describe("loadBookmarkTeamMatches 함수", () => {
  it("올바른 값을 return한다", async () => {
    state.bookmarkTeams = [
      {
        name: "Tottenham",
        id: 73,
        player: "손흥민",
        liveStream: "Spotv",
        liveUrl: "https://www.spotvnow.co.kr/",
        logoUrl: "https://crests.football-data.org/73.svg",
      },
    ];

    await loadBookmarkTeamMatches();
  });
});
