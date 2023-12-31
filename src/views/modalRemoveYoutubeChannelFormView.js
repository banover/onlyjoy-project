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
    return `
        <div class="onlyjoy__channelRemoveHeading">
          <img src="../public/you-tube.png" alt="a youtube icon">
          <span class="onlyjoy__formHeading">CHANNEL 제거</span>
        </div>        
        <form class="onlyjoy__channelRemoveModalForm">
            <div class="onlyjoy__modalRemoveChannelSelection">                             
                <select name="removeChannel" id="removeChannel" required>
                    <option disabled selected>제거할 채널을 선택해 주세요</option>
                    ${this.#data
                      .map((channel) => {
                        return `
                            <option value="${channel.channelTitle}">${channel.channelTitle}</option>
                          `;
                      })
                      .join(" ")}                    
                </select>
            </div>
            <div class="onlyjoy__modalButtonBox">
                <button class="onlyjoy__modalRemoveChannelButton">
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
