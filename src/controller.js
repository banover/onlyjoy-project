import matchCardView from "./views/matchCardView.js";
import matchCardSettingBarView from "./views/matchCardSettingBarView.js";
import manageTeamModalView from "./views/manageTeamModalView.js";
import modalAddTeamFormView from "./views/modalAddTeamFormView.js";
import modalRemoveTeamFormView from "./views/modalRemoveTeamFormView.js";
import modalAddTeamRestSelectionView from "./views/modalAddTeamRestSelectionView.js";
import manageYoutubeChannelModalView from "./views/manageYoutubeChannelModalView.js";
import searchedYoutubeChannelView from "./views/searchedYoutubeChannelView.js";
import modalAddYoutubeChannelFormView from "./views/modalAddYoutubeChannelFormView.js";
import modalRemoveYoutubeChannelFormView from "./views/modalRemoveYoutubeChannelFormView.js";
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
    matchCardSettingBarView.addHandlerDisplayManageYoutubeChannelModal(
      controlDisplayingYoutubeChannel
    );

    manageTeamModalView.addHandlerCloseModal();
    manageTeamModalView.addHandlerDisplayAddTeamForm(
      controlDisplayingAddTeamForm
    );
    manageTeamModalView.addHandlerDisplayAddTeamRestSelect(
      controlDisplayingAddTeamRestSelect
    );
    manageTeamModalView.addHandlerAddNewTeam(controlAddingNewTeam);
    manageTeamModalView.addHandlerDisplayRemoveTeamForm(
      controlDisplayingRemoveTeamForm
    );
    manageTeamModalView.addHandlerRemoveTeam(controlRemoveingBookmarkTeam);

    manageYoutubeChannelModalView.addHandlerCloseModal();
    manageYoutubeChannelModalView.addHandlerDisplayAddYoutubeChannelForm(
      controlDisplayingAddYoutubeChannelForm
    );
    manageYoutubeChannelModalView.addHandlerDisplayRemoveYoutubeChannelForm(
      controlDisplayingRemoveYoutubeChannelForm
    );
    manageYoutubeChannelModalView.addHandlerRemoveBookmarkYoutubeChannel(
      controlRemovingBookmarkYoutubeChannel
    );
    manageYoutubeChannelModalView.addHandlerSearchYoutubeChannel(
      controlDisplayingSearchedYoutubeChannels
    );
    manageYoutubeChannelModalView.addHandlerAddNewBookmarkYoutubeChannel(
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

function controlDisplayingManageTeamModal() {
  manageTeamModalView.render(Model.state.bookmarkTeams);
}

function controlDisplayingYoutubeChannel() {
  manageYoutubeChannelModalView.render(Model.state.bookmarkYoutubeChannels);
}

function controlDisplayingAddTeamForm() {
  modalAddTeamFormView.render(Model.state.availableLeague);
}

async function controlDisplayingAddTeamRestSelect(league) {
  try {
    modalAddTeamRestSelectionView.renderSpinner(Model.state.spinnerItem);
    await Model.loadAllTeamsInALeague(league);
    modalAddTeamRestSelectionView.render(Model.getRestSelectionData());
  } catch (error) {
    console.log(error);
    modalAddTeamRestSelectionView.renderError(error);
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
    matchCardView.renderError(error);
  }
}

function controlDisplayingRemoveTeamForm() {
  modalRemoveTeamFormView.render(Model.state.bookmarkTeams);
}

async function controlRemoveingBookmarkTeam(formData) {
  try {
    matchCardView.renderSpinner(Model.state.spinnerItem);
    Model.removingNewBookmarkTeam(formData);
    await Model.loadMatchesData();
    matchCardSettingBarView.render(Model.getAllBookmarkTeam());
    matchCardView.render(Model.state.matchCardData);
  } catch (error) {
    console.log(error);
    matchCardView.renderError(error);
  }
}

function controlDisplayingAddYoutubeChannelForm() {
  modalAddYoutubeChannelFormView.render();
}

function controlDisplayingRemoveYoutubeChannelForm() {
  modalRemoveYoutubeChannelFormView.render(Model.state.bookmarkYoutubeChannels);
}

async function controlRemovingBookmarkYoutubeChannel(formData) {
  try {
    matchCardView.renderSpinner(Model.state.spinnerItem);
    Model.removingBookmarkYoutubeChannel(formData);
    console.log(Model.state.bookmarkYoutubeChannels);
    await Model.loadYoutubeLiveStreamData();
    await Model.loadMatchesData();
    matchCardView.render(Model.state.matchCardData);
  } catch (error) {
    console.log(error);
    matchCardView.renderError(error);
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
    await Model.loadMatchesData();
    matchCardView.render(Model.state.matchCardData);
  } catch (error) {
    console.log(error);
    matchCardView.renderError(error);
  }
}
