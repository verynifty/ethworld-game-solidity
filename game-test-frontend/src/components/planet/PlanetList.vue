<template>
  <div>
    Planets:
    <ul>
      <li v-for="planet in planets" v-bind:key="planet.id">
        <p @click="clickPlanet(planet)">
          {{ planet.id }} _ {{ planet.x }} / {{ planet.y }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "PlanetList",
  props: {
    address: String,
  },
  components: {},
  data() {
    return {
      planets: [],
    };
  },
  methods: {
    clickPlanet: function (planet) {
      console.log("planetSelected", planet.x, planet.y);
      this.$emit("planetSelected", planet.x, planet.y);
    },
  },
  computed: {},
  created: async function () {
    let ps = await this.$store.state.gameLib.getPlayerPlanets(this.address);
    for (const p of ps) {
      let pos = await this.$store.state.gameLib.getPlanetPosition(p);
      this.planets.push({
        id: p,
        x: pos.x,
        y: pos.y,
      });
    }
    console.log(this.planets);
  },
  beforeDestroy() {},
  watch: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
