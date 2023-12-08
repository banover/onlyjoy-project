class matchCardView {
  #matchesData;
  #matchCardContainer = document.querySelector(".onlyjoy__matchCardContainer");

  render(data) {
    this.#matchesData = data;
    this.#clearMatchCardContainer();
    this.#matchCardContainer.insertAdjacentHTML(
      "beforeend",
      this.#generateMarkup()
    );
  }

  #generateMarkup() {
    return `
    ${this.#matchesData
      .map((match) => {
        return `
          <div class="onlyjoy__match">
            <div class="onlyjoy__matchRow">
              <span>${match.competition}</span>
              <div class="row-line"></div>
            </div>
            <div class="onlyjoy__matchDetails">
              <p class="onlyjoy__matchTeams">
                ${match.homeTeam} VS ${match.awayTeam}
              </p>
              <span class="onlyjoy__matchStatus">
                ${match.status === "TIMED" ? "경기 전" : ""}              
                ${match.status === "IN_PLAY" ? "경기 중" : ""}              
                ${match.status === "FINISHED" ? "경기 종료" : ""}              
              </span>
              ${
                match.winner
                  ? `
                  <span class="onlyjoy__matchWinner">
                    승리팀 - ${match.winner}
                  </span>`
                  : ""
              }
              <p class="onlyjoy__matchTimes">경기시간 - ${match.Date}</p>
              <p class="onlyjoy__matchBroadcasting">
                중계 - <a href="${match.liveUrl}" target="_blank">
                ${match.liveStream}</a>
              </p>
              <p class="onlyjoy__matchYouTubeLiveBroadcasting">
              입중계 LIVE - 
              ${
                match.youtubeLiveChannels.length !== 0
                  ? match.youtubeLiveChannels
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
                <span>${match.player}</span>
            </div>
          </div>
        `;
      })
      .join(" ")}`;
  }

  #clearMatchCardContainer() {
    this.#matchCardContainer.innerHTML = "";
  }

  renderSpinner(teamsData) {
    const markUp = `
      <div class="spinner">
        ${teamsData
          .map((team) => {
            return `
            <img
              src="${team.logoUrl}"
              alt="a ${team.name} logo"
              width="150px"
              height="150px"
            />
          `;
          })
          .join(" ")}
        
      </div>
     `;

    this.#matchCardContainer.insertAdjacentHTML("beforeend", markUp);
  }
}

export default new matchCardView();
