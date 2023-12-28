import matchCardView from "./views/matchCardView.js";
import matchCardSettingBarView from "./views/matchCardSettingBarView.js";
import addTeamModalView from "./views/addTeamModalView.js";
import addYoutubeChannelModalView from "./views/addYoutubeChannelModalView.js";
// import searchedYoutubeChannelView from "./views/searchedYoutubeChannelView.js";
import * as Model from "./model.js";

init();

async function init() {
  renderThisWeekMatchCards();
}

async function renderThisWeekMatchCards() {
  try {
    console.log(Model.state.spinnerItem);
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
    addYoutubeChannelModalView.addHandlerCheckYoutubeChannel(
      controlDisplayingSearchedYoutubeChannels
    );
    matchCardView.render(Model.state.matchCardData);
  } catch (error) {
    console.log(error);
    matchCardView.renderError(error);
  }
}

// TODO : youtube channel title로 받지말고 channelID로 받자.. 그거 api 할당량 아끼고 코드도 간결
async function controlDisplayingSearchedYoutubeChannels(channelTitle) {
  const { default: searchedYoutubeChannelView } = await import(
    "./views/searchedYoutubeChannelView.js"
  );
  console.log(searchedYoutubeChannelView);
  try {
    // renderSpinner 돌리기 youtubeChannelModal에서..
    searchedYoutubeChannelView.renderSpinner(Model.state.spinnerItem);
    // youtube channel data 불러오기
    // await Model.loadSearchedYoutubeChannels(channelTitle);
    // console.log(Model.state.searchedYoutubeChannels);
    searchedYoutubeChannelView.render(Model.state.searchedYoutubeChannels);
    // searced youtube채널 display하기
  } catch (error) {}
  // try {
  //   matchCardView.renderSpinner(Model.state.spinnerItem);
  //   Model.addingNewBookmarkYoutubeChannel(data);
  //   console.log(Model.state.bookmarkYoutubeChannels);
  //   // await Model.loadYoutubeLiveStreamData();
  //   await Model.loadMatchesData();
  //   matchCardView.render(Model.state.matchCardData);
  //   return true;
  // } catch (error) {
  //   console.log(error);
  //   addYoutubeChannelModalView.renderError(error);
  //   return false;
  // }
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
  console.log(modalRestSelectionView);
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
