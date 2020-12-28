# INFO

Demo found at https://trailblazers.netlify.app/
Run locally with "npx serve"

## Functionality

- All site data is dynamic and updates automatically to reflect the next 3 games.
- The closest upcoming games date, time, and arena are displayed at the top of the App and will change to "TODAY" on game day.
- Broadcast information updates with Trail Blazers tv/radio stations
- The next two games are displayed at the bottom half of the app with Trail Blazers tv stations.
- Both upcoming games are links to the full blazers schedule

## To Implementation

To implement, add this code just above the <div class="panel-pane pane-custom pane-2"> on the right rail on https://www.nba.com/blazers/forward-center

```
<div class="panel-pane pane-custom pane-1">
  <div class="pane-content">
    <div class="center-block well">
      <iframe
        id="nextGame_iframe"
        src="https://trailblazers.netlify.app/"
        width="100%"
        height="455"
        frameborder="0"
        scrolling="no"
        title="Rip City nextGame"
      ></iframe>
    </div>
  </div>
</div>
```
