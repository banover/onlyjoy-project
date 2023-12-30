class matchCardSettingBarView {
  #data;
  #matchCardSettingBarContainer = document.querySelector(
    ".onlyjoy__settingContainer"
  );
  #addTeamModalElement = document.querySelector(".onlyjoy__addTeamModal");
  #addYoutubeChannelModalElement = document.querySelector(
    ".onlyjoy__addYoutubeLiveStreamModal"
  );
  #overlayElement = document.querySelector(".overlay");

  render(data) {
    this.#data = data;
    this.#clearMatchCardSettingBarContainer();
    this.#matchCardSettingBarContainer.insertAdjacentHTML(
      "beforeend",
      this.#generateMarkup()
    );
  }

  addHandlerFilterMatchCards(handler) {
    this.#matchCardSettingBarContainer.addEventListener("submit", (e) => {
      e.preventDefault();
      if (this.#isTargetFilterForm(e)) {
        handler(this.#getFormData());
      }
    });
  }

  #isTargetFilterForm(e) {
    return e.target.closest(".onlyjoy__filterForm");
  }

  #getFormData() {
    const formElement = document.querySelector(".onlyjoy__filterForm");
    const dataArr = [...new FormData(formElement)];
    return Object.fromEntries(dataArr);
  }

  addHandlerDisplayAddTeamModal(handler) {
    this.#matchCardSettingBarContainer.addEventListener("click", (e) => {
      if (this.#isTargetAddTeamButton(e)) {
        this.#displayAddTeamModal();
        handler();
      }
    });
  }

  #isTargetAddTeamButton(e) {
    return e.target.closest(".onlyjoy__AddTeamButton");
  }

  #displayAddTeamModal() {
    this.#overlayElement.style.display = "block";
    this.#addTeamModalElement.style.display = "flex";
  }

  addHandlerDisplayAddYoutubeChannelModal(handler) {
    this.#matchCardSettingBarContainer.addEventListener("click", (e) => {
      if (e.target.closest(".onlyjoy__AddLiveButton")) {
        this.#overlayElement.style.display = "block";
        this.#addYoutubeChannelModalElement.style.display = "flex";
        handler();
      }
    });
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
              <option value="date">일정순서</option>
              <option value="team">팀별순서</option>
            </select>
          </div>
          <div class="onlyjoy__select">
            <label for="filteringTeam">팀 선택</label>
            <select id="filteringTeam" name="filteringTeam">
              <option value="all">모든 팀</option>
              ${this.#data
                .map((teamName) => {
                  return `
                  <option value="${teamName}" >${teamName}</option>
                  `;
                })
                .join(" ")}          
            </select>
          </div>
          <button class="onlyjoy__searchBtn">정렬</button>
        </form>
      </div>
    </div>
    `;
  }

  #clearMatchCardSettingBarContainer() {
    this.#matchCardSettingBarContainer.innerHTML = "";
  }

  renderError(error) {
    this.#clearMatchCardSettingBarContainer();
    const markUp = `
      <div class="onlyjoy__matchCardError">
        <img src="./public/warning.png" alt="a waring icon" />
        <div class="onlyjoy__errorMessage">
            <p>${error.message}</p>
            <p>이용에 불편을 드려 죄송합니다.</p>
        </div>
      </div>
    `;

    this.#matchCardSettingBarContainer.insertAdjacentHTML("beforeend", markUp);
  }
}

export default new matchCardSettingBarView();
