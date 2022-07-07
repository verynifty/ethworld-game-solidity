<template>
  <div>Planets</div>
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
  methods: {},
  computed: {},
  created: async function () {
    this.planets = await this.$store.state.gameLib.getPlayerPlanets(
      this.address
    );
    console.log(this.planets);
  },
  beforeDestroy() {},
  watch: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
