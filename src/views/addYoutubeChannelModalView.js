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

  addHandlerCheckYoutubeChannel(handler) {
    this.#modalContainer.addEventListener("click", async (e) => {
      // if (e.target.closest(".onlyjoy__modalForm")) {
      if (e.target.closest(".onlyjoy__modalFormButton")) {
        const submitBtnElement = document.querySelector(
          ".onlyjoy__modalFormButton"
        );
        const inputElement = document.querySelector(
          ".onlyjoy__ChannelHandlerInput"
        );

        const inputValue = inputElement.value;
        console.log(inputValue);
        inputElement.disabled = true;
        submitBtnElement.disabled = true;
        await handler(inputValue);
        inputElement.disabled = false;
        submitBtnElement.disabled = false;
      }
    });
  }

  addHandlerAddNewYoutubeChannel(handler) {
    this.#modalContainer.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (e.target.closest(".onlyjoy__modalForm")) {
        const formElement = document.querySelector(".onlyjoy__modalForm");
        const dataArr = [...new FormData(formElement)];
        const data = Object.fromEntries(dataArr);
        const channelData = JSON.parse(data.channelData);
        console.log(channelData);
        await handler(channelData);
        this.#closeOverlay();
        this.#closeModal();
      }
    });
  }

  #generateMarkup() {
    return `
        <div class="onlyjoy__modalExitButton">
            <img src="./public/remove-button.png" alt="an exit-button icon" />
        </div>
        <span class="onlyjoy__modalHeading">Youtube Channel 등록</span>
        <form class="onlyjoy__modalForm">
            <div class="onlyjoy__modalYoutubeChannelInput">
                <label class="onlyjoy__addItemName" for="searchedTitle">
                    <img
                    src="./public/you-tube.png"
                    alt="a youtube channel icon"
                    />
                    <span>채널 Handle</span>
                </label>
                <input
                    class="onlyjoy__ChannelHandlerInput"
                    type="text"
                    name="searchedTitle"
                    id="searchedTitle"
                    placeholder="채널 이름을 입력해 주세요"
                    required
                />
            </div>
            <div class="onlyjoy__modalButtonBox">
                <button class="onlyjoy__modalFormButton">채널 확인하기</button>
            </div>
            <div class="onlyjoy__searchedYoutubeChannels"></div>

        </form>    
    `;
  }

  #clearModalContainer() {
    this.#modalContainer.innerHTML = "";
  }

  renderError(error) {
    this.#clearModalContainer();
    const markUp = `
      <div class="onlyjoy__matchCardError">
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
