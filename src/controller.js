import matchCardView from "./views/matchCardView.js";
import * as Model from "./model.js";

init();

async function init() {
  renderThisWeekMatchCards();
  // controlAddNewTeam();
}

async function renderThisWeekMatchCards() {
  try {
    matchCardView.renderSpinner(Model.state.spinnerItem);
    // await Model.loadYoutubeLiveStreamData();
    await Model.loadMatchesData();
    console.log(Model.getMatchCardData());
    matchCardView.render(Model.getMatchCardData());
    matchCardView.addHandlerFilteringMatchCards(controlFilterMatchCard);
    matchCardView.addHandlerAddingNewTeam(controlAddNewTeam);
  } catch (error) {
    console.log(error);
    matchCardView.renderError(error);
  }
}

function controlFilterMatchCard(formData) {
  matchCardView.render(Model.getFilterdMatchCardData(formData));
}

async function controlAddNewTeam() {
  await Model.loadAllTeamsInLeague("PL");
  console.log(Model.state.allTeamInALeague);
}
