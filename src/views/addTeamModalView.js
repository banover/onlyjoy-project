class addTeamModalView {
  #addTeamModalContainer = document.querySelector(".onlyjoy__addTeamModal");

  render(data) {
    // this.#data = data;
    this.#clearAddTeamModalContainer();
    this.#addTeamModalContainer.insertAdjacentHTML(
      "beforeend",
      this.#generateMarkup()
    );
  }

  addHandlerDisplayRestSelect(handler) {
    this.#addTeamModalContainer.addEventListener("change", async (e) => {
      if (this.#isTargetLeagueSelectInModal(e)) {
        const leagueSelectElement = document.querySelector("#league");
        leagueSelectElement.disabled = true;
        // spinner
        await handler(e.target.value);

        leagueSelectElement.disabled = false;
      }
    });
  }

  #isTargetLeagueSelectInModal(e) {
    return e.target.closest("#league");
  }

  addHandlerAddNewTeam(handler) {
    this.#addTeamModalContainer.addEventListener("submit", (e) => {
      e.preventDefault();
      if (e.target.closest(".onlyjoy__modalForm")) {
        const overlayElement = document.querySelector(".overlay");
        this.#addTeamModalContainer.style.display = "none";
        overlayElement.style.display = "none";

        const formElement = document.querySelector(".onlyjoy__modalForm");
        const dataArr = [...new FormData(formElement)];
        const formData = Object.fromEntries(dataArr);
        console.log(formData);
        handler(formData);
      }
    });
  }

  #generateMarkup() {
    return `
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
                <input type="text" name="player" id="player">          
            </div>
            <div class="onlyjoy__modalLiveSelection">
                <label class="onlyjoy__addItemName" for="liveStream">
                    <img src="./public/live.png" alt="a live icon" />
                    <span>생중계</span>
                </label>          
            </div>
            
            <button class="onlyjoy__modalFormButton">만들기</button>
        </form>     
      `;
  }

  #clearAddTeamModalContainer() {
    this.#addTeamModalContainer.innerHTML = "";
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

  #createOptionElement(data) {
    console.log(data);
    const result = document.createElement("option");
    // result.setAttribute("value", `${team.name}, ${team.id}, ${team.logo}`);
    result.setAttribute("value", `${Object.values(data).join(",")}`);
    result.textContent = data.name;
    console.log(result);
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

  displayModalButton() {
    const submitButton = document.querySelector(".onlyjoy__modalFormButton");
    submitButton.style.display = "block";
  }
}

export default new addTeamModalView();
