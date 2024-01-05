class matchCardView {
  #data;
  #matchCardContainer = document.querySelector(".onlyjoy__matchCards");

  render(data) {
    this.#data = data;
    this.#clearMatchCardContainer();
    this.#matchCardContainer.insertAdjacentHTML(
      "beforeend",
      this.#generateMarkup()
    );
  }

  #clearMatchCardContainer() {
    this.#matchCardContainer.innerHTML = "";
  }

  #generateMarkup() {
    return `      
      ${
        this.#data.length > 0
          ? this.#data
              .map((match) => {
                return `
          <div class="onlyjoy__matchCard">
            <div class="onlyjoy__matchLeauge">
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
                      <span class="onlyjoy__matchScore">${match.score}</span>
                      <span class="onlyjoy__matchStatus">${match.status}</span>
                    </div>
                  `
                    : match.status === "경기 전"
                    ? `
                    <div class="onlyjoy__beforeMatch">
                      <span class="onlyjoy__matchReady">VS</span>
                      <span class="onlyjoy__matchStatus">${match.status}</span>
                    </div> 
                  `
                    : `
                    <div class="onlyjoy__duringMatch">
                      <span class="onlyjoy__matchScore">${match.score}</span>
                      <span class="onlyjoy__matchStatus">${match.status}</span>
                    </div> `
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
                  중계 - <a href="${match.liveUrl}" target="_blank">${
                  match.liveStream
                }</a>
                </p>
                <p class="onlyjoy__matchYouTubeLiveBroadcasting">
                  ${match.status === "경기 종료" ? "후토크" : "입중계"} LIVE - 
                  ${
                    match.youtubeLiveChannels.length > 0
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
            <div class="onlyjoy__matchPlayer">            
              <span>${match.player}</span>
            </div>
          </div>        
          `;
              })
              .join(" ")
          : `<p class="onlyjoy__noMatchDescription">경기 일정이 없습니다!</p>`
      }            
    `;
  }

  renderSpinner(teams) {
    this.#clearMatchCardContainer();
    const markUp = `
      <div class="spinner">
        ${teams
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

  renderError(error) {
    this.#clearMatchCardContainer();
    const markUp = `
      <div class="onlyjoy__matchCardError">
        <img src="./public/warning.png" alt="a waring icon" />
        <div class="onlyjoy__errorMessage">
            <p>${error.message}</p>
            <p>이용에 불편을 드려 죄송합니다.</p>
        </div>
      </div>
    `;

    this.#matchCardContainer.insertAdjacentHTML("beforeend", markUp);
  }
}

export default new matchCardView();
