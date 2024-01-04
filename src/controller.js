import matchCardView from "./views/matchCardView.js";
import matchCardFilteringBarView from "./views/matchCardFilteringBarView.js";
import manageBookmarkTeamModalView from "./views/manageBookmarkTeamModalView.js";
import modalAddTeamFormView from "./views/modalAddTeamFormView.js";
import modalRemoveTeamFormView from "./views/modalRemoveTeamFormView.js";
import modalAddTeamRestSelectionView from "./views/modalAddTeamRestSelectionView.js";
import manageBookmarkYoutubeChannelModalView from "./views/manageYoutubeChannelModalView.js";
import modalSearchedYoutubeChannelView from "./views/modalSearchedYoutubeChannelView.js";
import modalAddYoutubeChannelFormView from "./views/modalAddYoutubeChannelFormView.js";
import modalRemoveYoutubeChannelFormView from "./views/modalRemoveYoutubeChannelFormView.js";
import * as Model from "./model.js";

init();

async function init() {
  renderThisWeekMatchCardPage();
}

// TODO: 팀을 선택해주세요 화면.. bookmarkteam이 있어도 뜸,
// bookmarkteam 있는데 match가 없을 경우 띄울 markup준비

async function renderThisWeekMatchCardPage() {
  try {
    matchCardView.renderSpinner(Model.state.bookmarkTeamLogos);
    // await Model.loadBookmarkYoutubeChannelLiveStream();
    await Model.loadBookmarkTeamMatches();
    console.log(Model.state.matchCards);

    matchCardFilteringBarView.render(Model.getAllBookmarkTeamName());
    matchCardFilteringBarView.addHandlerFilterMatchCards(
      controlFilteringMatchCards
    );
    matchCardFilteringBarView.addHandlerDisplayManageBookmarkTeamModal(
      controlDisplayingManageBookmarkTeamModal
    );
    matchCardFilteringBarView.addHandlerDisplayManageBookmarkYoutubeChannelModal(
      controlDisplayingManageBookmarkYoutubeChannelModal
    );

    manageBookmarkTeamModalView.addHandlerCloseModal();
    manageBookmarkTeamModalView.addHandlerDisplayAddTeamForm(
      controlDisplayingAddTeamForm
    );
    manageBookmarkTeamModalView.addHandlerDisplayAddTeamRestSelect(
      controlDisplayingAddTeamRestSelect
    );
    manageBookmarkTeamModalView.addHandlerAddNewTeam(controlAddingNewTeam);
    manageBookmarkTeamModalView.addHandlerDisplayRemoveTeamForm(
      controlDisplayingRemoveTeamForm
    );
    manageBookmarkTeamModalView.addHandlerRemoveTeam(
      controlRemoveingBookmarkTeam
    );

    manageBookmarkYoutubeChannelModalView.addHandlerCloseModal();
    manageBookmarkYoutubeChannelModalView.addHandlerDisplayAddYoutubeChannelForm(
      controlDisplayingAddYoutubeChannelForm
    );
    manageBookmarkYoutubeChannelModalView.addHandlerSearchedYoutubeChannel(
      controlDisplayingSearchedYoutubeChannels
    );
    manageBookmarkYoutubeChannelModalView.addHandlerAddNewBookmarkYoutubeChannel(
      controlAddingNewBookmarkYoutubeChannel
    );
    manageBookmarkYoutubeChannelModalView.addHandlerDisplayRemoveYoutubeChannelForm(
      controlDisplayingRemoveYoutubeChannelForm
    );
    manageBookmarkYoutubeChannelModalView.addHandlerRemoveBookmarkYoutubeChannel(
      controlRemovingBookmarkYoutubeChannel
    );

    matchCardView.render(Model.state.matchCards);
  } catch (error) {
    console.log(error);
    matchCardView.renderError(error);
  }
}

function controlFilteringMatchCards(formData) {
  matchCardView.render(Model.getFilterdMatchCards(formData));
}

function controlDisplayingManageBookmarkTeamModal() {
  manageBookmarkTeamModalView.render(Model.state.bookmarkTeams);
}

function controlDisplayingManageBookmarkYoutubeChannelModal() {
  manageBookmarkYoutubeChannelModalView.render(
    Model.state.bookmarkYoutubeChannels
  );
}

function controlDisplayingAddTeamForm() {
  modalAddTeamFormView.render(Model.state.availableLeague);
}

async function controlDisplayingAddTeamRestSelect(league) {
  try {
    modalAddTeamRestSelectionView.renderSpinner(Model.state.bookmarkTeamLogos);
    await Model.loadAllTeamsInALeague(league);
    modalAddTeamRestSelectionView.render(Model.getRestSelectOptions());
  } catch (error) {
    console.log(error);
    modalAddTeamRestSelectionView.renderError(error);
  }
}

async function controlAddingNewTeam(formData) {
  try {
    matchCardView.renderSpinner(Model.state.bookmarkTeamLogos);
    Model.addNewBookmarkTeam(formData);
    await Model.loadBookmarkTeamMatches();
    matchCardFilteringBarView.render(Model.getAllBookmarkTeamName());
    matchCardView.render(Model.state.matchCards);
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
    matchCardView.renderSpinner(Model.state.bookmarkTeamLogos);
    Model.removeBookmarkTeam(formData);
    await Model.loadBookmarkTeamMatches();
    matchCardFilteringBarView.render(Model.getAllBookmarkTeamName());
    matchCardView.render(Model.state.matchCards);
  } catch (error) {
    console.log(error);
    matchCardView.renderError(error);
  }
}

function controlDisplayingAddYoutubeChannelForm() {
  modalAddYoutubeChannelFormView.render();
}

async function controlDisplayingSearchedYoutubeChannels(channelTitle) {
  try {
    modalSearchedYoutubeChannelView.renderSpinner(
      Model.state.bookmarkTeamLogos
    );
    await Model.loadSearchedYoutubeChannels(channelTitle);
    modalSearchedYoutubeChannelView.render(Model.state.searchedYoutubeChannels);
  } catch (error) {
    console.log(error);
    modalSearchedYoutubeChannelView.renderError(error);
  }
}

async function controlAddingNewBookmarkYoutubeChannel(channelData) {
  try {
    matchCardView.renderSpinner(Model.state.bookmarkTeamLogos);
    Model.addNewBookmarkYoutubeChannel(channelData);
    console.log(Model.state.bookmarkYoutubeChannels);
    await Model.loadBookmarkYoutubeChannelLiveStream();
    await Model.loadBookmarkTeamMatches();
    matchCardView.render(Model.state.matchCards);
  } catch (error) {
    console.log(error);
    matchCardView.renderError(error);
  }
}

function controlDisplayingRemoveYoutubeChannelForm() {
  modalRemoveYoutubeChannelFormView.render(Model.state.bookmarkYoutubeChannels);
}

async function controlRemovingBookmarkYoutubeChannel(formData) {
  try {
    matchCardView.renderSpinner(Model.state.bookmarkTeamLogos);
    Model.removeBookmarkYoutubeChannel(formData);
    console.log(Model.state.bookmarkYoutubeChannels);
    await Model.loadBookmarkYoutubeChannelLiveStream();
    await Model.loadBookmarkTeamMatches();
    matchCardView.render(Model.state.matchCards);
  } catch (error) {
    console.log(error);
    matchCardView.renderError(error);
  }
}
