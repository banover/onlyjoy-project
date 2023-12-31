class modalRemoveYoutubeChannelFormView {
  #removeYoutubeChannelFormContainer;
  #data;

  render(data) {
    this.#setRemoveYoutubeChannelContainer();
    this.#data = data;
    this.#clearRemoveYoutubeChannelFormContainer();
    this.#removeYoutubeChannelFormContainer.insertAdjacentHTML(
      "beforeend",
      this.#generateMarkup()
    );
  }

  #setRemoveYoutubeChannelContainer() {
    this.#removeYoutubeChannelFormContainer = document.querySelector(
      ".onlyjoy__removeChannelFormContainer"
    );
  }

  #generateMarkup() {
    // 이거 data넘겨받아서 다시 수정해야함...
    return ` 
        <span class="onlyjoy__modalHeading">채널 제거</span>
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

  #clearRemoveYoutubeChannelFormContainer() {
    this.#removeYoutubeChannelFormContainer.innerHTML = "";
  }

  renderError(error) {
    this.#setRemoveYoutubeChannelContainer();
    this.#clearRemoveYoutubeChannelFormContainer();
    const markUp = `
          <div class="onlyjoy__matchCardError small">
            <img src="./public/warning.png" alt="a waring icon" />
            <div class="onlyjoy__errorMessage">
                <p>${error.message}</p>
                <p>이용에 불편을 드려 죄송합니다.</p>
            </div>
          </div>
        `;

    this.#removeYoutubeChannelFormContainer.insertAdjacentHTML(
      "beforeend",
      markUp
    );
  }
}

export default new modalRemoveYoutubeChannelFormView();
