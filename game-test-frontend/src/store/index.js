import { createStore } from 'vuex'
import { providers, ethers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import GameUtils from "../../../js-lib/index"


let providerOptions = {
  walletconnect: {
      package: WalletConnectProvider, // required
      options: {
          infuraId: "412acf21edf5444a8c9f6bd737cf8ca2", // required
      },
  },
};

let w3;

export default createStore({
  state: {
    account: null,
    login_secret: null,
    askConnection: false,
    gameLib: null
  },
  getters: {
  },
  mutations: {
    askConnection: function (state, status = true) {
      state.askConnection = status;
    },
    setWeb3: async function (state, infos) {
      try {
        if (infos == null || infos.login_secret == null) {
          throw 'force_disconnect'
        } else {
          state.account = infos.account;
          state.login_secret = infos.login_secret;
          state.gameLib = new GameUtils(w3,{ // this re addresses for local hardhat testnet
            game: "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707",
            planet: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"
          })
          /*
          state.gameLib = new GameUtils(w3,{ // this re addresses for local hardhat testnet
            game: "0x55E2507D3A62c350D64f76343F0C87F4aA779d22",
            planet: "0xEE9d1Ce4abf8b9d4904933edb810945eAeD17b6C"
          })
          */
          
        }
      } catch (error) {
        console.log(error)
        state.account = null;
        state.login_secret = null;
        state.gameLib = null;
      }
    },
  },
  actions: {
    askConnection: async function (context, opt = {}) {
      console.log("YOU NEED TO BE CONNECTED")
      context.commit("askConnection", true)
    },
    connect: async function (context, opt = {}) {
      try {
        let web3Modal = new Web3Modal({
          network: "mainnet", // optional
          cacheProvider: true, // optional
          providerOptions // required
        });
        console.log("connect mutation")
        if (opt.clearCache == true || true) {
          web3Modal.clearCachedProvider();
        }
        if (opt.tryFromCache == true && !web3Modal.cachedProvider) {
          return
        }
        let provider = await web3Modal.connect();
        w3 = new providers.Web3Provider(provider);
        let infos = {
          login_secret: null,
          account: provider.selectedAddress,
        }
        console.log(sessionStorage.getItem(`login_secret_${infos.account}`))
        if (sessionStorage.getItem(`login_secret_${infos.account}`)) {
          infos.login_secret = sessionStorage.getItem(`login_secret_${infos.account}`);
          infos.askConnection = false;
        } else {
          let message = ((`I'm signing this message to log in `));
          const signer = w3.getSigner();
          const sig = await signer.signMessage(message)
          if (sig != null) {
            sessionStorage.setItem(`login_secret_${infos.account}`, sig);
            infos.login_secret = sig;
            infos.askConnection = false;
          }
        }

        console.log(infos)

        context.commit("setWeb3", infos)
      } catch (error) {
        console.log(error)
      }
    },
    disconnect: async function (context) {
      web3Modal.clearCachedProvider();
      context.commit("setWeb3", null)
    }
  },
  modules: {
  }
})
