class modalAddTeamRestSelectionView {
  #modalAddTeamRestSelectionContainer;
  #data;

  // modalRestSelectionContainer 이 부분을 render나 spinnerRender일 때 계속
  // setModalRestSelectionContainer해서 container 설정하는데
  // 이유는 dynamic import를 하기 때문이다.
  // 맨 처음에 import한 것을 계속 사용하는데, 그 import한 modalRestSelectionView
  // instance의 modalRestSelectionContainer부분 element가 삭제(addTeamModal clear때문)됐다가 다시 만들어져서
  // 기존의 container를 가리키면 원하는 데로 코드가 작동하지 않는다.
  // 추후 일기 쓸 때 활용할 계획, 당분간 살려두길..

  render(data) {
    this.#setModalRestSelectionContainer();
    this.#data = data;
    this.#clearModalAddTeamRestSelectionContainer();
    this.#modalAddTeamRestSelectionContainer.insertAdjacentHTML(
      "beforeend",
      this.#generateMarkup()
    );
  }

  #setModalRestSelectionContainer() {
    this.#modalAddTeamRestSelectionContainer = document.querySelector(
      ".onlyjoy__modalRestSelectionContainer"
    );
  }

  #generateMarkup() {
    return `
        <div class="onlyjoy__modalTeamSelection">
            <label class="onlyjoy__selectionLabel" for="team">
                <img src="./public/field.png" alt="a field icon" />
                <span>팀</span>
            </label> 
            <select name="team" id="team" required>
            <option disabled selected>팀을 선택해 주세요</option>
                ${this.#data.teams
                  .map((team) => {
                    return `
                    <option value='${JSON.stringify(team)}'>${
                      team.name
                    }</option>
                
                `;
                  })
                  .join(" ")}
            </select>        
        </div>
        <div class="onlyjoy__modalPlayerInput">
            <label class="onlyjoy__inputLabel" for="player">
                <img src="./public/jersey.png" alt="a jersey icon" />
                <span>선수</span>
            </label>
            <input type="text" name="player" id="player" placeholder="응원하는 선수를 입력해 주세요" required>
        </div>
        <div class="onlyjoy__modalLiveSelection">
            <label class="onlyjoy__selectionLabel" for="liveStream">
                <img src="./public/live.png" alt="a live icon" />
                <span>생중계</span>
            </label> 
            <select name="liveStream" id="liveStream" required>
                <option disabled selected>중계사이트를 선택해 주세요</option>
                ${this.#data.liveStreams.map((live) => {
                  return `
                    <option value='${JSON.stringify(live)}'>${
                    live.name
                  }</option>
                `;
                })}
            </select>
        </div>
        <div class="onlyjoy__modalButtonBox">
            <button class="onlyjoy__addTeamSubmitButton">등록하기</button>
        </div>
      `;
  }

  #clearModalAddTeamRestSelectionContainer() {
    this.#modalAddTeamRestSelectionContainer.innerHTML = "";
  }

  renderSpinner(teamsData) {
    this.#setModalRestSelectionContainer();
    this.#clearModalAddTeamRestSelectionContainer();
    const markUp = `
      <div class="spinner">
        ${teamsData
          .map((team) => {
            return `
            <img
              src="${team.logoUrl}"
              alt="a ${team.name} logo"
              width="50px"
              height="50px"
            />
          `;
          })
          .join(" ")}
        
      </div>
     `;

    this.#modalAddTeamRestSelectionContainer.insertAdjacentHTML(
      "beforeend",
      markUp
    );
  }

  renderError(error) {
    this.#setModalRestSelectionContainer();
    this.#clearModalAddTeamRestSelectionContainer();
    const markUp = `
      <div class="onlyjoy__matchCardError small">
        <img src="./public/warning.png" alt="a waring icon" />
        <div class="onlyjoy__errorMessage">
            <p>${error.message}</p>
            <p>이용에 불편을 드려 죄송합니다.</p>
        </div>
      </div>
    `;

    this.#modalAddTeamRestSelectionContainer.insertAdjacentHTML(
      "beforeend",
      markUp
    );
  }
}

export default new modalAddTeamRestSelectionView();
