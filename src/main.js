import fetchTeamMatches from "./services/fetchTeamMatches";
import fetchTeamId from "./services/fetchTeamId";

const matchCardContainer = document.querySelector(".onlyjoy__matchContainer");
// const league = { EPL: 2021, FL1: 2015, BL1: 2002 };
const bookmarkTeam = [
  { leagueId: 2021, name: "Tottenham" },
  { leagueId: 2015, name: "PSG" },
  { leagueId: 2002, name: "Bayern" },
];

bookmarkTeam.forEach(async (team) => {
  const teamId = await fetchTeamId(team.leagueId, team.name);
  const weekendMatchData = await fetchTeamMatches(teamId);
  //   renderMatchCard(weekendMatchData.matches);
  weekendMatchData.matches.forEach((match) => {
    renderMatchCard(match);
  });
  console.log(weekendMatchData);
});

function renderMatchCard(matchData) {
  let result = `
    <div class="onlyjoy__match">
        <div class="onlyjoy__matchRow">
            <span>${matchData.competition.name}</span>
            <div class="row-line"></div>
        </div>
        <div class="onlyjoy__matchDetails">
            <p class="onlyjoy__matchTeams">${matchData.homeTeam.name} VS ${matchData.awayTeam.name}</p>
            <p class="onlyjoy__matchTimes">경기시간 - ${matchData.utcDate}19:45</p>
            <p class="onlyjoy__matchBroadcasting">
                중계 -
                <a href="https://www.spotvnow.co.kr/" target="_blank"
                    >spotvNow</a
                >
            </p>
            <p class="onlyjoy__matchYouTubeLiveBroadcasting">
                입중계 LIVE - <a href="#" target="_blank">문도그</a>
            </p>
        </div>
        <div class="onlyjoy__matchRow">
            <div class="row-line"></div>
            <span>손흥민</span>
        </div>
    </div>`;
  matchCardContainer.insertAdjacentHTML("beforeend", result);
}
