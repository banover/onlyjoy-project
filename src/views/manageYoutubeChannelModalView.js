class manageBookmarkYoutubeChannelModalView {
  #modalContainer = document.querySelector(
    ".onlyjoy__manageBookmarkYoutubeChannelModal"
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
        this.#clearManageYoutubeChannelContainerBox();
        handler();
      }
    });
  }

  #clearManageYoutubeChannelContainerBox() {
    this.#getAddChannelFormContainer().innerHTML = "";
    this.#getRemoveChannelFormContainer().innerHTML = "";
    this.#getFormErrorContainer().innerHTML = "";
  }

  #getAddChannelFormContainer() {
    return document.querySelector(".onlyjoy__addChannelFormContainer");
  }

  #getRemoveChannelFormContainer() {
    return document.querySelector(".onlyjoy__removeChannelFormContainer");
  }

  #getFormErrorContainer() {
    return document.querySelector(".onlyjoy__formErrorContainer");
  }

  addHandlerSearchedYoutubeChannel(handler) {
    this.#modalContainer.addEventListener("click", async (e) => {
      if (e.target.closest(".onlyjoy__searchButton")) {
        this.#toggleActiveElement(this.#getSearchInputElement());
        this.#toggleActiveElement(this.#getSearchButtonElement());
        await handler(this.#getSearchedYoutubeChannelTitle());
        this.#toggleActiveElement(this.#getSearchInputElement());
        this.#toggleActiveElement(this.#getSearchButtonElement());
      }
    });
  }

  #toggleActiveElement(element) {
    element.disabled = element.disabled ? false : true;
  }

  #getSearchInputElement() {
    return document.querySelector(".onlyjoy__ChannelTitleInput");
  }

  #getSearchButtonElement() {
    return document.querySelector(".onlyjoy__searchButton");
  }

  #getSearchedYoutubeChannelTitle() {
    return this.#getSearchInputElement().value;
  }

  addHandlerAddNewBookmarkYoutubeChannel(handler) {
    this.#modalContainer.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (e.target.closest(".onlyjoy__addChannelForm")) {
        const data = this.#getFormData(this.#getChannelAddFormElement());
        this.#toggleActiveElement(this.#getSearchInputElement());
        this.#toggleActiveElement(this.#getSearchButtonElement());
        this.#toggleActiveElement(this.#getUploadChannelButtonElement());
        await handler(JSON.parse(data.channelData));
        this.#closeModal();
        this.#closeOverlay();
      }
    });
  }

  #getChannelAddFormElement() {
    return document.querySelector(".onlyjoy__addChannelForm");
  }

  #getUploadChannelButtonElement() {
    return document.querySelector(".onlyjoy__modalUploadChannelButton");
  }

  addHandlerDisplayRemoveYoutubeChannelForm(handler) {
    this.#modalContainer.addEventListener("click", (e) => {
      if (e.target.closest(".onlyjoy__removeChannelButton")) {
        this.#clearManageYoutubeChannelContainerBox();
        handler();
      }
    });
  }

  addHandlerRemoveBookmarkYoutubeChannel(handler) {
    this.#modalContainer.addEventListener("submit", async (e) => {
      if (e.target.closest(".onlyjoy__removeChannelForm")) {
        this.#toggleActiveElement(this.#getRemoveChannelButtonElement());
        const formData = this.#getFormData(this.#getRemoveChannelFormElement());
        await handler(formData);
        this.#closeModal();
        this.#closeOverlay();
      }
    });
  }

  #getRemoveChannelButtonElement() {
    return document.querySelector(".onlyjoy__modalRemoveChannelButton");
  }

  #getFormData(formElement) {
    const dataArr = [...new FormData(formElement)];
    return Object.fromEntries(dataArr);
  }

  #getRemoveChannelFormElement() {
    return document.querySelector(".onlyjoy__removeChannelForm");
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
          <div class="onlyjoy__formErrorContainer"></div>                 
      </div>      
    `;
  }

  #clearModalContainer() {
    this.#modalContainer.innerHTML = "";
  }

  renderError(error) {
    this.#clearManageYoutubeChannelContainerBox();
    const markUp = `
      <div class="onlyjoy__matchCardError small">
        <img src="./public/warning.png" alt="a waring icon" />
        <div class="onlyjoy__errorMessage">
            <p>${error.message}</p>
            <p>이용에 불편을 드려 죄송합니다.</p>
        </div>
      </div>
    `;

    this.#getFormErrorContainer().insertAdjacentHTML("beforeend", markUp);
  }
}

export default new manageBookmarkYoutubeChannelModalView();
