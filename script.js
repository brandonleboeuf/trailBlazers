async function getJSON() {
  const res = await fetch(
    `https://data.nba.com/data/v2015/json/mobile_teams/nba/2020/teams/trail_blazers_schedule_02.json`
  );

  const data = await res.json();

  // destructors gscd out of initial JSON response object
  let { gscd } = data;
  console.log(gscd);

  // gets current date and reformats it
  let now = new Date();
  let today =
    `${now.getFullYear()}` + `${now.getMonth() + 1}` + `${now.getDate()}`;

  // creates an new array with all past games removed
  let futureGames = gscd.g.filter(
    (i) => i.gdte.replace(/[^a-zA-Z0-9 ]/g, '') >= today
  );

  // compares first game in the futureGames array with todays date
  // to determine if it is GAMEDAY
  let GAMEDAY =
    futureGames[0].gdte.replace(/[^a-zA-Z0-9 ]/g, '') === today ? true : false;

  // changes display formatting of date
  let gameDay = new Date(futureGames[0].htm);
  let nextGame_1 = new Date(futureGames[1].htm);
  let nextGame_2 = new Date(futureGames[2].htm);

  const options = {
    weekday: 'long',
  };

  // formats game day date, time, and arena
  let gameDayDate = `${gameDay.toLocaleDateString(
    undefined,
    options
  )} ${dateOrdinal(gameDay.getDate())} / ${gameDay.toLocaleTimeString([], {
    timeStyle: 'short',
  })} @ ${futureGames[0].an}`;

  // adds ordinal (st, nd, rd, th) to day
  function dateOrdinal(d) {
    return (
      d +
      (31 == d || 21 == d || 1 == d
        ? 'st'
        : 22 == d || 2 == d
        ? 'nd'
        : 23 == d || 3 == d
        ? 'rd'
        : 'th')
    );
  }

  // evaluates if it is a Blazers home or away game
  // and saves the broadcast stations in an array

  function getBroadcast(num) {
    let radio = [];
    let tv = [];

    if (futureGames[num].ac === 'Portland') {
      futureGames[num].bd.b.forEach((element) => {
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
      futureGames[num].bd.b.forEach((element) => {
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
  }

  // sets each days broadcast stations in a new array
  // to access, gameDayBroadcast.tv or gameDayBroadcast.radio
  let gameDayBroadcast = getBroadcast(0);
  let nextGameBroadcast1 = getBroadcast(1);
  let nextGameBroadcast2 = getBroadcast(2);

  // renders date/time of next game
  // if it is game day, it will render "TODAY" instead of future date
  let gameDetails = document.getElementById('gameDetails');
  gameDetails.innerHTML = `
    <p class="date">
     ${
       GAMEDAY
         ? `<strong>TODAY</strong> / ${gameDay.toLocaleTimeString([], {
             hour: '2-digit',
             minute: '2-digit',
           })} @ ${futureGames[0].an}`
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
  let homeTeam = [];
  futureGames.forEach((e) => homeTeam.push(e.h.ta.toLowerCase()));
  let awayTeam = [];
  futureGames.forEach((e) => awayTeam.push(e.v.ta.toLowerCase()));

  // renders matchup
  let matchup = document.getElementById('matchup');
  matchup.innerHTML = `
  <img src="https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_80x64/${awayTeam[0]}.gif" alt="" style="width: 80px;"/>
  <p> @ </p>
  <img src="https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_80x64/${homeTeam[0]}.gif" alt="" style="width: 80px;"/>
  `;

  // renders table
  let table = document.getElementById('upcomingGames');
  table.innerHTML = `
  <tr onpointerdown="window.location='https://www.nba.com/blazers/schedule'" onkeydown="window.location='https://www.nba.com/blazers/schedule'" tabindex="0" aria-role="link" class="clickable">
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
    <td class="table-time-slot"> ${nextGame_1.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })}</td>
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
    <td class="table-time-slot"> ${nextGame_2.toTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })}</td>
    <td>${`${nextGame_2.getMonth() + 1}/${nextGame_2.getDate()}`}</td>
    <td class="padding_right">${nextGameBroadcast2.tv[0].disp}</td>
  </tr>
  `;
}

getJSON();
