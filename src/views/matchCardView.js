class matchCardView {
  #matchData;
  #matchCardContainer = document.querySelector(".onlyjoy__matchCardContainer");

  render(data) {
    this.#matchData = data;
    this.#matchCardContainer.insertAdjacentHTML(
      "beforeend",
      this.generateMarkup()
    );
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
              this.#matchData.youtubeLiveChannels.length !== 0
                ? this.#matchData.youtubeLiveChannels
                    .map((channel) => {
                      return `              
                        <a href="${channel.url}" target="_blank">${channel.title}</a>
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

  #clearMatchCardContainer() {
    this.#matchCardContainer.innerHTML = "";
  }

  // renderSpinner() {
  //   return `
  //
  //   `
  // }
}

export default new matchCardView();
