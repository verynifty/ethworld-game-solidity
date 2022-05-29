<template>
  <div class="map">
    <div id="map"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import SimpleGraticule from "leaflet-simple-graticule";

export default {
  name: "MapView",
  components: {},
  data() {
    return {
      map: null,
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


    let sol = L.latLng([0, 0]);
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
    if (this.$store.state.gameLib != null) {
      let ctx = this;
      this.$store.state.gameLib.searchArea(
        10,
        10,
        40,
        20,
        function (x, y, size) {
          console.log(x, y, size);
          if (size == -1) {
            
            L.rectangle(
              [
                [y * 10, x * 10],
                [y * 10 + 10, x * 10 + 10],
              ],
              { color: "#ff7800", weight: 1 }
            ).addTo(ctx.map);
          } else {
           var imageUrl =
              "/planets/" + ((size % 9) + 1) + ".png",
              imageBounds = [
                [y * 10, x * 10],
                [y * 10 + 10, x * 10 + 10],
              ];
            L.imageOverlay(imageUrl, imageBounds).addTo(map);
          }
        }
      );
    }
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
