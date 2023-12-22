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
  addTeamModalView.addHandlerCloseModal();
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
  // 이 block안 제일 위에 addTeamModalView.renderSpinner()해놓고.. 밑에 display 4개를 하나(render형식)로 묶어서
  // 사용하고 clear도 구현해서 사용하면 되지 않을까?
  // 결국 그걸 별도의 view로 빼내야 하나?
  // addteammodalview의 generatemarkup에서도 결국 selection부분 4개를 하나의 div로 묶어야 할지도..
}

async function controlAddingNewTeam(formData) {
  Model.state.bookmarkTeams.push(Model.createNewBookmarkTeam(formData));
  Model.clearMatchCardData();
  await Model.loadMatchesData();
  matchCardSettingBarView.render(Model.getAllBookmarkTeam());
  matchCardView.render(Model.state.matchCardData);
}
