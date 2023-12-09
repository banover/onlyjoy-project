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
          </div>
          <div class="onlyjoy__matchDetails">
            <div class="onlyjoy__matchTeams">
              <div class="onlyjoy__team">
                <img
                  src="${match.homeTeamEmblem}"
                  alt="a ${match.homeTeam} emblem"
                />
                <span class="onlyjoy__teamName">${match.homeTeam}</span>
                <span class="onlyjoy__teamPosition">HOME</span>
              </div>
              ${
                match.status === "경기 종료"
                  ? `
                <div class="onlyjoy__afterMatch">
                  <span class="onlyjoy__matchScore">2 : 1</span>
                  <span class="onlyjoy__matchStatus">경기 종료</span>
                </div>
                `
                  : `
                <div class="onlyjoy__beforeMatch">
                  <span class="onlyjoy__matchReady">VS</span>
                  <span class="onlyjoy__matchStatus">${
                    match.status === "경기 중" ? "경기 중" : "경기 전"
                  }</span>
                </div> 
                `
              }     
              <div class="onlyjoy__team">
                <img
                  src="${match.awayTeamEmblem}"
                  alt="a ${match.awayTeam} emblem"
                />
                <span class="onlyjoy__teamName">${match.awayTeam}</span>
                <span class="onlyjoy__teamPosition">AWAY</span>
              </div>
            </div>           
            <div class="onlyjoy__matchData">
              <p class="onlyjoy__matchTimes">${match.Date}</p>
              <p class="onlyjoy__matchBroadcasting">
                중계 - <a href="#" target="_blank">${match.liveStream}</a>
              </p>
              <p class="onlyjoy__matchYouTubeLiveBroadcasting">
                ${match.status === "경기 종료" ? "후토크" : "입중계"} LIVE - 
                ${
                  match.youtubeLiveChannels.length !== 0
                    ? match.youtubeLiveChannels
                        .map((channel) => {
                          return `              
                            <a href="${channel.url}" target="_blank">${channel.title}</a>
                          `;
                        })
                        .join(" ")
                    : match.status === "경기 종료"
                    ? "종료"
                    : "upcoming..."
                }
              </p>
            </div>
          </div>
          <div class="onlyjoy__matchRow">            
            <span>${match.player}</span>
          </div>
        </div>
        `;
      })
      .join(" ")}`;
  }
  // <img src="${match.competition}"></img>

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
