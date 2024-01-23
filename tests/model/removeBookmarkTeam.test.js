import { describe, expect, it } from "vitest";
import { removeBookmarkTeam, state } from "../../src/model";

describe("removeBookmarkTeam 함수", () => {
  it("올바른 값을 return한다", () => {
    state.bookmarkTeams = [{ name: "psg" }, { name: "bayern" }];

    const tempFormData = {
      removeTeam: "psg",
    };

    removeBookmarkTeam(tempFormData);
    const expectedLocalstorageData = JSON.parse(
      localStorage.getItem("bookmarkTeams")
    );

    expect(state.bookmarkTeams).toEqual([{ name: "bayern" }]);
    expect(expectedLocalstorageData).toEqual([{ name: "bayern" }]);
  });
});
