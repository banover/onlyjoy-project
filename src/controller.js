import matchCardView from "./views/matchCardView.js";
import * as Model from "./model.js";

init();

function init() {
  renderThisWeekMatchCards();
}

async function renderThisWeekMatchCards() {
  await Model.loadMatchesData();
  console.log(Model.state.matchData);

  Model.state.matchData.forEach((match) => {
    new matchCardView(match).render();
  });
}
