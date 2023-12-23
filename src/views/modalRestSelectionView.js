// export default class modalRestSelectionView {
class modalRestSelectionView {
  #modalRestSelectionContainer;
  //   #modalRestSelectionContainer = document.querySelector(
  //     ".onlyjoy__modalRestSelectionContainer"
  //   );
  #data;

  render(data) {
    this.#data = data;
    this.#modalRestSelectionContainer = document.querySelector(
      ".onlyjoy__modalRestSelectionContainer"
    );
    console.log("1");
    this.#clearModalRestSelectionContainer();
    console.log("2");
    console.log(this.#modalRestSelectionContainer);
    this.#modalRestSelectionContainer.insertAdjacentHTML(
      "beforeend",
      this.#generateMarkup()
    );
  }

  #generateMarkup() {
    return `
        <div class="onlyjoy__modalTeamSelection">
            <label class="onlyjoy__addItemName" for="team">
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
        <div class="onlyjoy__modalPlayerSelection">
            <label class="onlyjoy__addItemName" for="player">
                <img src="./public/jersey.png" alt="a jersey icon" />
                <span>선수</span>
            </label>
            <input type="text" name="player" id="player" placeholder="응원하는 선수를 입력해 주세요" required>
        </div>
        <div class="onlyjoy__modalLiveSelection">
            <label class="onlyjoy__addItemName" for="liveStream">
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
            <button class="onlyjoy__modalFormButton">등록하기</button>
        </div>
      `;
  }

  #clearModalRestSelectionContainer() {
    this.#modalRestSelectionContainer.innerHTML = "";
  }

  renderSpinner(teamsData) {
    this.#modalRestSelectionContainer = document.querySelector(
      ".onlyjoy__modalRestSelectionContainer"
    );
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

    this.#modalRestSelectionContainer.insertAdjacentHTML("beforeend", markUp);
  }
}

export default new modalRestSelectionView();
