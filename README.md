# Trail Blazers Widget

This widget allows Blazers fans to see information on the next three Trail Blazer games.

[Link to Project Page](https://trailblazers.netlify.app/)

<p align="center">
  <img src="/styles/img/futureGame_Away.png" width="50%" />
</p>

## Overview

- All site data is dynamic and will update automatically to reflect the next 3 games.
- Date, time, arena, and location of closest game are displayed at the top of the App and the date will change to "TODAY" on game day.
- Broadcast information updates with Trail Blazers tv/radio stations.
- The later two upcoming games are also links to the official [Trail Blazers NBA schedule page](https://www.nba.com/blazers/schedule).

### Widget State Examples

| Gameday Away                                        | Future Home Game                                           | Future Away Game                                           |
| --------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- |
| <img src="/styles/img/game_Day.png" width="100%" /> | <img src="/styles/img/futureGame_Home.png" width="100%" /> | <img src="/styles/img/futureGame_Away.png" width="100%" /> |

| Desktop Context                                            |
| ---------------------------------------------------------- |
| <img src="/styles/img/desktop_context.png" width="100%" /> |

## Run Project

To get the project running locally, simply clone this repo, cd into the root folder and type the below command into the terminal:

```sh
npx serve
```

## Implementation

To implement, add the below code just above 'div class="panel-pane pane-custom pane-2"'
on the right rail of the [blazers/forward-center](https://www.nba.com/blazers/forward-center) page.
Makes sure to set the iframe height to 485.

```
<div class="panel-pane pane-custom pane-1">
  <div class="pane-content">
    <div class="center-block well">
      <iframe
        id="nextGame_iframe"
        src="https://trailblazers.netlify.app/"
        width="100%"
        height="485"
        frameborder="0"
        scrolling="no"
        title="Rip City NEXT_GAME"
      ></iframe>
    </div>
  </div>
</div>
```

### Making It Production Ready

Moving this into production, I would incorporate [Moment.js](https://momentjs.com/) or [date.fns](https://date-fns.org/) to handle
time-zones, as time-zone differences are notorious for complicating time conversion as well as accounting for daylight-savings time.

I would make the amount of upcoming games be configurable to allow the user to set the number of games being displayed.
