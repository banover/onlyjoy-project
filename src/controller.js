import matchCardView from "./views/matchCardView.js";
import * as Model from "./model.js";

init();

async function init() {
  renderThisWeekMatchCards();
}

async function renderThisWeekMatchCards() {
  // await Model.loadYoutubeLiveStreamData();
  // API 할당량 때문에 필요할 때만 사용하기
  await Model.loadMatchesData();
  console.log(Model.state.matchCardData);

  Model.state.matchCardData.forEach((match) => {
    matchCardView.render(match);
  });
}
