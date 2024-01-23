import { describe, expect, it } from "vitest";
import { addNewBookmarkTeam } from "../../src/model";

describe("addNewBookmarkTeam 함수", () => {
  it("올바른 값을 return한다", () => {
    const tempFormData = {
      team: JSON.stringify({ name: "psg", id: 1, logo: "testLogo" }),
      player: "이강인",
      liveStream: JSON.stringify({ name: "testChannel", url: "testUrl" }),
    };

    addNewBookmarkTeam(tempFormData);
    const expectedData = JSON.parse(localStorage.getItem("bookmarkTeams"));

    expect(expectedData).toEqual([
      {
        name: "psg",
        id: 1,
        player: "이강인",
        liveStream: "testChannel",
        liveUrl: "testUrl",
        logoUrl: "testLogo",
      },
    ]);
  });
});
