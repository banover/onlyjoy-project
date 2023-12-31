class modalAddYoutubeChannelFormView {
  #addYoutubeChannelFormContainer;
  #data;

  render(data) {
    this.#setAddYoutubeChannelFormContainer();
    this.#data = data;
    this.#clearAddYoutubeChannelFormContainer();
    this.#addYoutubeChannelFormContainer.insertAdjacentHTML(
      "beforeend",
      this.#generateMarkup()
    );
  }

  #setAddYoutubeChannelFormContainer() {
    this.#addYoutubeChannelFormContainer = document.querySelector(
      ".onlyjoy__addChannelFormContainer"
    );
  }

  #generateMarkup() {
    return `           
        <form class="onlyjoy__ChannelModalForm">
            <div class="onlyjoy__modalYoutubeChannelInput">
                <label class="onlyjoy__inputLabel" for="searchedTitle">
                    <img
                    src="./public/you-tube.png"
                    alt="a youtube channel icon"
                    />
                    <span>channel 검색</span>
                </label>
                <input
                    class="onlyjoy__ChannelTitleInput"
                    type="text"
                    name="searchedTitle"
                    id="searchedTitle"
                    placeholder="채널 이름을 입력해 주세요"
                    required
                />
            </div>
            <div class="onlyjoy__modalButtonBox">
                <button class="onlyjoy__searchButton">채널 확인하기</button>
            </div>
            <div class="onlyjoy__searchedYoutubeChannels"></div>    
        </form>      
      `;
  }

  #clearAddYoutubeChannelFormContainer() {
    this.#addYoutubeChannelFormContainer.innerHTML = "";
  }

  renderError(error) {
    this.#setAddYoutubeChannelFormContainer();
    this.#clearAddYoutubeChannelFormContainer();
    const markUp = `
        <div class="onlyjoy__matchCardError small">
          <img src="./public/warning.png" alt="a waring icon" />
          <div class="onlyjoy__errorMessage">
              <p>${error.message}</p>
              <p>이용에 불편을 드려 죄송합니다.</p>
          </div>
        </div>
      `;

    this.#addYoutubeChannelFormContainer.insertAdjacentHTML(
      "beforeend",
      markUp
    );
  }
}

export default new modalAddYoutubeChannelFormView();
