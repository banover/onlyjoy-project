class addYoutubeChannelModalView {
  #modalContainer = document.querySelector(
    ".onlyjoy__addYoutubeLiveStreamModal"
  );
  #overlayElement = document.querySelector(".overlay");
  #data;

  render(data) {
    this.#data = data;
    this.#clearModalContainer();
    this.#modalContainer.insertAdjacentHTML(
      "beforeend",
      this.#generateMarkup()
    );
  }

  addHandlerCloseModal() {
    this.#modalContainer.addEventListener("click", (e) => {
      if (e.target.closest(".onlyjoy__modalExitButton")) {
        this.#closeModal();
        this.#closeOverlay();
      }
    });
  }

  #closeModal() {
    this.#modalContainer.style.display = "none";
  }

  #closeOverlay() {
    this.#overlayElement.style.display = "none";
  }

  addHandlerSearchYoutubeChannel(handler) {
    this.#modalContainer.addEventListener("click", async (e) => {
      if (e.target.closest(".onlyjoy__searchButton")) {
        this.#toggleActiveSearchInputElement();
        this.#toggleActiveSearchButtonElement();
        await handler(this.#getSearchedYoutubeChannelTitle());
        this.#toggleActiveSearchInputElement();
        this.#toggleActiveSearchButtonElement();
      }
    });
  }

  #toggleActiveSearchInputElement() {
    const inputElement = this.#getSearchInputElement();
    inputElement.disabled = inputElement.disabled ? false : true;
  }

  #getSearchInputElement() {
    return document.querySelector(".onlyjoy__ChannelTitleInput");
  }

  #toggleActiveSearchButtonElement() {
    const searchButtonElement = document.querySelector(
      ".onlyjoy__searchButton"
    );
    searchButtonElement.disabled = searchButtonElement.disabled ? false : true;
  }

  #getSearchedYoutubeChannelTitle() {
    const inputElement = this.#getSearchInputElement();
    return inputElement.value;
  }

  addHandlerAddNewBookmarkYoutubeChannel(handler) {
    this.#modalContainer.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (e.target.closest(".onlyjoy__ChannelModalForm")) {
        this.#toggleActiveSearchInputElement();
        this.#toggleActiveSearchButtonElement();
        this.#inactiveFormSubmitButton();
        await handler(this.#getChannelData());
        // error발생시 모달과 overlay는 유지되어야..
        this.#closeModal();
        this.#closeOverlay();
      }
    });
  }

  #inactiveFormSubmitButton() {
    const submitButtonElement = document.querySelector(
      ".onlyjoy__modalUploadChannelButton"
    );
    submitButtonElement.disabled = true;
  }

  #getChannelData() {
    const formElement = document.querySelector(".onlyjoy__ChannelModalForm");
    const dataArr = [...new FormData(formElement)];
    const data = Object.fromEntries(dataArr);
    return JSON.parse(data.channelData);
  }

  #generateMarkup() {
    return `
        <div class="onlyjoy__modalExitButton">
            <img src="./public/remove-button.png" alt="an exit-button icon" />
        </div>
        <span class="onlyjoy__modalHeading">Youtube Channel 등록</span>
        <form class="onlyjoy__ChannelModalForm">
            <div class="onlyjoy__modalYoutubeChannelInput">
                <label class="onlyjoy__addItemName" for="searchedTitle">
                    <img
                    src="./public/you-tube.png"
                    alt="a youtube channel icon"
                    />
                    <span>채널 Handle</span>
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

  #clearModalContainer() {
    this.#modalContainer.innerHTML = "";
  }

  #clearSearchedYoutubeChannelContainer() {
    const searchedYoutubeChannelsElement = document.querySelector(
      ".onlyjoy__searchedYoutubeChannels"
    );
    searchedYoutubeChannelsElement.innerHTML = "";
  }

  renderError(error) {
    // this.#clearModalContainer();
    this.#clearSearchedYoutubeChannelContainer();
    const markUp = `
      <div class="onlyjoy__matchCardError small">
        <img src="./public/warning.png" alt="a waring icon" />
        <div class="onlyjoy__errorMessage">
            <p>${error.message}</p>
            <p>이용에 불편을 드려 죄송합니다.</p>
        </div>
      </div>
    `;

    this.#modalContainer.insertAdjacentHTML("beforeend", markUp);
  }
}

export default new addYoutubeChannelModalView();
