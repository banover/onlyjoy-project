class manageYoutubeChannelModalView {
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

  addHandlerDisplayAddYoutubeChannelForm(handler) {
    this.#modalContainer.addEventListener("click", (e) => {
      if (e.target.closest(".onlyjoy__addChannelButton")) {
        this.#clearRemoveChannelFormContainer();
        handler();
      }
    });
  }

  #clearRemoveChannelFormContainer() {
    const removeChannelFormContainer = document.querySelector(
      ".onlyjoy__removeChannelFormContainer"
    );
    removeChannelFormContainer.innerHTML = "";
  }

  addHandlerDisplayRemoveYoutubeChannelForm(handler) {
    this.#modalContainer.addEventListener("click", (e) => {
      if (e.target.closest(".onlyjoy__removeChannelButton")) {
        this.#clearAddChannelFormContainer();
        handler();
      }
    });
  }

  #clearAddChannelFormContainer() {
    const removeChannelFormContainer = document.querySelector(
      ".onlyjoy__addChannelFormContainer"
    );
    removeChannelFormContainer.innerHTML = "";
  }

  addHandlerRemoveBookmarkYoutubeChannel(handler) {
    this.#modalContainer.addEventListener("submit", async (e) => {
      if (e.target.closest(".onlyjoy__channelRemoveModalForm")) {
        this.#inactiveRemoveFormSubmitButton();
        const data = this.#getFormData(this.#getChannelRemoveFormElement());
        await handler(data);
        this.#closeModal();
        this.#closeOverlay();
      }
    });
  }

  #getFormData(formElement) {
    const dataArr = [...new FormData(formElement)];
    return Object.fromEntries(dataArr);
  }

  #getChannelRemoveFormElement() {
    return document.querySelector(".onlyjoy__channelRemoveModalForm");
  }

  // 밑에 코드 중복이 있음 코드 정리하자..
  #inactiveRemoveFormSubmitButton() {
    const submitButtonElement = document.querySelector(
      ".onlyjoy__modalRemoveChannelButton"
    );
    submitButtonElement.disabled = true;
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
        const data = this.#getFormData(this.#getChannelAddFormElement());
        await handler(JSON.parse(data.channelData));
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

  #getChannelAddFormElement() {
    return document.querySelector(".onlyjoy__ChannelModalForm");
  }

  #generateMarkup() {
    return `
      <div class="onlyjoy__modalExitButton">
        <img src="./public/remove-button.png" alt="an exit-button icon" />
      </div>          
      
      <div class="onlyjoy__manageYoutubeChannelButtonBox">
        <button class="onlyjoy__addChannelButton channelButton">
          채널 등록
        </button>
        <button class="onlyjoy__removeChannelButton channelButton">
          채널 제거
        </button>
      </div>
      <span class="onlyjoy__currentYoutubeChannalHeading">등록된 channel</span>
      <div class="onlyjoy__currentBookmarkYoutubeChannelLists">
        ${this.#data
          .map((channel) => {
            return `
              <div class="onlyjoy__currentYoutubeChannelList">
                <img
                  src="${channel.channelLogo}"
                  alt="a ${channel.channelTitle} youtube channel logo"
                />
                <span>${channel.channelTitle}</span>
              </div>
            `;
          })
          .join(" ")}
        
      </div>

      <div class="onlyjoy__manageYoutubeChannelContainerBox">
          <div class="onlyjoy__addChannelFormContainer"></div>
          <div class="onlyjoy__removeChannelFormContainer"></div>
      </div>      
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

export default new manageYoutubeChannelModalView();
