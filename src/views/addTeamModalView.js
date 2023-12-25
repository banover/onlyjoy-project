class addTeamModalView {
  #addTeamModalContainer = document.querySelector(".onlyjoy__addTeamModal");
  #overlayElement = document.querySelector(".overlay");
  #data;

  render(data) {
    this.#data = data;
    this.#clearAddTeamModalContainer();
    this.#addTeamModalContainer.insertAdjacentHTML(
      "beforeend",
      this.#generateMarkup()
    );
  }

  addHandlerCloseModal() {
    this.#addTeamModalContainer.addEventListener("click", (e) => {
      if (this.#isTargetModalExitButton(e)) {
        this.#closeModal();
        this.#closeOverlay();
      }
    });
  }

  #closeModal() {
    this.#addTeamModalContainer.style.display = "none";
  }

  #closeOverlay() {
    this.#overlayElement.style.display = "none";
  }

  #isTargetModalExitButton(e) {
    return e.target.closest(".onlyjoy__modalExitButton");
  }

  addHandlerDisplayRestSelect(handler) {
    this.#addTeamModalContainer.addEventListener("change", async (e) => {
      if (this.#isTargetModalLeagueSelect(e)) {
        this.#toggleActiveLeagueSelectElement(this.#getLeagueSelectElement());
        await handler(e.target.value);
        this.#toggleActiveLeagueSelectElement(this.#getLeagueSelectElement());
      }
    });
  }

  #isTargetModalLeagueSelect(e) {
    return e.target.closest("#league");
  }

  #toggleActiveLeagueSelectElement(leageElement) {
    leageElement.disabled = leageElement.disabled ? false : true;
  }

  #getLeagueSelectElement() {
    return document.querySelector("#league");
  }

  addHandlerAddNewTeam(handler) {
    this.#addTeamModalContainer.addEventListener("submit", (e) => {
      e.preventDefault();
      if (
        this.#isTargetModalForm(e) &&
        this.#isFormDataValidate(this.#getFormData())
      ) {
        this.#closeModal();
        this.#closeOverlay();
        handler(this.#getFormData());
      }
    });
  }

  #isTargetModalForm(e) {
    return e.target.closest(".onlyjoy__modalForm");
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

  #getFormData() {
    const formElement = document.querySelector(".onlyjoy__modalForm");
    const dataArr = [...new FormData(formElement)];
    return Object.fromEntries(dataArr);
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
              ${this.#data
                .map(
                  (league) =>
                    `<option value="${league.code}">${league.name}</option>`
                )
                .join(" ")}             
          </select>
        </div>
        <div class="onlyjoy__modalRestSelectionContainer"></div>        
      </form>     
    `;
  }

  #clearAddTeamModalContainer() {
    this.#addTeamModalContainer.innerHTML = "";
  }

  renderError(error) {
    this.#clearAddTeamModalContainer();
    const markUp = `
      <div class="onlyjoy__matchCardError">
        <img src="./public/warning.png" alt="a waring icon" />
        <div class="onlyjoy__errorMessage">
            <p>${error.message}</p>
            <p>이용에 불편을 드려 죄송합니다.</p>
        </div>
      </div>
    `;

    this.#addTeamModalContainer.insertAdjacentHTML("beforeend", markUp);
  }
}

export default new addTeamModalView();
