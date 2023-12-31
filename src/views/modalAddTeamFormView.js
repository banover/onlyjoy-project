class modalAddTeamFormView {
  #addTeamContainer;
  #data;

  render(data) {
    this.#setModalAddTeamContainer();
    this.#data = data;
    this.#clearAddTeamModalContainer();
    this.#addTeamContainer.insertAdjacentHTML(
      "beforeend",
      this.#generateMarkup()
    );
  }

  #setModalAddTeamContainer() {
    this.#addTeamContainer = document.querySelector(
      ".onlyjoy__addTeamFormContainer"
    );
  }

  #generateMarkup() {
    return `           
        <span class="onlyjoy__modalHeading">팀 등록</span>
        <form class="onlyjoy__teamAddModalForm">
        <div class="onlyjoy__modalLeagueSelection">
            <label class="onlyjoy__selectionLabel" for="league">
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
    this.#addTeamContainer.innerHTML = "";
  }

  renderError(error) {
    this.#setModalAddTeamContainer();
    this.#clearAddTeamModalContainer();
    const markUp = `
      <div class="onlyjoy__matchCardError small">
        <img src="./public/warning.png" alt="a waring icon" />
        <div class="onlyjoy__errorMessage">
            <p>${error.message}</p>
            <p>이용에 불편을 드려 죄송합니다.</p>
        </div>
      </div>
    `;

    this.#addTeamContainer.insertAdjacentHTML("beforeend", markUp);
  }
}

export default new modalAddTeamFormView();
