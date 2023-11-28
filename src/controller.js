import matchCardView from "./views/matchCardView.js";
import * as Model from "./model.js";

init();

function init() {
  renderThisWeekMatchCards();
}

function renderThisWeekMatchCards() {
  Model.bookmarkTeam.forEach(async (team) => {
    const matchData = await Model.loadMatchData(team.id);
    matchData.matches.forEach((match) => {
      new matchCardView(team.name, match).render();
    });
    console.log(matchData);
  });
}
