<template>
  <div>
    Planet {{ x }}/{{ y }}
    <div class="grid grid-cols-6">
      <PlanetRessource
        :ressource="0"
        :planet="currentID"
        :balance="R1Balance"
        :productionPerSec="R1Production"
        :level="R1Level"
        name="Food"
      />
      <PlanetRessource
        :ressource="1"
        :planet="currentID"
        :balance="R2Balance"
        :productionPerSec="R2Production"
        :level="R2Level"
        name="Metal"
      />
      <PlanetRessource
        :ressource="2"
        :planet="currentID"
        :balance="R3Balance"
        :productionPerSec="R3Production"
        :level="R3Level"
        name="Gold"
      />
    </div>
  </div>
</template>

<script>
import PlanetRessource from "@/components/planet/PlanetRessource.vue";

export default {
  name: "PlanetView",
  props: {
    x: Number,
    y: Number,
  },
  components: {
    PlanetRessource,
  },
  data() {
    return {
      currentID: null,
      R1Balance: null,
      R1Level: null,
      R1Production: null,
      R2Balance: null,
      R2Level: null,
      R2Production: null,
      R3Balance: null,
      R3Level: null,
      R3Production: null,

      timer: "",
    };
  },
  methods: {
    cancelAutoUpdate() {
      clearInterval(this.timer);
    },
    loadData: async function () {
      this.currentID = await this.$store.state.gameLib.getPlanetID(
        this.x,
        this.y
      );
      console.log("GET INFOS", this.x, this.y, this.currentID);
      try {
        let infos = await this.$store.state.gameLib.getPlanetInfos(
          this.currentID
        );

        this.R1Balance = infos.r1.toString();
        this.R1Level = infos.l1.toNumber();
        this.R1Production = infos.p1.toString();

        this.R2Balance = infos.r2.toString();
        this.R2Level = infos.l2.toNumber();
        this.R2Production = infos.p2.toString();

        this.R3Balance = infos.r3.toString();
        this.R3Level = infos.l3.toNumber();
        this.R3Production = infos.p3.toString();
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {},
  created() {
    this.timer = setInterval(this.loadData, 2000);
  },
  beforeDestroy() {
    this.cancelAutoUpdate();
  },
  watch: {
    x: async function () {
      console.log("HHHHH");
      await this.loadData();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
