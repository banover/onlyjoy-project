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
    console.log(Model.getMatchCardData());
    matchCardView.render(Model.getMatchCardData());
    matchCardView.addHandlerFilterMatchCards(controlFilteringMatchCard);
    matchCardView.addHandlerDisplayAddTeamModal(controlDisplayingModalContent);
    matchCardView.addHandlerAddNewTeam(controlAddingNewTeam);
  } catch (error) {
    console.log(error);
    matchCardView.renderError(error);
  }
}

function controlFilteringMatchCard(formData) {
  matchCardView.render(Model.getFilterdMatchCardData(formData));
}

async function controlDisplayingModalContent(league) {
  await Model.loadAllTeamsInALeague(league);
  console.log(Model.state.allTeamInALeague);
  matchCardView.displayModalTeamSelection(Model.state.allTeamInALeague);
  matchCardView.displayModalPlayerInput();
  matchCardView.displayModalLiveSelection(Model.state.bookmarkLiveStreams);
  matchCardView.displayModalButton();
}

async function controlAddingNewTeam(formData) {
  Model.state.bookmarkTeams.push(Model.createNewBookmarkTeam(formData));
  // matchCardView.renderSpinner(Model.state.spinnerItem);
  Model.clearMatchCardData();
  await Model.loadMatchesData();
  matchCardView.render(Model.getMatchCardData());
}
