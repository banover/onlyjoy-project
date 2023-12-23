import matchCardView from "./views/matchCardView.js";
import matchCardSettingBarView from "./views/matchCardSettingBarView.js";
import addTeamModalView from "./views/addTeamModalView.js";
// import modalRestSelectionView from "./views/modalRestSelectionView.js";
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
    matchCardSettingBarView.render(Model.getAllBookmarkTeam());
    matchCardSettingBarView.addHandlerFilterMatchCards(
      controlFilteringMatchCards
    );
    matchCardSettingBarView.addHandlerDisplayAddTeamModal(
      controlDisplayingAddTeamModal
    );
    //
    addTeamModalView.addHandlerCloseModal();
    addTeamModalView.addHandlerDisplayRestSelect(controlDisplayingRestSelect);
    addTeamModalView.addHandlerAddNewTeam(controlAddingNewTeam);
    //
    matchCardView.render(Model.state.matchCardData);
  } catch (error) {
    console.log(error);
    matchCardView.renderError(error);
  }
}

function controlFilteringMatchCards(formData) {
  matchCardView.render(Model.getFilterdMatchCardData(formData));
}

function controlDisplayingAddTeamModal() {
  addTeamModalView.render();
  // addTeamModalView.addHandlerCloseModal();
  // addTeamModalView.addHandlerDisplayRestSelect(controlDisplayingRestSelect);
  // addTeamModalView.addHandlerAddNewTeam(controlAddingNewTeam);
}

async function controlDisplayingRestSelect(league) {
  const { default: modalRestSelectionView } = await import(
    "./views/modalRestSelectionView.js"
  );
  console.log(modalRestSelectionView);
  modalRestSelectionView.renderSpinner(Model.state.spinnerItem);
  await Model.loadAllTeamsInALeague(league);
  console.log(Model.state.allTeamInALeague);
  modalRestSelectionView.render(Model.getRestSelectionData());
}

async function controlAddingNewTeam(formData) {
  Model.state.bookmarkTeams.push(Model.createNewBookmarkTeam(formData));
  Model.clearMatchCardData();
  await Model.loadMatchesData();
  matchCardSettingBarView.render(Model.getAllBookmarkTeam());
  matchCardView.render(Model.state.matchCardData);
}
