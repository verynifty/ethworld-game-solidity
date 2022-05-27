<template>
  <div class="map">
    <div id="map"></div>
  </div>
</template>

<script>
// @ is an alias to /src

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

    L.GridLayer.GridDebug = L.GridLayer.extend({
      createTile: function (coords) {
        const tile = document.createElement("div");
        tile.style.outline = "1px solid green";
        tile.style.fontWeight = "bold";
        tile.style.fontSize = "14pt";
		console.log(coords)
        tile.innerHTML = [coords.x, coords.y].join("/");
        return tile;
      },
    });

    L.gridLayer.gridDebug = function (opts) {
      return new L.GridLayer.GridDebug(opts);
    };

    map.addLayer(L.gridLayer.gridDebug());
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
