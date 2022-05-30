<template>
  <div class="map">
    <div id="map"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import SimpleGraticule from "leaflet-simple-graticule";
import pulse from "@ansur/leaflet-pulse-icon/dist/L.Icon.Pulse.js";
var store = require("store");

export default {
  name: "MapView",
  components: {},
  data() {
    return {
      map: null,
      miningx: 10,
      miningy: 10,
    };
  },
  mounted: async function () {
    L.LatLng.prototype.distanceTo = function (currentPostion) {
      var dx = currentPostion.lng - this.lng;
      var dy = currentPostion.lat - this.lat;
      return Math.sqrt(dx * dx + dy * dy);
    };

    var map = L.map("map", {
      crs: L.CRS.Simple,
      minZoom: -80,
    });

    var bounds = [
      [10, 10],
      [50000000000000000, 5000000000000000],
    ];

    let sol = L.latLng([100, 100]);
    L.marker(sol).addTo(map);

    map.setView([70, 120], 1);

    new SimpleGraticule({
      interval: 500,
      showOriginLabel: true,
      redraw: "moveend",
      zoomIntervals: [
        { start: 0, end: 3, interval: 50 },
        { start: 4, end: 5, interval: 5 },
        { start: 6, end: 20, interval: 1 },
      ],
    }).addTo(map);
    this.map = map;
    console.log(this.$store.state);
    // Load already mined data
    let ctx = this;
    store.each(function (value, key) {
      console.log(key, "==", value);
      if (value.type != null) {
        ctx.addPlanet(value.x, value.y, value.size);
      }
    });
    this.mine();
  },
  methods: {
    mine: async function () {
      let x = this.miningx;
      let radius = 0;
      let startx = 0;
      let starty = 0;
      while (true) {
        let x = this.miningx;
        let y = this.miningy;
        startx = x - radius;
        while (startx <= x + radius) {
          starty = y - radius;
          while (starty <= y + radius) {
            // console.log("POS", startx, starty, x, y, x + radius, y + radius);
            if (store.get(startx + "_" + starty) == null) {
				 var pulsingIcon = L.icon.pulse({
                iconSize: [20, 20],
                color: "blue",
                fillColor: "blue",
              });
              var pulsemarker = L.marker([starty * 10 + 5, startx * 10 + 5], { icon: pulsingIcon }).addTo(this.map);
 
              let planet = {};
              planet.size = await this.$store.state.gameLib.searchForPlanet(
                startx,
                starty
              );

             // console.log(planet, x, y);
              planet.x = startx;
              planet.y = starty;
                          if (planet.size == -1) {
                store.set(planet.x + "_" + planet.y, {
                  type: 0,
                  x: planet.x,
                  y: planet.y,
                  size: planet.size,
                });
              } else {
                store.set(planet.x + "_" + planet.y, {
                  type: 1,
                  x: planet.x,
                  y: planet.y,
                  size: planet.size,
                });
              }
              this.addPlanet(planet.x, planet.y, planet.size);
			  this.map.removeLayer(pulsemarker)

            }
            starty++;
          }
          startx++;
        }

        radius++;
      }
    },
    addPlanet: function (x, y, size) {
      if (size == -1) {
        L.rectangle(
          [
            [y * 10, x * 10],
            [y * 10 + 10, x * 10 + 10],
          ],
          { color: "#ff7800", weight: 1 }
        ).addTo(this.map);
      } else {
        var imageUrl = "/planets/" + ((size % 9) + 1) + ".png",
          imageBounds = [
            [y * 10, x * 10],
            [y * 10 + 10, x * 10 + 10],
          ];
        L.imageOverlay(imageUrl, imageBounds).addTo(this.map);
      }
    },
  },
};
</script>


<style scoped>
#map {
  height: 800px;
  width: 100%;
  max-width: 100%;
  max-height: 100%;
  background-color: black;
}
</style>
