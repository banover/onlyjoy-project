class matchCardView {
  #matchesData;
  #filteredMatchesData;
  #matchCardContainer = document.querySelector(".onlyjoy__matchCardContainer");

  render(data, filteredData) {
    this.#matchesData = data;
    if (filteredData) {
      this.#filteredMatchesData = filteredData;
    }
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
    <div class="onlyjoy__matchCardFilterBar">
      <img src="./public/filter.png" alt="a filter icon" />
      <form class="onlyjoy__filterForm">
        <div class="onlyjoy__select">
          <label for="filteringMethod">정렬 방식</label>
          <select id="filteringMethod" name="filteringMethod">
            <option value="date">일정순서</option>
            <option value="team">팀별순서</option>
          </select>
        </div>
        <div class="onlyjoy__select">
          <label for="filteringTeam">팀 선택</label>
          <select id="filteringTeam" name="filteringTeam">
            <option value="all">모든 팀</option>
            ${[...new Set(this.#matchesData.map((data) => data.searchedTeam))]
              .map((team) => {
                return `
                <option value="${team}">${team}</option>
                `;
              })
              .join(" ")}          
          </select>
        </div>
        <button class="onlyjoy__searchBtn">정렬</button>
      </form>
    </div>

    <div class="onlyjoy__matchCards">
    ${(this.#filteredMatchesData
      ? this.#filteredMatchesData
      : this.#matchesData
    )
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
      .join(" ")};
    </div>`;
  }

  addHandlerFilteringMatchCards() {
    this.#matchCardContainer.addEventListener("submit", (e) => {
      e.preventDefault();

      const filteredData = this.#createFilteredData();
      return this.render(this.#matchesData, filteredData);
    });
  }

  #createFilteredData() {
    let result;
    const selectedFilteringMethodValue =
      document.getElementById("filteringMethod").value;
    const selectedFilteringTeamValue =
      document.getElementById("filteringTeam").value;

    if (selectedFilteringMethodValue === "date") {
      result =
        selectedFilteringTeamValue === "all"
          ? this.#matchesData
              .slice()
              .sort((a, b) => new Date(a.rawDate) - new Date(b.rawDate))
          : this.#matchesData
              .filter(
                (data) => data.searchedTeam === selectedFilteringTeamValue
              )
              .sort((a, b) => new Date(a.rawDate) - new Date(b.rawDate));

      return result;
    }
    if (selectedFilteringMethodValue === "team") {
      result =
        selectedFilteringTeamValue === "all"
          ? this.#matchesData
          : this.#matchesData.filter(
              (data) => data.searchedTeam === selectedFilteringTeamValue
            );

      return result;
    }
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
