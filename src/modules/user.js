import jwt_decode from "jwt-decode"
import axios from 'axios'

import {time_in_milliseconds} from "@/util/utils.js";

export default{
  state: {
    authState: false,
    accessToken: localStorage.accessToken || null,
    refreshToken: localStorage.refreshToken || null,
    userData: {}
  },
  getters: {
    getAccessToken(state){return state.accessToken},
    getRefreshToken(state){return state.refreshToken},
    getUserData(state){return state.userData},
    getAuthState(state){return state.authState},
  },
  mutations: {
    setAuthState(state, authState){state.authState = authState},
    setUserData(state, userData){state.userData = userData;},
    setRefreshToken(state, token){
      state.refreshToken = token;
      localStorage.refreshToken = token;
    },
    setAccessToken(state, token){
      state.accessToken = token;
      localStorage.accessToken = token;
    }
  },
  actions: {
    checkAuth: async({getters, dispatch})=>{
      if (getters.getAccessToken !== null && getters.getRefreshToken !== null){
        await dispatch('signIn', {"accessToken": getters.getAccessToken, "refreshToken": getters.getRefreshToken});
      }
      else
        console.log("NOT TOKEN")
    },

    signIn: async({commit, dispatch}, tokens)=> {
      let tokenPayload = jwt_decode(tokens.accessToken);
      let exp = time_in_milliseconds(tokenPayload.exp);

      console.log(exp)

      if (tokenPayload.super_user || tokenPayload.permissions)
        tokenPayload['is_staff'] = true;

      commit('setAccessToken', tokens.accessToken);
      commit('setRefreshToken', tokens.refreshToken);
      commit('setUserData', tokenPayload);
      commit('setAuthState', true);

      dispatch('updateJwtToken', exp);
    },

    updateJwtToken: async({getters, dispatch}, exp)=>{
      await setTimeout(()=>{
          console.log("UPDATE TOKEN")
          if (getters.getRefreshToken){
            axios.put("/refresh",{},{headers: {
                    'Authorization': `Bearer ${getters.getRefreshToken}`
            }})
            .then((resp)=>{
              dispatch('signIn', {"accessToken": resp.data['access_token'],
                "refreshToken": resp.data['refresh_token']
              })
            })
            .catch((err)=>{
              console.log(err)
              dispatch('cleanAuthData')
            })
          }
          else
            dispatch('cleanAuthData')
      }, exp)
    },

    cleanAuthData: async({commit})=>{
      commit('setUserData', {});
      commit('setAuthState', false);

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },

  }
}
