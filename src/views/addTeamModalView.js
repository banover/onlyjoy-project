class addTeamModalView {
  #addTeamModalContainer = document.querySelector(".onlyjoy__addTeamModal");
  #overlayElement = document.querySelector(".overlay");

  render(data) {
    // this.#data = data;
    this.#clearAddTeamModalContainer();
    this.#addTeamModalContainer.insertAdjacentHTML(
      "beforeend",
      this.#generateMarkup()
    );
  }

  addHandlerCloseModal() {
    this.#addTeamModalContainer.addEventListener("click", (e) => {
      if (this.#isTargetModalExitButton(e)) {
        console.log("modal 닫기!");
        this.#overlayElement.style.display = "none";
        this.#addTeamModalContainer.style.display = "none";
      }
    });
  }

  #isTargetModalExitButton(e) {
    return e.target.closest(".onlyjoy__modalExitButton");
  }

  addHandlerDisplayRestSelect(handler) {
    this.#addTeamModalContainer.addEventListener("change", async (e) => {
      if (this.#isTargetModalLeagueSelect(e)) {
        const leagueSelectElement = document.querySelector("#league");
        leagueSelectElement.disabled = true;
        // spinner
        await handler(e.target.value);

        leagueSelectElement.disabled = false;
      }
    });
  }

  #isTargetModalLeagueSelect(e) {
    return e.target.closest("#league");
  }

  addHandlerAddNewTeam(handler) {
    this.#addTeamModalContainer.addEventListener("submit", (e) => {
      e.preventDefault();
      if (this.#isTargetModalForm(e)) {
        if (this.#isFormDataValidate(this.#getFormData())) {
          this.#addTeamModalContainer.style.display = "none";
          this.#overlayElement.style.display = "none";
          handler(this.#getFormData());
        }
      }
    });
  }

  #isTargetModalForm(e) {
    return e.target.closest(".onlyjoy__modalForm");
  }

  #getFormData() {
    const formElement = document.querySelector(".onlyjoy__modalForm");
    const dataArr = [...new FormData(formElement)];
    return Object.fromEntries(dataArr);
  }

  #isFormDataValidate(formData) {
    if (Object.keys(formData).length !== 4) {
      return false;
    }
    if (Object.values(formData).find((data) => data === "")) {
      return false;
    }
    return true;
  }

  #generateMarkup() {
    return `
      <div class="onlyjoy__modalExitButton">
        <img src="./public/remove-button.png" alt="an exit-button icon">
      </div>
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
              <option value="BL1">BUNDESLIGA</option>
          </select>
        </div>
        <div class="onlyjoy__modalRestSelectionContainer"></div>        
      </form>     
    `;
  }

  #clearAddTeamModalContainer() {
    this.#addTeamModalContainer.innerHTML = "";
  }

  displayModalTeamSelection(teams) {
    const teamSelectElementContainer = document.querySelector(
      ".onlyjoy__modalTeamSelection"
    );
    teamSelectElementContainer.innerHTML = "";
    teamSelectElementContainer.insertAdjacentHTML(
      "beforeend",
      this.#createTeamSelectMarkup(teams)
    );
    teamSelectElementContainer.style.display = "block";
  }

  #createTeamSelectMarkup(teams) {
    return `
      <label class="onlyjoy__addItemName" for="team">
        <img src="./public/field.png" alt="a field icon" />
        <span>팀</span>
      </label> 
      <select name="team" id="team" required>
        <option disabled selected>팀을 선택해 주세요</option>
        ${teams
          .map((team) => {
            return `
              <option value='${JSON.stringify(team)}'>${team.name}</option>
           
            `;
          })
          .join(" ")}
      </select>
    `;
  }
  // Object.values(team).join(",")

  displayModalPlayerInput() {
    const playerInputElementContainer = document.querySelector(
      ".onlyjoy__modalPlayerSelection"
    );
    playerInputElementContainer.innerHTML = "";
    playerInputElementContainer.insertAdjacentHTML(
      "beforeend",
      this.#createPlayerInputMarkup()
    );
  }

  #createPlayerInputMarkup() {
    return `
      <label class="onlyjoy__addItemName" for="player">
        <img src="./public/jersey.png" alt="a jersey icon" />
        <span>선수</span>
      </label>
      <input type="text" name="player" id="player" placeholder="응원하는 선수를 입력해 주세요" required>
    `;
  }

  displayModalLiveSelection(liveStreams) {
    const liveSelectElementContainer = document.querySelector(
      ".onlyjoy__modalLiveSelection"
    );
    liveSelectElementContainer.innerHTML = "";
    liveSelectElementContainer.insertAdjacentHTML(
      "beforeend",
      this.#createLiveStreamSelectMarkup(liveStreams)
    );
  }

  #createLiveStreamSelectMarkup(liveStreams) {
    return `
      <label class="onlyjoy__addItemName" for="liveStream">
        <img src="./public/live.png" alt="a live icon" />
        <span>생중계</span>
      </label> 
      <select name="liveStream" id="liveStream" required>
        <option disabled selected>중계사이트를 선택해 주세요</option>
        ${liveStreams.map((live) => {
          return `
            <option value='${JSON.stringify(live)}'>${live.name}</option>
          `;
        })}
      </select>
    `;
  }

  displayModalButton() {
    const modalButtonContainer = document.querySelector(
      ".onlyjoy__modalButtonBox"
    );
    modalButtonContainer.innerHTML = "";
    modalButtonContainer.insertAdjacentHTML(
      "beforeend",
      '<button class="onlyjoy__modalFormButton">등록하기</button>'
    );
  }
}

export default new addTeamModalView();
