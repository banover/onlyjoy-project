import matchCardView from "./views/matchCardView.js";
import matchCardSettingBarView from "./views/matchCardSettingBarView.js";
import addTeamModalView from "./views/addTeamModalView.js";
import addYoutubeChannelModalView from "./views/addYoutubeChannelModalView.js";
import * as Model from "./model.js";

init();

async function init() {
  renderThisWeekMatchCards();
}

async function renderThisWeekMatchCards() {
  try {
    matchCardView.renderSpinner(Model.state.spinnerItem);
    await Model.loadYoutubeLiveStreamData();
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
    addYoutubeChannelModalView.addHandlerCheckYoutubeChannel(
      controlDisplayingSearchedYoutubeChannels
    );
    addYoutubeChannelModalView.addHandlerAddNewYoutubeChannel(
      controlAddingNewYoutubeChannel
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

function controlDisplayingYoutubeChannel(channelData) {
  addYoutubeChannelModalView.render();
}

async function controlDisplayingRestSelect(league) {
  const { default: modalRestSelectionView } = await import(
    "./views/modalRestSelectionView.js"
  );
  try {
    modalRestSelectionView.renderSpinner(Model.state.spinnerItem);
    await Model.loadAllTeamsInALeague(league);
    console.log(Model.state.allTeamInALeague);
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
  const { default: searchedYoutubeChannelView } = await import(
    "./views/searchedYoutubeChannelView.js"
  );
  try {
    searchedYoutubeChannelView.renderSpinner(Model.state.spinnerItem);
    await Model.loadSearchedYoutubeChannels(channelTitle);
    searchedYoutubeChannelView.render(Model.state.searchedYoutubeChannels);
  } catch (error) {
    console.log(error);
    searchedYoutubeChannelView.renderError(error);
  }
}

async function controlAddingNewYoutubeChannel(channelData) {
  try {
    matchCardView.renderSpinner(Model.state.spinnerItem);
    Model.addingNewBookmarkYoutubeChannel(channelData);
    console.log(Model.state.bookmarkYoutubeChannels);
    await Model.loadYoutubeLiveStreamData();
    await Model.loadMatchesData();
    matchCardView.render(Model.state.matchCardData);
  } catch (error) {
    console.log(error);
    addYoutubeChannelModalView.renderError(error);
  }
}
