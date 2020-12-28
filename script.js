const API_URL = `https://data.nba.com/data/v2015/json/mobile_teams/nba/2020/teams/trail_blazers_schedule_02.json`;

// Utils
// ===========================

// regex to remove unneeded characters from JSON date at gscd.g.gdte
const removeDashAndChar = /[^a-zA-Z0-9 ]/g;

const formatTime = (time) =>
  time.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

// adds ordinal (st, nd, rd, th) to day
const dateOrdinal = (date) => {
  return (
    date +
    (31 == date || 21 == date || 1 == date
      ? 'st'
      : 22 == date || 2 == date
      ? 'nd'
      : 23 == date || 3 == date
      ? 'rd'
      : 'th')
  );
};

// Trail Blazers Schedule Widget
// ===========================
async function main() {
  // destructors gscd out of initial JSON response object
  const { gscd } = await fetch(API_URL).then((res) => res.json());

  // gets current date and reformats it
  const now = new Date();
  const today =
    `${now.getFullYear()}` + `${now.getMonth() + 1}` + `${now.getDate()}`;

  // creates an new array with all past games removed
  const futureGames = gscd.g.filter(
    (item) => item.gdte.replace(removeDashAndChar, '') >= today
  );

  // compares first game in the futureGames array with todays date
  // to determine if it is GAMEDAY
  const GAMEDAY = futureGames[0].gdte.replace(removeDashAndChar, '') === today;

  // changes display formatting of date and ensures that PST time
  // is always displayed

  const gameDay =
    // checks to see if the game is being played in Portland
    futureGames[0].ac === 'Portland'
      ? new Date(futureGames[0].htm)
      : new Date(futureGames[0].vtm);

  const nextGame_1 =
    futureGames[1].ac === 'Portland'
      ? new Date(futureGames[1].htm)
      : new Date(futureGames[1].vtm);

  const nextGame_2 =
    futureGames[2].ac === 'Portland'
      ? new Date(futureGames[2].htm)
      : new Date(futureGames[2].vtm);

  // formats game day date, time, and arena
  const gameDayDate = `${gameDay.toLocaleDateString(undefined, {
    weekday: 'long',
  })} ${dateOrdinal(gameDay.getDate())} / ${gameDay.toLocaleTimeString([], {
    timeStyle: 'short',
  })} @ ${futureGames[0].an}`;

  // evaluates if it is a Blazers home or away game
  // and saves the broadcast stations in an array

  const getBroadcast = (index) => {
    let radio = [];
    let tv = [];

    if (futureGames[index].ac === 'Portland') {
      futureGames[index].bd.b.forEach((element) => {
        if (element.scope === 'home' || element.scope === 'natl') {
          if (element.type === 'tv') {
            // isolates out all TV broadcast stations for blazers when they are the HOME team
            tv.push(element);
          } else {
            // isolates out all Radio broadcast stations for blazers when they are the HOME team
            radio.push(element);
          }
        }
      });
    } else {
      futureGames[index].bd.b.forEach((element) => {
        if (element.scope === 'away' || element.scope === 'natl') {
          if (element.type === 'tv') {
            // isolates out all TV broadcast stations for blazers when they are the AWAY team
            tv.push(element);
          } else if (element.type === 'radio') {
            // isolates out all Radio broadcast stations for blazers when they are the AWAY team
            radio.push(element);
          }
        }
      });
    }
    return {
      radio,
      tv,
    };
  };

  // sets each days broadcast stations in a new array
  // to access, gameDayBroadcast.tv or gameDayBroadcast.radio
  const gameDayBroadcast = getBroadcast(0);
  const nextGameBroadcast1 = getBroadcast(1);
  const nextGameBroadcast2 = getBroadcast(2);

  // renders date/time of next game
  // if it is game day, it will render "TODAY" instead of future date
  const gameDetails = document.getElementById('gameDetails');
  gameDetails.innerHTML = `
    <p class="date">
     ${
       GAMEDAY
         ? `<strong>TODAY</strong> / ${formatTime(gameDay)} @ ${
             futureGames[0].an
           }`
         : gameDayDate
     }
    </p>
    <p class="date">${futureGames[0].ac}, ${futureGames[0].as}</p>
    <div class="gameMedia">
      <p class="gameMedia_tv"> 
        <img src="./styles/tv.svg" style="width: 12px" />
        ${gameDayBroadcast.tv.map((e) => ` ${e.disp}`)} 
        <!-- Use this code instead to show ONE tv station -->
        <!-- ${gameDayBroadcast.tv[0].disp}-->
      </p>
      <p>
        <img src="./styles/radio.svg" style="width: 12px" />
        ${gameDayBroadcast.radio.map((e) => ` ${e.disp}`)}
      </p>
    </div>
  `;

  // sets home and away team variables to be used to get team logos
  const homeTeam = [];
  futureGames.forEach((e) => homeTeam.push(e.h.ta.toLowerCase()));
  const awayTeam = [];
  futureGames.forEach((e) => awayTeam.push(e.v.ta.toLowerCase()));

  // renders matchup
  const matchup = document.getElementById('matchup');

  // TODO: use hi-res images
  matchup.innerHTML = `
    <img src="https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_80x64/${awayTeam[0]}.gif" alt="" style="width: 80px;"/>
    <p> @ </p>
    <img src="https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_80x64/${homeTeam[0]}.gif" alt="" style="width: 80px;"/>
  `;

  // renders table
  const table = document.getElementById('upcomingGames');
  table.innerHTML = `
    <tr onpointerdown="window.location='https://www.nba.com/blazers/schedule'"  tabindex="0" aria-role="link" class="clickable">
      <td class="matchup-header">
        <div class="table_matchup_div">
          <img
            src="https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_80x64/${
              awayTeam[1]
            }.gif"
            alt="${futureGames[1].v.tn} team logo"
            style="width: 26px"
          />
          <p>${awayTeam[1].toUpperCase()} @</p>
          <img
            src="https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_80x64/${
              homeTeam[1]
            }.gif"
            alt="${futureGames[1].h.tn} team logo"
            style="width: 26px"
          />
          <p>${homeTeam[1].toUpperCase()}</p>
        </div>
      </td>
      <td class="table-time-slot"> ${formatTime(nextGame_1)}</td>
      <td>${`${nextGame_1.getMonth() + 1}/${nextGame_1.getDate()}`}</td>
      <td class="padding_right">${nextGameBroadcast1.tv[0].disp}</td>
    </tr>
    <tr onpointerdown="window.location='https://www.nba.com/blazers/schedule'" tabindex="0" aria-role="link" class="clickable">
      <td class="matchup-header">
        <div class="table_matchup_div">
          <img
            src="https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_80x64/${
              awayTeam[2]
            }.gif"
            alt="${futureGames[2].v.tn} team logo"
            style="width: 26px"
          />
          <p>${awayTeam[2].toUpperCase()} @</p>
          <img
            src="https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_80x64/${
              homeTeam[2]
            }.gif"
            alt="${futureGames[2].h.tn} team logo"
            style="width: 26px"
          />
          <p>${homeTeam[2].toUpperCase()}</p>
        </div>
      </td>
      <td class="table-time-slot"> ${formatTime(nextGame_2)}</td>
      <td>${`${nextGame_2.getMonth() + 1}/${nextGame_2.getDate()}`}</td>
      <td class="padding_right">${nextGameBroadcast2.tv[0].disp}</td>
    </tr>
  `;
}

main();
