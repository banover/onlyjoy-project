import { describe, expect, it } from "vitest";
import { state, getAllBookmarkTeamName } from "../../src/model";

describe("getAllBookmarkTeamName 함수", () => {
  it("올바른 값을 return한다", () => {
    const tempBookmarkTeams = [{ name: "test", id: 1, logo: "testLogo" }];
    state.bookmarkTeams = tempBookmarkTeams;

    const data = getAllBookmarkTeamName();

    expect(data).toEqual(["test"]);
  });
});
