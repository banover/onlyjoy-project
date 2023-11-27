const fetchFootballMatch = require("../services/fetchFootballMatch");
// const sum = require("../services/fetchFootballMatch");

test("get a football match api data", async () => {
  const matchData = fetchFootballMatch();
  expect(matchData).toEqual({});
  // expect(sum(1, 2)).toBe(3);
});
