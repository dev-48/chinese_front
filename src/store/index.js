import { createStore } from 'vuex'
import axios from 'axios'

import user from '@/modules/user.js'

export default createStore({
  state: {
    lang: localStorage.lang || 'ru',
    backEndAdr: "http://127.0.0.1:8081",
    requestStatus: false,
  },
  getters: {
    getRequestStatus(state){return state.requestStatus},
    getLang(state){return state.lang},
    getBackEndAdr(state){return state.backEndAdr}
  },
  mutations: {
    setLang(state, lang){
      state.lang = lang;
      localStorage.lang = lang;
    },
    setRequestStatus(state, status){state.requestStatus = status}
  },
  actions: {
    async getCategoryList({state}){
      let req = axios.get(`${state.backEndAdr}/api/v1/category`)
      .then((req)=> {
        return req.data
      })
      .catch(()=> {
        return {}
      })

      return req
    }
  },
  modules: {
    user
  }
})
