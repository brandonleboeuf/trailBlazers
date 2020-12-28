# Trail Blazers Widget

<img alt="Logo" align="right" src="https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_80x64/por.gif" width="80px" />

This widget was built to address.

- [Link to Build](https://trailblazers.netlify.app/).

## Quick Overview

This widget displays the next upcoming three Trail Blazers games.

- All site data is dynamic and updates automatically to reflect the next 3 games.
- The closest upcoming games date, time, and arena are displayed at the top of the App and will change to "TODAY" on game day.
- Broadcast information updates with Trail Blazers tv/radio stations
- The next two games are displayed at the bottom half of the app with Trail Blazers tv stations.
- Both upcoming games are links to the full blazers schedule

### Image Examples

<p float="left">
  Gameday Away
  <img src="/styles/img/gameDay_Away.png" width="30%" />
  Future Home Game
  <img src="/styles/img/futureGame_Home.png" width="30%" /> 
  Future Away Game
  <img src="/styles/img/futureGame_Away.png" width="30%" />
  Full Page context
  <img src="/styles/img/desktop_context.png" width="100%" />
</p>

## Run Project

No installations needed to get project running locally.

```sh
npx serve
```

## Implementation

To implement, add this code just above the <div class="panel-pane pane-custom pane-2"> on the right rail on https://www.nba.com/blazers/forward-center

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

### MISC

Moving this intro production, I would incorporate [Moment.js](https://momentjs.com/) or [date.fns](https://date-fns.org/) to handle
time-zones, as they can be notorious for complicating time conversion and daylight-savings time.

I would like to make this configurable in order to increase or decrease the amount of future games that are displayed
