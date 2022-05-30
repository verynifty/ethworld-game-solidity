<template>
  <div>
    <header class="text-gray-400 bg-gray-900 body-font">
      <div
        class="
          container
          mx-auto
          flex flex-wrap
          p-5
          flex-col
          md:flex-row
          items-center
        "
      >
        <a
          class="
            flex
            title-font
            font-medium
            items-center
            text-white
            mb-4
            md:mb-0
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            class="w-10 h-10 text-white p-2 bg-blue-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
            ></path>
          </svg>
          <span class="ml-3 text-xl">Ssmple game</span>
        </a>
        <nav
          class="
            md:ml-auto md:mr-auto
            flex flex-wrap
            items-center
            text-base
            justify-center
          "
        >
          <router-link class="mr-5 hover:text-white" to="/">Main</router-link>
                    <router-link class="mr-5 hover:text-white" to="/map"
            >Map</router-link
          >
          <router-link class="mr-5 hover:text-white" to="/about"
            >About</router-link
          >
        </nav>
        <button
          class="
            inline-flex
            items-center
            bg-gray-800
            border-0
            py-1
            px-3
            focus:outline-none
            hover:bg-gray-700
            rounded
            text-base
            mt-4
            md:mt-0
          "
        >
         <ConnectButton />
        </button>
      </div>
    </header>

    <router-view />
  </div>
</template>

<script>
import ConnectButton from '@/components/web3/ConnectButton.vue'

export default {
  name: 'App',
  components: {
   ConnectButton
  }
}
</script>

<style>
  @import '@ansur/leaflet-pulse-icon/dist/L.Icon.Pulse.css';

</style>
