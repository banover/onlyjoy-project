import matchCardView from "./views/matchCardView.js";
import * as Model from "./model.js";

init();

async function init() {
  renderThisWeekMatchCards();
}

async function renderThisWeekMatchCards() {
  await Model.loadYoutubeLiveStreamData();
  await Model.loadMatchesData();
  console.log(Model.state.matchCardData);

  Model.state.matchCardData.forEach((match) => {
    new matchCardView(match).render();
  });
}
