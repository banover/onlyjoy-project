import matchCardView from "./views/matchCardView.js";
import matchCardSettingBarView from "./views/matchCardSettingBarView.js";
import addTeamModalView from "./views/addTeamModalView.js";
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
    matchCardSettingBarView.addHandlerDisplayAddTeamModal(
      controlDisplayingAddTeamModal
    );
    matchCardSettingBarView.addHandlerDisplayAddYoutubeChannelModal(
      controlDisplayingYoutubeChannel
    );

    addTeamModalView.addHandlerCloseModal();
    addTeamModalView.addHandlerDisplayRestSelect(controlDisplayingRestSelect);
    addTeamModalView.addHandlerAddNewTeam(controlAddingNewTeam);

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

function controlFilteringMatchCards(formData) {
  matchCardView.render(Model.getFilterdMatchCardData(formData));
}

function controlDisplayingAddTeamModal() {
  addTeamModalView.render(Model.state.availableLeague);
}

function controlDisplayingYoutubeChannel() {
  addYoutubeChannelModalView.render();
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
    addTeamModalView.renderError(error);
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
