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
  mounted: function () {
    var map = L.map("map", {
      crs: L.CRS.Simple,
      minZoom: -80,
    });

    var bounds = [
      [10, 10],
      [50000000000000000, 5000000000000000],
    ];

    var sol = L.latLng([145, 175]);
    var marker = L.marker(sol).addTo(map);

    sol = L.latLng([0, 0]);
    L.marker(sol).addTo(map);

    sol = L.latLng([-200, -200]);
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
  },
};
</script>


<style scoped>
#map {
  height: 800px;
  width: 100%;
  max-width: 100%;
  max-height: 100%;
  background-color: red;
}
</style>
