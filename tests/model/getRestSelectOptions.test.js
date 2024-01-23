import { describe, expect, it } from "vitest";
import { getRestSelectOptions, state } from "../../src/model";

describe("getRestSelectOptions 함수", () => {
  it("올바른 값을 return한다", () => {
    state.allTeamsInALeague = ["A", "B", "C", "D"];
    state.bookmarkLiveStreams = ["aChannel", "bChannel"];

    const data = getRestSelectOptions();

    expect(data).toEqual({
      teams: ["A", "B", "C", "D"],
      liveStreams: ["aChannel", "bChannel"],
    });
  });
});
