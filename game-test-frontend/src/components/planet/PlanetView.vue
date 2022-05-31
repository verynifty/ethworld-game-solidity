<template>
  <div>HELLO ff {{ x }}</div>
</template>

<script>
export default {
  name: "PlanetView",
  props: {
    x: Number,
    y: Number,
  },
  data() {
    return {
      currentID: null,
      R1Balance: null,
      R1Level: null,
      R2Balance: null,
      R2Level: null,
      R3Balance: null,
      R3Level: null,
    };
  },
  methods: {
    loadData: async function () {
      this.currentID = await this.$store.state.gameLib.getPlanetID(
        this.x,
        this.y
      );
      console.log(this.x, this.y, this.currentID);
      try {
        let infos = await this.$store.state.gameLib.getPlanetInfos(
          this.currentID
        );
        this.R1Balance = info.r1.toString();
        this.R1Level = info.l1.toString();
        this.R2Balance = info.r2.toString();
        this.R2Level = info.l2.toString();
        this.R3Balance = info.r3.toString();
        this.R3Level = info.l3.toString();
        console.log(infos);
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {},
  watch: {
    x: function () {
      console.log("HHHHH");
      console.log(this.x);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
