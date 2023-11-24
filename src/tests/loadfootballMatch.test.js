const fetchFootballMatch = require("../services/fetchFootballMatch");

test("get a football match api data", () => {
  const matchData = await fetchFootballMatch();
  expect(matchData).toEqual({})
  //   expect(loadFootballMatch(1, 2)).toBe(3);
});
