class manageTeamModalView {
  #manageTeamModalContainer = document.querySelector(
    ".onlyjoy__manageTeamModal"
  );
  #overlayElement = document.querySelector(".overlay");
  #data;

  render(data) {
    this.#data = data;
    this.#clearManageTeamModalContainer();
    this.#manageTeamModalContainer.insertAdjacentHTML(
      "beforeend",
      this.#generateMarkup()
    );
  }

  addHandlerCloseModal() {
    this.#manageTeamModalContainer.addEventListener("click", (e) => {
      if (this.#isTargetModalExitButton(e)) {
        this.#closeModal();
        this.#closeOverlay();
      }
    });
  }

  #closeModal() {
    this.#manageTeamModalContainer.style.display = "none";
  }

  #closeOverlay() {
    this.#overlayElement.style.display = "none";
  }

  #isTargetModalExitButton(e) {
    return e.target.closest(".onlyjoy__modalExitButton");
  }

  addHandlerDisplayAddTeamForm(handler) {
    this.#manageTeamModalContainer.addEventListener("click", async (e) => {
      if (e.target.closest(".onlyjoy__addTeamButton")) {
        this.#clearRemoveTeamFormContainer();
        handler();
      }
    });
  }

  #clearRemoveTeamFormContainer() {
    const removeTeamFormContainer = document.querySelector(
      ".onlyjoy__removeTeamFormContainer"
    );
    removeTeamFormContainer.innerHTML = "";
  }

  addHandlerDisplayRemoveTeamForm(handler) {
    this.#manageTeamModalContainer.addEventListener("click", async (e) => {
      if (e.target.closest(".onlyjoy__removeTeamButton")) {
        this.#clearAddTeamFormContainer();
        handler();
      }
    });
  }

  #clearAddTeamFormContainer() {
    const addTeamFormContainer = document.querySelector(
      ".onlyjoy__addTeamFormContainer"
    );
    addTeamFormContainer.innerHTML = "";
  }

  addHandlerDisplayAddTeamRestSelect(handler) {
    this.#manageTeamModalContainer.addEventListener("change", async (e) => {
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
    this.#manageTeamModalContainer.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (
        this.#isTargetModalForm(e) &&
        this.#isFormDataValidate(
          this.#getFormData(this.#getTeamAddFormElement())
        )
      ) {
        // form button disable하기
        this.#closeModal();
        this.#closeOverlay();
        await handler(this.#getFormData(this.#getTeamAddFormElement()));
      }
    });
  }

  #isTargetModalForm(e) {
    return e.target.closest(".onlyjoy__teamAddModalForm");
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

  #getFormData(formElement) {
    const dataArr = [...new FormData(formElement)];
    return Object.fromEntries(dataArr);
  }

  #getTeamAddFormElement() {
    return document.querySelector(".onlyjoy__teamAddModalForm");
  }

  addHandlerRemoveTeam(handler) {
    this.#manageTeamModalContainer.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (e.target.closest(".onlyjoy__teamRemoveModalForm")) {
        // modal button disable

        this.#closeModal();
        this.#closeOverlay();
        await handler(this.#getFormData(this.#getTeamRemoveFormElement()));
      }
    });
  }

  #getTeamRemoveFormElement() {
    return document.querySelector(".onlyjoy__teamRemoveModalForm");
  }

  // +idea : onlyjoy__currentTeamContainer 부분의 onlyjoy__currentTeamList부분들은 표를 만들어서 display해도 될 듯
  #generateMarkup() {
    return `
      <div class="onlyjoy__modalExitButton">
        <img src="./public/remove-button.png" alt="an exit-button icon" />
      </div>
      
      <div class="onlyjoy__manageTeamButtonBox">
        <button class="onlyjoy__addTeamButton teamButton">팀 등록</button>
        <button class="onlyjoy__removeTeamButton teamButton">팀 제거</button>
      </div>

      <div class="onlyjoy__currentTeamContainer">
        <span class="onlyjoy__currentTeamHeading">등록된 팀</span>
        <div class="onlyjoy__currentBookmarkTeamItemLists">
          ${
            this.#data.length > 0
              ? this.#data
                  .map((team) => {
                    return `
                <div class="onlyjoy__currentTeamList">
                  <img
                    src="${team.logoUrl}"
                    alt="a ${team.name} logo"
                  />
                  <span>${team.name}</span>
                </div>
              `;
                  })
                  .join(" ")
              : `<p class="onlyjoy__currentTeamStatus">팀을 등록해 주세요.</p>`
          }          
        </div>
      </div>

      <div class="onlyjoy__manageTeamContainerBox">
        <div class="onlyjoy__addTeamFormContainer"></div>
        <div class="onlyjoy__removeTeamFormContainer"></div>
      </div>       
    `;
  }

  #clearManageTeamModalContainer() {
    this.#manageTeamModalContainer.innerHTML = "";
  }

  renderError(error) {
    this.#clearManageTeamModalContainer();
    const markUp = `
      <div class="onlyjoy__matchCardError small">
        <img src="./public/warning.png" alt="a waring icon" />
        <div class="onlyjoy__errorMessage">
            <p>${error.message}</p>
            <p>이용에 불편을 드려 죄송합니다.</p>
        </div>
      </div>
    `;

    this.#manageTeamModalContainer.insertAdjacentHTML("beforeend", markUp);
  }
}

export default new manageTeamModalView();
