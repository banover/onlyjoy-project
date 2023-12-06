export default class matchCardView {
  #matchData;
  #matchCardContainer = document.querySelector(".onlyjoy__matchCardContainer");
  constructor(matchData) {
    this.#matchData = matchData;
  }

  generateMarkup() {
    return `
    <div class="onlyjoy__match">
        <div class="onlyjoy__matchRow">
            <span>${this.#matchData.competition}</span>
            <div class="row-line"></div>
        </div>
        <div class="onlyjoy__matchDetails">
            <p class="onlyjoy__matchTeams">${this.#matchData.homeTeam} VS ${
      this.#matchData.awayTeam
    }
            </p>
            <p class="onlyjoy__matchTimes">경기시간 - ${
              this.#matchData.Date
            }</p>
            <p class="onlyjoy__matchBroadcasting">
                중계 -
                <a href="${this.#matchData.liveUrl}" target="_blank"
                    >${this.#matchData.liveStream}</a
                >
            </p>

            <p class="onlyjoy__matchYouTubeLiveBroadcasting">
            입중계 LIVE - ${
              this.#matchData.youtubeLiveChannel.length !== 0
                ? this.#matchData.youtubeLiveChannel
                    .map((data) => {
                      return `              
                        <a href="${data.channelUrl}" target="_blank">${data.channelTitle}</a>
                      `;
                    })
                    .join(" ")
                : "upcoming..."
            }
            </p>              
        </div>
        <div class="onlyjoy__matchRow">
            <div class="row-line"></div>
            <span>${this.#matchData.player}</span>
        </div>
    </div>`;
  }

  render() {
    this.#matchCardContainer.insertAdjacentHTML(
      "beforeend",
      this.generateMarkup()
    );
  }
}
