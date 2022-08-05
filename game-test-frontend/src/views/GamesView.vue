<template>
  <div class="home">List of games:</div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "GamesView",
  components: {
    HelloWorld,
  },
  data() {
    return {
      loaded: false,
      nbGames: 0,
      games: [],
    };
  },
  mounted: async function () {
    this.init();
  },
  methods: {
    init: async function () {
      // console.log("&&&&&& INIT");
      if (this.loaded || this.account == null) {
        return;
      }
      this.loaded = true;
      this.nbGames = await this.$store.state.engine.getGames();
      for (let index = 0; index < this.nbGames; index++) {
        let g = await this.$store.state.engine.getGame(index);
        this.games.push(g);
      }
    },
  },
  computed: {
    account: function () {
      return this.$store.state.account;
    },
  },
  watch: {
    account: function () {
      this.init();
    },
  },
};
</script>
