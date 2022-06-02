<template>
  <div class="col-span-2 mt-12 space-x-2 space-y-2">
    <div v-if="balance != null">
      <div
        class="
          border border-gray-200
          rounded-lg
          shadow-sm
          divide-y divide-gray-200
          m-2
        "
      >
        <div class="p-6 relative">
          <h2 class="text-lg leading-6 font-medium text-gray-900">
            {{ ressources[ressource].name }} 
          </h2>
          <div class="absolute right-6 top-6 bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded ">level {{ level }}</div>
          <p class="mt-4 text-sm text-gray-500">
            You are currently mining {{ perHour }}
            {{ ressources[ressource].symbol }} per hour.
          </p>
          <p class="mt-8 text-center">
            <span class="text-4xl font-extrabold text-gray-900"
              >{{ bal }} {{ ressources[ressource].symbol }}</span
            >
            <span class="text-base font-medium text-gray-500"></span>
          </p>
          <div
            v-on:click="upgrade"
            class="
              mt-8
              block
              w-full
              bg-gray-800
              border border-gray-800
              rounded-md
              py-2
              text-sm
              font-semibold
              text-white text-center
              hover:bg-gray-900
            "
          >
            Upgrade storage to level {{ nextlevl }}
          </div>
        </div>
        <div class="pt-6 pb-8 px-6">
          <h3 class="text-xs font-medium text-gray-900 tracking-wide uppercase">
            Upgrade cost
          </h3>
          <ul role="list" class="mt-6 space-y-4">
            <li class="flex space-x-3">
              <!-- Heroicon name: solid/check -->
              <svg
                class="flex-shrink-0 h-5 w-5 text-green-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="text-sm text-gray-500">{{ cost0 }} Food</span>
            </li>

            <li class="flex space-x-3">
              <!-- Heroicon name: solid/check -->
              <svg
                class="flex-shrink-0 h-5 w-5 text-green-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="text-sm text-gray-500">{{ cost1 }} Metal</span>
            </li>
          </ul>
        </div>
      </div>

      <div
        class="
          border border-gray-200
          rounded-lg
          shadow-sm
          divide-y divide-gray-200
          m-2
        "
      >
        <div class="p-6 relative">
          <h2 class="text-lg leading-6 font-medium text-gray-900">
            {{ name }} Storage level {{ storageLevel }}
          </h2>
         <div class="absolute right-6 top-6 bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded ">level {{ storageLevel }}</div>

          <p class="mt-4 text-sm text-gray-500">
            You are currently mining {{ perHour }} {{ name }} per hour.
          </p>
          <p class="mt-8 text-center">
            <span class="text-4xl font-extrabold text-gray-900">{{
              storagePercent
            }}</span>
            <span class="text-base font-medium text-gray-500">%</span>
          </p>
          <div
            v-on:click="upgradeStorage"
            class="
              mt-8
              block
              w-full
              bg-gray-800
              border border-gray-800
              rounded-md
              py-2
              text-sm
              font-semibold
              text-white text-center
              hover:bg-gray-900
            "
          >
            Upgrade to level {{ storageLevel + 1 }}
          </div>
        </div>
        <div class="pt-6 pb-8 px-6">
          <h3 class="text-xs font-medium text-gray-900 tracking-wide uppercase">
            Upgrade cost
          </h3>
          <ul role="list" class="mt-6 space-y-4">
            <li class="flex space-x-3">
              <!-- Heroicon name: solid/check -->
              <svg
                class="flex-shrink-0 h-5 w-5 text-green-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="text-sm text-gray-500">{{ scost0 }} Food</span>
            </li>

            <li class="flex space-x-3">
              <!-- Heroicon name: solid/check -->
              <svg
                class="flex-shrink-0 h-5 w-5 text-green-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="text-sm text-gray-500">{{ scost1 }} Metal</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { utils, BigNumber } from "ethers";

export default {
  name: "PlanetRessource",
  props: {
    balance: String,
    level: Number,
    planet: String,
    productionPerSec: String,
    name: String,
    ressource: Number,
    storage: String,
    storageLevel: Number,
  },
  data() {
    return {
      upgradeCost0: 0,
      upgradeCost1: 0,
      supgradeCost0: 0,
      supgradeCost1: 0,
    };
  },
  methods: {
    upgrade: async function () {
      console.log("REGISTER PLANET");
      this.$store.state.gameLib.upgradeRessource(this.planet, this.ressource);
    },
    upgradeStorage: async function () {
      console.log("REGISTER PLANET");
      this.$store.state.gameLib.upgradeStorage(this.planet, this.ressource);
    },
  },
  computed: {
    nextlevl: function () {
      return this.level + 1;
    },
    bal: function () {
      if (this.balance == null) {
        return 0;
      }
      let res = utils.formatEther(this.balance);
      res = (+res).toFixed(2);
      return res;
    },
    cost0: function () {
      let res = utils.formatEther(this.upgradeCost0);
      res = (+res).toFixed(0);
      return res;
    },
    cost1: function () {
      let res = utils.formatEther(this.upgradeCost1);
      res = (+res).toFixed(0);
      return res;
    },
    scost0: function () {
      let res = utils.formatEther(this.supgradeCost0);
      res = (+res).toFixed(0);
      return res;
    },
    scost1: function () {
      let res = utils.formatEther(this.supgradeCost1);
      res = (+res).toFixed(0);
      return res;
    },
    storagePercent: function () {
      let res = BigNumber.from(this.balance).mul(10000).div(this.storage);
      return res.toNumber() / 100;
    },
    perHour: function () {
      let res = BigNumber.from(this.productionPerSec)
        .mul(60)
        .mul(60)
        .div("1000000000000000000");
      return res.toString();
    },
  },
  watch: {
    level: async function () {
      let cost = await this.$store.state.gameLib.getUpgradeCost(
        this.ressource,
        this.level + 1
      );
      this.upgradeCost0 = cost.r0;
      this.upgradeCost1 = cost.r1;
    },
    storageLevel: async function () {
      let scost = await this.$store.state.gameLib.getUpgradeStorageCost(
        this.ressource,
        this.storageLevel + 1
      );
      console.log(scost)
      this.supgradeCost0 = scost.r0;
      this.supgradeCost1 = scost.r1;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
