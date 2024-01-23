import { describe, expect, it } from "vitest";
import { state, getFilterdMatchCards } from "../../src/model";

const tempDate1 = new Date().setFullYear(2023, 11, 11);
const tempDate2 = new Date().setFullYear(2023, 11, 14);
const tempDate3 = new Date().setFullYear(2023, 11, 17);

describe("getFilterdMatchCards 함수", () => {
  it("올바른 값을 return한다", () => {
    state.matchCards = [
      {
        rawDate: new Date(tempDate1),
        searchedTeam: "tottonham",
      },
      {
        rawDate: new Date(tempDate2),
        searchedTeam: "tottonham",
      },
      {
        rawDate: new Date(tempDate3),
        searchedTeam: "psg",
      },
    ];

    const tempFormData1 = { filteringMethod: "date", filteringTeam: "all" };
    const tempFormData2 = {
      filteringMethod: "date",
      filteringTeam: "tottonham",
    };
    const tempFormData3 = { filteringMethod: "team", filteringTeam: "all" };
    const tempFormData4 = {
      filteringMethod: "team",
      filteringTeam: "psg",
    };

    const expectedResult1 = getFilterdMatchCards(tempFormData1);
    const expectedResult2 = getFilterdMatchCards(tempFormData2);
    const expectedResult3 = getFilterdMatchCards(tempFormData3);
    const expectedResult4 = getFilterdMatchCards(tempFormData4);

    expect(expectedResult1).toEqual([
      {
        rawDate: new Date(tempDate1),
        searchedTeam: "tottonham",
      },
      {
        rawDate: new Date(tempDate2),
        searchedTeam: "tottonham",
      },
      {
        rawDate: new Date(tempDate3),
        searchedTeam: "psg",
      },
    ]);

    expect(expectedResult2).toEqual([
      {
        rawDate: new Date(tempDate1),
        searchedTeam: "tottonham",
      },
      {
        rawDate: new Date(tempDate2),
        searchedTeam: "tottonham",
      },
    ]);

    expect(expectedResult3).toEqual([
      {
        rawDate: new Date(tempDate1),
        searchedTeam: "tottonham",
      },
      {
        rawDate: new Date(tempDate2),
        searchedTeam: "tottonham",
      },
      {
        rawDate: new Date(tempDate3),
        searchedTeam: "psg",
      },
    ]);

    expect(expectedResult4).toEqual([
      {
        rawDate: new Date(tempDate3),
        searchedTeam: "psg",
      },
    ]);
  });
});
