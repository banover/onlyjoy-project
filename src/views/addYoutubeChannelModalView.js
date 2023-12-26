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

  addHandlerAddYoutubeChannel(handler) {
    this.#modalContainer.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (e.target.closest(".onlyjoy__modalForm")) {
        const submitBtnElement = document.querySelector(
          ".onlyjoy__modalFormButton"
        );
        const inputElement = document.querySelector(
          ".onlyjoy__ChannelHandlerInput"
        );

        const formElement = document.querySelector(".onlyjoy__modalForm");
        const dataArr = [...new FormData(formElement)];
        const data = Object.fromEntries(dataArr);
        console.log(data);
        inputElement.disabled = true;
        submitBtnElement.disabled = true;
        if (await handler(data)) {
          this.#closeModal();
          this.#closeOverlay();
        }
        inputElement.disabled = false;
        submitBtnElement.disabled = false;
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
                <label class="onlyjoy__addItemName" for="channel">
                    <img
                    src="./public/you-tube.png"
                    alt="a youtube channel icon"
                    />
                    <span>채널 Handle</span>
                </label>
                <input
                    class="onlyjoy__ChannelHandlerInput"
                    type="text"
                    name="channel"
                    id="channel"
                    placeholder="채널의 이름을 정확히 입력해 주세요"
                    required
                />
            </div>
            <div class="onlyjoy__modalButtonBox">
                <button class="onlyjoy__modalFormButton">등록하기</button>
            </div>
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
