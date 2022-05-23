<template>
  <div>
    <a
      v-if="account == null"
      class="
        cursor-pointer
        text-gray-900
        bg-gradient-to-r
        from-red-200
        via-red-300
        to-yellow-200
        hover:bg-gradient-to-bl
        focus:ring-4 focus:outline-none focus:ring-red-100
        dark:focus:ring-red-400
        font-medium
        rounded-lg
        text-sm
        px-5
        py-2.5
        text-center
        mr-2
        mb-2
      "
      v-on:click="tryConnect()"
    >
      Connect wallet
    </a>
    <a
      v-if="account != null"
      class="
        cursor-pointer
        text-white
        border-white border
        hover:bg-gradient-to-bl
        focus:ring-4 focus:outline-none focus:ring-green-200
        dark:focus:ring-green-800
        font-medium
        rounded-lg
        text-sm
        px-5
        py-2.5
        text-center
        mr-2
        mb-2
      "
    >
      {{ account.slice(0, 12) }}..
    </a>
  </div>
</template>

<script>
export default {
  name: "ConnectButton",
  props: {},
  methods: {
    tryConnect: async function () {
      console.log("TRY CONNECT", this);
      this.$store.dispatch("connect");
    },
  },
  computed: {
    account: function () {
      return this.$store.state.account;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
