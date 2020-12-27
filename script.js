async function getJSON() {
  const res = await fetch(
    `https://data.nba.com/data/v2015/json/mobile_teams/nba/2020/teams/trail_blazers_schedule_02.json`
  );

  const data = await res.json();

  // destructors gscd out of initial JSON response object
  let { gscd } = data;

  // gets current date and reformats it
  let now = new Date();
  let today =
    `${now.getFullYear()}` + `${now.getMonth() + 1}` + `${now.getDate()}`;

  // creates an array with all past games removed
  let futureGames = gscd.g.filter(
    (i) => i.gdte.replace(/[^a-zA-Z0-9 ]/g, '') >= today
  );

  // checks to see if it is game day
  let GAMEDAY = futureGames[0].g === today ? true : false;

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
  // and saves the broadcast stations

  function getBroadcast(num) {
    let broadcastRadio = [];
    let tv = [];

    if (futureGames[num].ac === 'Portland') {
      futureGames[num].bd.b.forEach((element) => {
        if (element.scope === 'home' || element.scope === 'natl') {
          if (element.type === 'tv') {
            // isolates out all TV broadcast stations for blazers when they are the HOME team
            tv.push(element);
          } else {
            // isolates out all Radio broadcast stations for blazers when they are the HOME team
            broadcastRadio.push(element);
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
            broadcastRadio.push(element);
          }
        }
      });
    }
    return {
      broadcastRadio,
      tv,
    };
  }

  let gameDayBroadcast = getBroadcast(0);
  let nextGameBroadcast1 = getBroadcast(1);
  let nextGameBroadcast2 = getBroadcast(2);

  let gameDetails = document.getElementById('gameDetails');
  gameDetails.innerHTML = `
    <p class="date">
     ${
       GAMEDAY
         ? `TODAY @ ${gameDay.toLocaleTimeString([], {
             timeStyle: 'short',
           })}`
         : gameDayDate
     }
    </p>
    <div class="gameMedia">
      <p class="gameMedia_tv"> 
        <img src="./styles/tv.svg" style="width: 12px" />
        ${gameDayBroadcast.tv[0].disp}
        <!-- Use this code instead to show all tv stations -->
        <!-- ${gameDayBroadcast.tv.map((e) => ` ${e.disp}`)} -->
      </p>
      <p>
        <img src="./styles/radio.svg" style="width: 12px" />
        ${gameDayBroadcast.broadcastRadio.map((e) => ` ${e.disp}`)}
      </p>
    </div>
  `;

  let awayTeam = [];
  futureGames.forEach((e) => awayTeam.push(e.v.ta.toLowerCase()));

  let homeTeam = [];
  futureGames.forEach((e) => homeTeam.push(e.h.ta.toLowerCase()));

  let matchup = document.getElementById('matchup');
  matchup.innerHTML = `
    <img src="https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_80x64/${awayTeam[0]}.gif" alt="" style="width: 80px;"/>
    <p> @ </p>
    <img src="https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_80x64/${homeTeam[0]}.gif" alt="" style="width: 80px;"/>
  `;

  // sets table data
  let table = document.getElementById('upcomingGames');
  table.innerHTML = `
  <tr>
    <td class="table_matchup matchup-header">
    <div class="table_matchup_div">
      <img
        src="https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_80x64/${
          awayTeam[1]
        }.gif"
        alt=""
        style="width: 26px"
      />${awayTeam[1].toUpperCase()} @
      <img
        src="https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_80x64/${
          homeTeam[1]
        }.gif"
        alt=""
        style="width: 26px"
      />${homeTeam[1].toUpperCase()} 
    </div>
    </td>
    <td class="table-time-slot"> ${nextGame_1.toLocaleTimeString([], {
      timeStyle: 'short',
    })}</td>
    <td>${`${nextGame_1.getMonth() + 1}/${nextGame_1.getDate()}`}</td>
    <td>${nextGameBroadcast1.tv[0].disp}</td>
  </tr>
  <tr>
    <td class="table_matchup matchup-header">
    <div class="table_matchup_div">
      <img
        src="https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_80x64/${
          awayTeam[2]
        }.gif"
        alt=""
        style="width: 26px"
      />${awayTeam[2].toUpperCase()} @
      <img
        src="https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_80x64/${
          homeTeam[2]
        }.gif"
        alt=""
        style="width: 26px"
      />${homeTeam[2].toUpperCase()}
    </div>
    </td>
    <td class="table-time-slot"> ${nextGame_2.toLocaleTimeString([], {
      timeStyle: 'short',
    })}</td>
    <td>${`${nextGame_2.getMonth() + 1}/${nextGame_2.getDate()}`}</td>
    <td>${nextGameBroadcast2.tv[0].disp}</td>
  </tr>
  `;
}

getJSON();
