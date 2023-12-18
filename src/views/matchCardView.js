class matchCardView {
  #data;
  #filteringType;
  #matchCardContainer = document.querySelector(".onlyjoy__matchCardContainer");

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
    <div class="onlyjoy__settingContainer">
      <div class="onlyjoy__AddButtonBar">
        <button class="onlyjoy__AddTeamButton">+ TEAM</button>
        <button class="onlyjoy__AddLiveButton">+ 입중계</button>
      </div>
      <div class="onlyjoy__matchCardFilterBar">
        <img src="./public/filter.png" alt="a filter icon" />
        <form class="onlyjoy__filterForm">
          <div class="onlyjoy__select">
            <label for="filteringMethod">정렬 방식</label>
            <select id="filteringMethod" name="filteringMethod">
              <option value="date"${
                this.#filteringType?.method &&
                this.#filteringType.method === "date"
                  ? "selected"
                  : ""
              }>일정순서</option>
              <option value="team"${
                this.#filteringType?.method &&
                this.#filteringType.method === "team"
                  ? "selected"
                  : ""
              }>팀별순서</option>
            </select>
          </div>
          <div class="onlyjoy__select">
            <label for="filteringTeam">팀 선택</label>
            <select id="filteringTeam" name="filteringTeam">
              <option value="all">모든 팀</option>
              ${this.#data.allBookmarkTeam
                .map((teamName) => {
                  return `
                  <option value="${teamName}" ${
                    this.#filteringType?.team &&
                    this.#filteringType.team === teamName
                      ? "selected"
                      : ""
                  }>${teamName}</option>
                  `;
                })
                .join(" ")}          
            </select>
          </div>
          <button class="onlyjoy__searchBtn">정렬</button>
        </form>
      </div>
    </div>

    <div class="onlyjoy__matchCards">
    ${this.#data.matchesData
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
          <div class="onlyjoy__matchRow">            
            <span>${match.player}</span>
          </div>
        </div>

        
        `;
      })
      .join(" ")}     
    </div>
    
    <div class="overlay"></div>
    <div class="onlyjoy__addTeamModal">
      <span class="onlyjoy__modalHeading">팀 등록</span>
      <form class="onlyjoy__modalForm">
        <div class="onlyjoy__modalLeagueSelection">
          <label class="onlyjoy__addItemName" for="league">
            <img src="./public/stadium.png" alt="a stadium icon" />
            <span>리그</span>
          </label>        
          <select name="league" id="league" required>
            <option disabled selected>리그를 선택해 주세요</option>
            <option value="PL">EPL</option>
            <option value="FL1">LIGUE 1</option>
            <option value="ABL">BUNDESLIGA</option>
          </select>
        </div>
        <div class="onlyjoy__modalTeamSelection">
          <label class="onlyjoy__addItemName" for="team">
            <img src="./public/field.png" alt="a field icon" />
            <span>팀</span>
          </label>          
        </div>
        <div class="onlyjoy__modalPlayerSelection">
          <label class="onlyjoy__addItemName" for="player">
            <img src="./public/jersey.png" alt="a jersey icon" />
            <span>선수</span>
          </label>
          <input type="text" name="player">          
        </div>
        <div class="onlyjoy__modalLiveSelection">
          <label class="onlyjoy__addItemName" for="liveStream">
            <img src="./public/live.png" alt="a live icon" />
            <span>생중계</span>
          </label>          
        </div>
        
        <button class="onlyjoy__modalFormButton">만들기</button>
      </form>     
    </div>`;
  }

  addHandlerFilterMatchCards(handler) {
    this.#matchCardContainer.addEventListener("submit", (e) => {
      e.preventDefault();
      if (e.target.closest(".onlyjoy__filterForm")) {
        const formElement = document.querySelector(".onlyjoy__filterForm");
        const dataArr = [...new FormData(formElement)];
        const formData = Object.fromEntries(dataArr);

        this.#filteringType = {
          method: formData.filteringMethod,
          team: formData.filteringTeam,
        };
        handler(formData);
      }
    });
  }

  addHandlerDisplayAddTeamModal(handler) {
    this.#matchCardContainer.addEventListener("click", (e) => {
      if (this.#isTargetAddTeamButton(e)) {
        const modalElement = document.querySelector(".onlyjoy__addTeamModal");
        const overlayElement = document.querySelector(".overlay");
        modalElement.style.display = "flex";
        overlayElement.style.display = "block";
      }
    });

    this.#matchCardContainer.addEventListener("change", async (e) => {
      if (this.#isTargetLeagueSelectInModal(e)) {
        handler(e.target.value);
      }
    });
  }

  #isTargetAddTeamButton(e) {
    return e.target.closest(".onlyjoy__AddTeamButton");
  }

  #isTargetLeagueSelectInModal(e) {
    return e.target.closest("#league");
  }

  displayModalTeamSelection(teams) {
    const teamSelecttionElement = document.querySelector(
      ".onlyjoy__modalTeamSelection"
    );
    const selectElement = this.#createTeamSelectElement(teams);
    teamSelecttionElement.insertAdjacentElement("beforeend", selectElement);
    teamSelecttionElement.style.display = "block";
  }

  #createTeamSelectElement(teams) {
    const result = document.createElement("select");
    result.setAttribute("name", "team");
    result.setAttribute("id", "team");

    const placeholderOptionElement =
      this.#createPlaceHolderOptionElement("팀을 선택해 주세요");
    result.insertAdjacentElement("beforeend", placeholderOptionElement);

    teams.forEach((team) => {
      const optionElement = this.#createOptionElement(team);
      result.insertAdjacentElement("beforeend", optionElement);
    });
    return result;
  }

  #createPlaceHolderOptionElement(text) {
    const result = document.createElement("option");
    result.setAttribute("disabled", "true");
    result.setAttribute("selected", "true");
    result.textContent = text;
    return result;
  }

  displayModalPlayerInput() {
    const playerSelecttionElement = document.querySelector(
      ".onlyjoy__modalPlayerSelection"
    );
    playerSelecttionElement.style.display = "block";
  }

  displayModalLiveSelection(liveStreams) {
    const liveSelecttionElement = document.querySelector(
      ".onlyjoy__modalLiveSelection"
    );
    const liveStreamSelectElement =
      this.#createLiveStreamSelectElement(liveStreams);

    liveSelecttionElement.insertAdjacentElement(
      "beforeend",
      liveStreamSelectElement
    );
    liveSelecttionElement.style.display = "block";
  }

  #createLiveStreamSelectElement(liveStreams) {
    const result = document.createElement("select");
    result.setAttribute("name", "liveStream");
    result.setAttribute("id", "liveStream");

    const placeholderOptionElement =
      this.#createPlaceHolderOptionElement("중계사이트를 선택해 주세요");
    result.insertAdjacentElement("beforeend", placeholderOptionElement);

    liveStreams.forEach((live) => {
      const optionElement = this.#createOptionElement(live);
      result.insertAdjacentElement("beforeend", optionElement);
    });
    return result;
  }

  #createOptionElement(data) {
    console.log(data);
    const result = document.createElement("option");
    // result.setAttribute("value", `${team.name}, ${team.id}, ${team.logo}`);
    result.setAttribute("value", `${Object.values(data).join(",")}`);
    result.textContent = data.name;
    console.log(result);
    return result;
  }

  displayModalButton() {
    const submitButton = document.querySelector(".onlyjoy__modalFormButton");
    submitButton.style.display = "block";
  }

  addHandlerAddNewTeam(handler) {
    this.#matchCardContainer.addEventListener("submit", (e) => {
      if (e.target.closest(".onlyjoy__modalForm")) {
        const modalElement = document.querySelector(".onlyjoy__addTeamModal");
        const overlayElement = document.querySelector(".overlay");
        modalElement.style.display = "none";
        overlayElement.style.display = "none";

        const formElement = document.querySelector(".onlyjoy__modalForm");
        const dataArr = [...new FormData(formElement)];
        const formData = Object.fromEntries(dataArr);
        console.log(formData);
        handler(formData);
      }
    });
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
