export default class matchCardView {
  #teamName;
  #matchData;
  #parentElement = document.querySelector(".onlyjoy__matchContainer");

  constructor(teamName, matchData) {
    this.#teamName = teamName;
    this.#matchData = matchData;
  }

  generateMarkup() {
    return `
    <div class="onlyjoy__match">
        <div class="onlyjoy__matchRow">
            <span>${this.#matchData.competition.name}</span>
            <div class="row-line"></div>
        </div>
        <div class="onlyjoy__matchDetails">
            <p class="onlyjoy__matchTeams">${
              this.#matchData.homeTeam.name
            } VS ${this.#matchData.awayTeam.name}
            </p>
            <p class="onlyjoy__matchTimes">경기시간 - ${new Date(
              this.#matchData.utcDate
            ).toLocaleString()}</p>
            <p class="onlyjoy__matchBroadcasting">
                중계 -
                <a href="https://www.spotvnow.co.kr/" target="_blank"
                    >spotvNow</a
                >
            </p>
            <p class="onlyjoy__matchYouTubeLiveBroadcasting">
                입중계 LIVE - <a href="#" target="_blank">문도그</a>
            </p>
        </div>
        <div class="onlyjoy__matchRow">
            <div class="row-line"></div>
            <span>${this.getPlayerName(this.#teamName)}</span>
        </div>
    </div>`;
  }

  render() {
    this.#parentElement.insertAdjacentHTML("beforeend", this.generateMarkup());
  }

  getPlayerName() {
    if (this.#teamName === "Tottenham") {
      return "손흥민";
    }
    if (this.#teamName === "PSG") {
      return "이강인";
    }
    if (this.#teamName === "Bayern") {
      return "김민재";
    }
  }
}
