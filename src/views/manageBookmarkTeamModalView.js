class manageBookmarkTeamModalView {
  #manageBookmarkTeamModalContainer = document.querySelector(
    ".onlyjoy__manageBookmarkTeamModal"
  );
  #overlayElement = document.querySelector(".overlay");
  #data;

  render(data) {
    this.#data = data;
    this.#clearManageBookmarkTeamModalContainer();
    this.#manageBookmarkTeamModalContainer.insertAdjacentHTML(
      "beforeend",
      this.#generateMarkup()
    );
  }

  addHandlerCloseModal() {
    this.#manageBookmarkTeamModalContainer.addEventListener("click", (e) => {
      if (e.target.closest(".onlyjoy__modalExitButton")) {
        this.#closeModal();
        this.#closeOverlay();
      }
    });
  }

  #closeModal() {
    this.#manageBookmarkTeamModalContainer.style.display = "none";
  }

  #closeOverlay() {
    this.#overlayElement.style.display = "none";
  }

  addHandlerDisplayAddTeamForm(handler) {
    this.#manageBookmarkTeamModalContainer.addEventListener(
      "click",
      async (e) => {
        if (e.target.closest(".onlyjoy__addTeamButton")) {
          this.#clearRemoveTeamFormContainer();
          handler();
        }
      }
    );
  }

  #clearRemoveTeamFormContainer() {
    const removeTeamFormContainer = document.querySelector(
      ".onlyjoy__removeTeamFormContainer"
    );
    removeTeamFormContainer.innerHTML = "";
  }

  addHandlerDisplayAddTeamRestSelect(handler) {
    this.#manageBookmarkTeamModalContainer.addEventListener(
      "change",
      async (e) => {
        if (e.target.closest(".onlyjoy__leagueSelect")) {
          this.#toggleActiveElement(this.#getLeagueSelectElement());
          await handler(e.target.value);
          this.#toggleActiveElement(this.#getLeagueSelectElement());
        }
      }
    );
  }

  #toggleActiveElement(element) {
    element.disabled = element.disabled ? false : true;
  }

  #getLeagueSelectElement() {
    return document.querySelector(".onlyjoy__leagueSelect");
  }

  addHandlerAddNewTeam(handler) {
    this.#manageBookmarkTeamModalContainer.addEventListener(
      "submit",
      async (e) => {
        e.preventDefault();
        if (
          this.#isTargetModalForm(e) &&
          this.#isFormDataValidate(
            this.#getFormData(this.#getAddTeamFormElement())
          )
        ) {
          this.#toggleActiveElement(this.#getAddTeamSubmitButtonElement());
          this.#closeModal();
          this.#closeOverlay();
          await handler(this.#getFormData(this.#getAddTeamFormElement()));
        }
      }
    );
  }

  #isTargetModalForm(e) {
    return e.target.closest(".onlyjoy__addTeamForm");
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

  #getAddTeamFormElement() {
    return document.querySelector(".onlyjoy__addTeamForm");
  }

  #getAddTeamSubmitButtonElement() {
    return document.querySelector(".onlyjoy__addTeamSubmitButton");
  }

  addHandlerDisplayRemoveTeamForm(handler) {
    this.#manageBookmarkTeamModalContainer.addEventListener(
      "click",
      async (e) => {
        if (e.target.closest(".onlyjoy__removeTeamButton")) {
          this.#clearAddTeamFormContainer();
          handler();
        }
      }
    );
  }

  #clearAddTeamFormContainer() {
    const addTeamFormContainer = document.querySelector(
      ".onlyjoy__addTeamFormContainer"
    );
    addTeamFormContainer.innerHTML = "";
  }

  addHandlerRemoveTeam(handler) {
    this.#manageBookmarkTeamModalContainer.addEventListener(
      "submit",
      async (e) => {
        e.preventDefault();
        if (e.target.closest(".onlyjoy__removeTeamForm")) {
          this.#toggleActiveElement(this.#getRemoveTeamSubmitButtonElement());
          this.#closeModal();
          this.#closeOverlay();
          await handler(this.#getFormData(this.#getTeamRemoveFormElement()));
        }
      }
    );
  }

  #getRemoveTeamSubmitButtonElement() {
    return document.querySelector(".onlyjoy__removeTeamSubmitButton");
  }

  #getTeamRemoveFormElement() {
    return document.querySelector(".onlyjoy__removeTeamForm");
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

  #clearManageBookmarkTeamModalContainer() {
    this.#manageBookmarkTeamModalContainer.innerHTML = "";
  }

  renderError(error) {
    this.#clearManageBookmarkTeamModalContainer();
    const markUp = `
      <div class="onlyjoy__matchCardError small">
        <img src="./public/warning.png" alt="a waring icon" />
        <div class="onlyjoy__errorMessage">
            <p>${error.message}</p>
            <p>이용에 불편을 드려 죄송합니다.</p>
        </div>
      </div>
    `;

    this.#manageBookmarkTeamModalContainer.insertAdjacentHTML(
      "beforeend",
      markUp
    );
  }
}

export default new manageBookmarkTeamModalView();
