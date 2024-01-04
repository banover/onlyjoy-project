class modalSearchedYoutubeChannelView {
  #searchedYoutubeChannelDataContainer;
  #data;

  render(data) {
    this.#setModalSearchedYoutubeChannelDataContainer();
    this.#data = data;
    console.log(this.#data);
    this.#clearSearchedYoutubeChannelDataContainer();
    this.#searchedYoutubeChannelDataContainer.insertAdjacentHTML(
      "beforeend",
      this.#generateMarkup()
    );
  }

  #setModalSearchedYoutubeChannelDataContainer() {
    this.#searchedYoutubeChannelDataContainer = document.querySelector(
      ".onlyjoy__searchedYoutubeChannels"
    );
  }

  #generateMarkup() {
    return `
        <span class="onlyjoy__searchedYoutubeChannelsHeading">channel 검색 결과</span>
        <div class="onlyjoy__searchedYoutubeChannelsRadioButtons">        
            ${this.#data
              .map((channelData) => {
                return `                
                    <div class="onlyjoy__searchedYoutubeChannelsRadioButton">
                        <input type="radio" 
                          value='${JSON.stringify(channelData.snippet)}'
                          id="${channelData.snippet.channelId}"
                          name="channelData"
                        />                        
                        <label for="${
                          channelData.snippet.channelId
                        }" class="onlyjoy__searchedYoutubeChannelsList">
                            <div class="onlyjoy__searchedYoutubeChannelButtonLabel">
                                <img
                                src="${channelData.snippet.thumbnails.high.url}"
                                alt="${channelData.snippet.channelTitle}"
                                width="40"
                                height="40"
                                />
                                <span>${channelData.snippet.channelTitle}</span>
                            </div>
                        </label>
                    </div>
                `;
              })
              .join(" ")}          
        </div>
        <div class="onlyjoy__modalButtonBox">
            <button class="onlyjoy__modalUploadChannelButton">채널 등록</button>
        </div>      
    `;
  }

  #clearSearchedYoutubeChannelDataContainer() {
    this.#searchedYoutubeChannelDataContainer.innerHTML = "";
  }

  renderSpinner(teamsData) {
    this.#setModalSearchedYoutubeChannelDataContainer();
    this.#clearSearchedYoutubeChannelDataContainer();
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

    this.#searchedYoutubeChannelDataContainer.insertAdjacentHTML(
      "beforeend",
      markUp
    );
  }

  renderError(error) {
    this.#setModalSearchedYoutubeChannelDataContainer();
    this.#clearSearchedYoutubeChannelDataContainer();
    const markUp = `
        <div class="onlyjoy__matchCardError small">
          <img src="./public/warning.png" alt="a waring icon" />
          <div class="onlyjoy__errorMessage">
              <p>${error.message}</p>
              <p>이용에 불편을 드려 죄송합니다.</p>
          </div>
        </div>
      `;

    this.#searchedYoutubeChannelDataContainer.insertAdjacentHTML(
      "beforeend",
      markUp
    );
  }
}

export default new modalSearchedYoutubeChannelView();
