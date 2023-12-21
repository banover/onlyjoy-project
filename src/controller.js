import matchCardView from "./views/matchCardView.js";
import matchCardSettingBarView from "./views/matchCardSettingBarView.js";
import addTeamModalView from "./views/addTeamModalView.js";
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
  addTeamModalView.addHandlerDisplayRestSelect(controlDisplayingRestSelect);
  addTeamModalView.addHandlerAddNewTeam(controlAddingNewTeam);
}

async function controlDisplayingRestSelect(league) {
  await Model.loadAllTeamsInALeague(league);
  console.log(Model.state.allTeamInALeague);
  addTeamModalView.displayModalTeamSelection(Model.state.allTeamInALeague);
  addTeamModalView.displayModalPlayerInput();
  addTeamModalView.displayModalLiveSelection(Model.state.bookmarkLiveStreams);
  addTeamModalView.displayModalButton();
  // addTeamModalView의 display 부분들 label이랑 select같이 markup으로 만들어서
  // 한번에 insert하고 container clear도 할 수 있게 만들고 spinner도 되게하고
  // class냐 아니면 addTeamModalview 안에 만드냐가 제일 고민..(안에 만들자)
}

async function controlAddingNewTeam(formData) {
  Model.state.bookmarkTeams.push(Model.createNewBookmarkTeam(formData));
  Model.clearMatchCardData();
  await Model.loadMatchesData();
  matchCardSettingBarView.render(Model.getAllBookmarkTeam());
  matchCardView.render(Model.state.matchCardData);
}
