class matchCardSettingBarView {
  #data;
  #matchCardSettingBarContainer = document.querySelector(
    ".onlyjoy__settingContainer"
  );

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
      if (e.target.closest(".onlyjoy__filterForm")) {
        const formElement = document.querySelector(".onlyjoy__filterForm");
        const dataArr = [...new FormData(formElement)];
        const formData = Object.fromEntries(dataArr);

        handler(formData);
      }
    });
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
    const modalElement = document.querySelector(".onlyjoy__addTeamModal");
    const overlayElement = document.querySelector(".overlay");
    overlayElement.style.display = "block";
    modalElement.style.display = "flex";
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
}

export default new matchCardSettingBarView();
