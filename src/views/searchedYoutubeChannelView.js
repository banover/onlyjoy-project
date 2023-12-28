class searchedYoutubeChannelView {
  #searchedYoutubeChannelDataContainer = document.querySelector(
    ".onlyjoy__searchedYoutubeChannels"
  );
  #data;

  render(data) {
    this.#data = data;
    console.log(this.#data);
    this.#clearSearchedYoutubeChannelDataContainer();
    this.#searchedYoutubeChannelDataContainer.insertAdjacentHTML(
      "beforeend",
      this.#generateMarkup()
    );

    // const a = document.querySelectorAll(
    //   ".onlyjoy__searchedYoutubeChannelsRadioButtons input"
    // );
    // console.log(a);
    // a.forEach((input) =>
    //   input.addEventListener("click", () => {
    //     console.log("omg 클릭");
    //     input.checked = true;
    //   })
    // );
  }

  //   addHandlerCheckYoutubeChannel(handler) {
  //     this.#modalContainer.addEventListener("submit", async (e) => {
  //       e.preventDefault();
  //       if (e.target.closest(".onlyjoy__modalForm")) {
  //         const submitBtnElement = document.querySelector(
  //           ".onlyjoy__modalFormButton"
  //         );
  //         const inputElement = document.querySelector(
  //           ".onlyjoy__ChannelHandlerInput"
  //         );

  //         const formElement = document.querySelector(".onlyjoy__modalForm");
  //         const dataArr = [...new FormData(formElement)];
  //         const data = Object.fromEntries(dataArr);
  //         console.log(data);
  //         inputElement.disabled = true;
  //         submitBtnElement.disabled = true;
  //         handler(data.channelHandle);
  //         // if (await handler(data)) {
  //         //   this.#closeModal();
  //         //   this.#closeOverlay();
  //         // }
  //         inputElement.disabled = false;
  //         submitBtnElement.disabled = false;
  //       }
  //     });
  //   }

  #generateMarkup() {
    return `
    <div class="onlyjoy__searchedYoutubeChannelsRadioButtons">
                  <div class="onlyjoy__searchedYoutubeChannelsRadioButton">
                    <input
                      type="radio"
                      value="채널ID"
                      id="channelId"
                      name="channelId"                     
                    />
                    <label
                      for="channelId"
                      class="onlyjoy__searchedYoutubeChannelsList"
                    >
                      <div class="onlyjoy__searchedYoutubeChannelButtonLabel">
                        <img
                          src="https://yt3.ggpht.com/Ph3zUHAtQqkXYwhDFc2SSllFrrdvVZhcg2oATcJf9BWKDUJuBNiWYCGhQ4mqS_YTstC4_Y1aiw=s800-c-k-c0xffffffff-no-rj-mo"
                          alt="a youtube thumbnails"
                          width="40"
                          height="40"
                        />
                        <span>김진짜 Real KIM</span>
                      </div>
                    </label>
                  </div>
                  <div class="onlyjoy__searchedYoutubeChannelsRadioButton">
                    <input
                      type="radio"
                      value="채널ID"
                      id="channelId"
                      name="channelId"
                    />
                    <label
                      for="channelId"
                      class="onlyjoy__searchedYoutubeChannelsList"
                    >
                      <div class="onlyjoy__searchedYoutubeChannelButtonLabel">
                        <img
                          src="https://yt3.ggpht.com/Ph3zUHAtQqkXYwhDFc2SSllFrrdvVZhcg2oATcJf9BWKDUJuBNiWYCGhQ4mqS_YTstC4_Y1aiw=s800-c-k-c0xffffffff-no-rj-mo"
                          alt="a youtube thumbnails"
                          width="40"
                          height="40"
                        />
                        <span>김진짜 Real KIM</span>
                      </div>
                    </label>
                  </div>
                  <div class="onlyjoy__searchedYoutubeChannelsRadioButton">
                    <input
                      type="radio"
                      value="채널ID"
                      id="channelId"
                      name="channelId"
                    />
                    <label
                      for="channelId"
                      class="onlyjoy__searchedYoutubeChannelsList"
                    >
                      <div class="onlyjoy__searchedYoutubeChannelButtonLabel">
                        <img
                          src="https://yt3.ggpht.com/Ph3zUHAtQqkXYwhDFc2SSllFrrdvVZhcg2oATcJf9BWKDUJuBNiWYCGhQ4mqS_YTstC4_Y1aiw=s800-c-k-c0xffffffff-no-rj-mo"
                          alt="a youtube thumbnails"
                          width="40"
                          height="40"
                        />
                        <span>김진짜 Real KIM</span>
                      </div>
                    </label>
                  </div>
                </div>
                <div class="onlyjoy__modalButtonBox">
            <button class="onlyjoy__modalUploadChannelButton">채널 등록</button>
        </div>  
    `;
    return `    
        <div class="onlyjoy__searchedYoutubeChannelsRadioButtons">        
            ${this.#data
              .map((channelData) => {
                return `                
                    <div class="onlyjoy__searchedYoutubeChannelsRadioButton">
                        <input type="radio" value="${channelData.snippet.channelId}" id="${channelData.snippet.channelId}" name="channelId" />
                        <label for="${channelData.snippet.channelId}" class="onlyjoy__searchedYoutubeChannelsList">
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
    // this.#setModalRestSelectionContainer();
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
    this.#clearSearchedYoutubeChannelDataContainer();
    const markUp = `
        <div class="onlyjoy__matchCardError">
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

export default new searchedYoutubeChannelView();
