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
        handler();
      }
    });
  }

  addHandlerDisplayRemoveTeamForm(handler) {
    this.#manageTeamModalContainer.addEventListener("click", async (e) => {
      if (e.target.closest(".onlyjoy__removeTeamButton")) {
        handler();
      }
    });
  }

  addHandlerDisplayRestSelect(handler) {
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
    this.#manageTeamModalContainer.addEventListener("submit", (e) => {
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

  #getFormData() {
    const formElement = document.querySelector(".onlyjoy__teamAddModalForm");
    const dataArr = [...new FormData(formElement)];
    return Object.fromEntries(dataArr);
  }

  // #generateMarkup() {
  //   return `
  //     <div class="onlyjoy__modalExitButton">
  //       <img src="./public/remove-button.png" alt="an exit-button icon">
  //     </div>
  //     <span class="onlyjoy__modalHeading">팀 등록</span>
  //     <form class="onlyjoy__teamModalForm">
  //       <div class="onlyjoy__modalLeagueSelection">
  //         <label class="onlyjoy__addItemName" for="league">
  //             <img src="./public/stadium.png" alt="a stadium icon" />
  //             <span>리그</span>
  //         </label>
  //         <select name="league" id="league" required>
  //             <option disabled selected>리그를 선택해 주세요</option>
  //             ${this.#data
  //               .map(
  //                 (league) =>
  //                   `<option value="${league.code}">${league.name}</option>`
  //               )
  //               .join(" ")}
  //         </select>
  //       </div>
  //       <div class="onlyjoy__modalRestSelectionContainer"></div>
  //     </form>
  //   `;
  // }

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
        <span class="onlyjoy__currentTeamHeading">현재 등록된 팀</span>
        <div class="onlyjoy__currentTeamItemLists">
          <div class="onlyjoy__currentTeamList">
            <img
              src="https://crests.football-data.org/73.svg"
              alt="팀로고"
            />
            <span>토트넘</span>
          </div>
        </div>
      </div>

      <div class="onlyjoy__addTeamContainer"></div>

      <div class="onlyjoy__removeTeamContainer"></div>       
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
