class matchCardFilterBarView {
  #bookmarkTeams;
  #searchBarContainer = document.querySelector(".onlyjoy__matchCardFilterBar");

  render(teams) {
    this.#bookmarkTeams = teams;
    this.#clearMatchCardFilterBar();
    this.#searchBarContainer.insertAdjacentHTML(
      "beforeend",
      this.#generateMarkup()
    );
  }

  #generateMarkup() {
    return `
    <div class="onlyjoy__matchCardFilterBar">
     <img src="./public/filter.png" alt="a filter icon" />
      <form class="onlyjoy__filterForm">
        <label for="filteringMethod">정렬 방식</label>
        <select id="filteringMethod" name="filteringMethod">
          <option value="date">일정순서</option>
          <option value="team">팀별순서</option>
        </select>
        <label for="filteringMethod">팀 선택</label>
        <select id="filteringTeam" name="filteringTeam">
          <option value="all">모든 팀</option>
          <option value="tottenham">tottenham</option>
          <option value="psg">psg</option>
          <option value="bayern">bayern</option>
        </select>
        <button class="onlyjoy__searchBtn">검색</button>
      </form>
    </div>
    `;
  }

  #clearMatchCardFilterBar() {
    this.#searchBarContainer.innerHTML = "";
  }
}

export default new matchCardFilterBarView();
