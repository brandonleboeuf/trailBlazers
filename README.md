# Trail Blazers Widget

This widget was built to allow Blazers fans to see information on upcoming Blazer games.

[Link to Project Page](https://trailblazers.netlify.app/)

<img float="center" src="/styles/img/futureGame_Away.png" width="50%" />

## Overview

- All site data is dynamic and updates automatically to reflect the next 3 games.
- Date, time, arena, and location of soonest game is displayed at the top of the App and will change to "TODAY" on game day.
- Broadcast information updates with Trail Blazers tv/radio stations.
- The later two upcoming games are also links to the [Schedule Page](https://www.nba.com/blazers/schedule).

### State Examples

| Gameday Away                                       | Future Away Game                                           | Future Hom Game                                            |
| -------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- |
| <img src="/styles/img/GameDay.png" width="100%" /> | <img src="/styles/img/futureGame_Home.png" width="100%" /> | <img src="/styles/img/futureGame_Away.png" width="100%" /> |

| Desktop Context                                            |
| ---------------------------------------------------------- |
| <img src="/styles/img/desktop_context.png" width="100%" /> |

## Run Project

To get project running locally, simply clone this project, cd into the root and type the below command into the terminal:

```sh
npx serve
```

## Implementation

To implement, add the below code just above 'div class="panel-pane pane-custom pane-2"'
on the right rail of the [blazers/forward-center](https://www.nba.com/blazers/forward-center) page.

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

Moving this intro production, I would incorporate [Moment.js](https://momentjs.com/) or [date.fns](https://date-fns.org/) to handle
time-zones, as time-zone differences are notorious for complicating time conversion as well as accounting for daylight-savings time.

I would like to make this configurable in order to increase or decrease the amount of future games that are displayed.
