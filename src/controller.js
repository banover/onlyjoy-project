import matchCardView from "./views/matchCardView.js";
import matchCardFilterBarView from "./views/matchCardFilterBarView.js";
import * as Model from "./model.js";

init();

async function init() {
  renderThisWeekMatchCards();
}

// function renderMatchSchedule() {}

async function renderThisWeekMatchCards() {
  try {
    // matchCardFilterBarView.render(Model.state.bookmarkTeams);

    matchCardView.renderSpinner(Model.state.spinnerItem);
    // await Model.loadYoutubeLiveStreamData();
    await Model.loadMatchesData();
    console.log(Model.state.matchCardData);
    matchCardView.render(Model.state.matchCardData);
    matchCardView.addHandlerFilteringMatchCards();
  } catch (error) {
    console.log(error);
    matchCardView.renderError(error);
  }
}
