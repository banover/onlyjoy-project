class modalRemoveTeamFormView {
  #removeTeamContainer;
  #data;

  render(data) {
    this.#setModalAddTeamContainer();
    this.#data = data;
    this.#clearRemoveTeamModalContainer();
    this.#removeTeamContainer.insertAdjacentHTML(
      "beforeend",
      this.#generateMarkup()
    );
  }

  #setModalAddTeamContainer() {
    this.#removeTeamContainer = document.querySelector(
      ".onlyjoy__removeTeamFormContainer"
    );
  }

  #generateMarkup() {
    return `           
        <span class="onlyjoy__modalHeading">팀 제거</span>
        <form class="onlyjoy__teamRemoveModalForm">
            <div class="onlyjoy__modalRemoveTeamSelection">                  
                <select name="removeTeam" id="removeTeam" required>
                    <option disabled selected>제거할 팀을 선택해 주세요</option>
                    ${this.#data
                      .map((team) => {
                        return `
                                <option value="${team.name}">${team.name}</option>
                            `;
                      })
                      .join(" ")}
                    
                </select>
            </div>
            <div class="onlyjoy__modalButtonBox">
                <button class="onlyjoy__modalRemoveTeamButton">
                팀 제거하기
                </button>
            </div>
        </form>    
      `;
  }

  #clearRemoveTeamModalContainer() {
    this.#removeTeamContainer.innerHTML = "";
  }

  renderError(error) {
    this.#setModalAddTeamContainer();
    this.#clearRemoveTeamModalContainer();
    const markUp = `
        <div class="onlyjoy__matchCardError small">
          <img src="./public/warning.png" alt="a waring icon" />
          <div class="onlyjoy__errorMessage">
              <p>${error.message}</p>
              <p>이용에 불편을 드려 죄송합니다.</p>
          </div>
        </div>
      `;

    this.#removeTeamContainer.insertAdjacentHTML("beforeend", markUp);
  }
}

export default new modalRemoveTeamFormView();
