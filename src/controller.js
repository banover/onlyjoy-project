import matchCardView from "./views/matchCardView.js";
import * as Model from "./model.js";

init();

async function init() {
  renderThisWeekMatchCards();
}

async function renderThisWeekMatchCards() {
  try {
    matchCardView.renderSpinner(Model.state.spinnerItem);
    // await Model.loadYoutubeLiveStreamData();
    await Model.loadMatchesData();
    console.log(Model.state.matchCardData);
    matchCardView.render(Model.state.matchCardData);
  } catch (err) {
    console.error(err);
    // Todo: errorView render 하기
  }
}
