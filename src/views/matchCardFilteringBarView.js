class matchCardFilteringBarView {
  #data;
  #matchCardFilteringBarContainer = document.querySelector(
    ".onlyjoy__filteringBarContainer"
  );
  #manageBookmarkTeamModalElement = document.querySelector(
    ".onlyjoy__manageBookmarkTeamModal"
  );
  #manageBookmarkYoutubeChannelModalElement = document.querySelector(
    ".onlyjoy__manageBookmarkYoutubeChannelModal"
  );
  #overlayElement = document.querySelector(".overlay");

  render(data) {
    this.#data = data;
    this.#clearMatchCardFilteringBarContainer();
    this.#matchCardFilteringBarContainer.insertAdjacentHTML(
      "beforeend",
      this.#generateMarkup()
    );
  }

  addHandlerFilterMatchCards(handler) {
    this.#matchCardFilteringBarContainer.addEventListener("submit", (e) => {
      e.preventDefault();
      if (e.target.closest(".onlyjoy__filterForm")) {
        handler(this.#getFormData());
      }
    });
  }

  #getFormData() {
    const formElement = document.querySelector(".onlyjoy__filterForm");
    const dataArr = [...new FormData(formElement)];
    return Object.fromEntries(dataArr);
  }

  addHandlerDisplayManageBookmarkTeamModal(handler) {
    this.#matchCardFilteringBarContainer.addEventListener("click", (e) => {
      if (e.target.closest(".onlyjoy__manageBookmarkTeamButton")) {
        this.#displayOverlay();
        this.#displayManageBookmarkTeamModal();
        handler();
      }
    });
  }

  #displayOverlay() {
    this.#overlayElement.style.display = "block";
  }

  #displayManageBookmarkTeamModal() {
    this.#manageBookmarkTeamModalElement.style.display = "flex";
  }

  addHandlerDisplayManageBookmarkYoutubeChannelModal(handler) {
    this.#matchCardFilteringBarContainer.addEventListener("click", (e) => {
      if (e.target.closest(".onlyjoy__manageBookmarkYoutubeChannelButton")) {
        this.#displayOverlay();
        this.#displayManageBookmarkYoutubeChannelModal();
        handler();
      }
    });
  }

  #displayManageBookmarkYoutubeChannelModal() {
    this.#manageBookmarkYoutubeChannelModalElement.style.display = "flex";
  }

  #generateMarkup() {
    return `
    
      <div class="onlyjoy__manageButtonBar">
        <button class="onlyjoy__manageBookmarkTeamButton">+ TEAM</button>
        <button class="onlyjoy__manageBookmarkYoutubeChannelButton">+ 입중계</button>
      </div>
      <div class="onlyjoy__matchCardFilterBar">
        <img src="./public/filter.png" alt="a filter icon" />
        <form class="onlyjoy__filterForm">
          <div class="onlyjoy__filterSelect">
            <label for="filteringMethod">정렬 방식</label>
            <select id="filteringMethod" name="filteringMethod">
              <option value="date">일정순서</option>
              <option value="team">팀별순서</option>
            </select>
          </div>
          <div class="onlyjoy__filterSelect">
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
    
    `;
  }

  #clearMatchCardFilteringBarContainer() {
    this.#matchCardFilteringBarContainer.innerHTML = "";
  }

  renderError(error) {
    this.#clearMatchCardFilteringBarContainer();
    const markUp = `
      <div class="onlyjoy__matchCardError">
        <img src="./public/warning.png" alt="a waring icon" />
        <div class="onlyjoy__errorMessage">
            <p>${error.message}</p>
            <p>이용에 불편을 드려 죄송합니다.</p>
        </div>
      </div>
    `;

    this.#matchCardFilteringBarContainer.insertAdjacentHTML(
      "beforeend",
      markUp
    );
  }
}

export default new matchCardFilteringBarView();
