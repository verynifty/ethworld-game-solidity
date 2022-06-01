<template>
  <div>
    Planet {{ x }}/{{ y }}
    <div class="grid grid-cols-6">
      <PlanetRessource
        :ressource="0"
        :planet="currentID"
        :balance="R0Balance"
        :productionPerSec="R0Production"
        :storage="R0Storage"
        :storageLevel="R0StorageLevel"
        :level="R0Level"
        name="Wood"
      />
      <PlanetRessource
        :ressource="1"
        :planet="currentID"
        :balance="R1Balance"
        :productionPerSec="R1Production"
        :storage="R1Storage"
        :storageLevel="R1StorageLevel"
        :level="R1Level"
        name="Metal"
      />
      <PlanetRessource
        :ressource="2"
        :planet="currentID"
        :balance="R2Balance"
        :productionPerSec="R2Production"
        :storage="R2Storage"
        :storageLevel="R2StorageLevel"
        :level="R2Level"
        name="Crystal"
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
      R0Balance: null,
      R0Level: null,
      R0Production: null,
      R0Storage: null,
      R0StorageLevel: null,
      R1Balance: null,
      R1Level: null,
      R1Production: null,
      R1Storage: null,
      R1StorageLevel: null,
      R2Balance: null,
      R2Level: null,
      R2Production: null,
      R2Storage: null,
      R2StorageLevel: null,

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

        this.R0Level = infos.r0[0].toNumber();
        this.R0Balance = infos.r0[1].toString();
        this.R0Production = infos.r0[2].toString();
        this.R0Storage = infos.r0[3].toString();
        this.R0StorageLevel = infos.r0[4].toNumber();

        this.R1Level = infos.r1[0].toNumber();
        this.R1Balance = infos.r1[1].toString();
        this.R1Production = infos.r1[2].toString();
        this.R1Storage = infos.r1[3].toString();
        this.R1StorageLevel = infos.r1[4].toNumber();

        this.R2Level = infos.r2[0].toNumber();
        this.R2Balance = infos.r2[1].toString();
        this.R2Production = infos.r2[2].toString();
        this.R2Storage = infos.r2[3].toString();
        this.R2StorageLevel = infos.r2[4].toNumber();
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
