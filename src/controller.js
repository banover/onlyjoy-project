import matchCardView from "./views/matchCardView.js";
import matchCardSettingBarView from "./views/matchCardSettingBarView.js";
import manageTeamModalView from "./views/manageTeamModalView.js";
import modalAddTeamFormView from "./views/modalAddTeamView.js";
import modalRestSelectionView from "./views/modalRestSelectionView.js";
import addYoutubeChannelModalView from "./views/addYoutubeChannelModalView.js";
import searchedYoutubeChannelView from "./views/searchedYoutubeChannelView.js";
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
    matchCardSettingBarView.addHandlerDisplayManageTeamModal(
      controlDisplayingManageTeamModal
    );
    matchCardSettingBarView.addHandlerDisplayAddYoutubeChannelModal(
      controlDisplayingYoutubeChannel
    );

    manageTeamModalView.addHandlerCloseModal();
    manageTeamModalView.addHandlerDisplayAddTeamForm(
      controlDisplayingAddTeamForm
    );
    // TODO: 아래 코드 만들기
    // manageTeamModalView.addHandlerDisplayRemoveTeamSelect(
    //   controlDisplayingRemoveTeamForm
    // );
    manageTeamModalView.addHandlerDisplayRestSelect(
      controlDisplayingRestSelect
    );
    manageTeamModalView.addHandlerAddNewTeam(controlAddingNewTeam);

    addYoutubeChannelModalView.addHandlerCloseModal();
    addYoutubeChannelModalView.addHandlerSearchYoutubeChannel(
      controlDisplayingSearchedYoutubeChannels
    );
    addYoutubeChannelModalView.addHandlerAddNewBookmarkYoutubeChannel(
      controlAddingNewBookmarkYoutubeChannel
    );
    matchCardView.render(Model.state.matchCardData);
  } catch (error) {
    console.log(error);
    matchCardView.renderError(error);
  }
}

// TODO:
// function controlDisplayingRemoveTeamForm(){
//  modalRemoveTeamFormView.render();
// }

function controlFilteringMatchCards(formData) {
  matchCardView.render(Model.getFilterdMatchCardData(formData));
}

function controlDisplayingManageTeamModal() {
  manageTeamModalView.render();
}

function controlDisplayingYoutubeChannel() {
  addYoutubeChannelModalView.render();
}

function controlDisplayingAddTeamForm() {
  modalAddTeamFormView.render(Model.state.availableLeague);
}

async function controlDisplayingRestSelect(league) {
  try {
    modalRestSelectionView.renderSpinner(Model.state.spinnerItem);
    await Model.loadAllTeamsInALeague(league);
    modalRestSelectionView.render(Model.getRestSelectionData());
  } catch (error) {
    console.log(error);
    modalRestSelectionView.renderError(error);
  }
}

async function controlAddingNewTeam(formData) {
  try {
    matchCardView.renderSpinner(Model.state.spinnerItem);
    Model.addingNewBookmarkTeam(formData);
    await Model.loadMatchesData();
    matchCardSettingBarView.render(Model.getAllBookmarkTeam());
    matchCardView.render(Model.state.matchCardData);
  } catch (error) {
    console.log(error);
    manageTeamModalView.renderError(error);
  }
}

async function controlDisplayingSearchedYoutubeChannels(channelTitle) {
  try {
    searchedYoutubeChannelView.renderSpinner(Model.state.spinnerItem);
    await Model.loadSearchedYoutubeChannels(channelTitle);
    searchedYoutubeChannelView.render(Model.state.searchedYoutubeChannels);
  } catch (error) {
    console.log(error);
    searchedYoutubeChannelView.renderError(error);
  }
}

async function controlAddingNewBookmarkYoutubeChannel(channelData) {
  try {
    matchCardView.renderSpinner(Model.state.spinnerItem);
    Model.addingNewBookmarkYoutubeChannel(channelData);
    console.log(Model.state.bookmarkYoutubeChannels);
    await Model.loadYoutubeLiveStreamData();
    // 바로 위 코드에서 catch된 error가 throw되지 않음.. 따라서 이 밑에 catch에서 catch가 안됨
    await Model.loadMatchesData();
    matchCardView.render(Model.state.matchCardData);
  } catch (error) {
    console.log(error);
    addYoutubeChannelModalView.renderError(error);
  }
}
