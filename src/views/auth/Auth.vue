<template>
  <slot name="header"></slot>

  <div class="auth">
    <div class="auth__container">
      <div class="auth__content">
        <h1 class="auth__title">{{$t('signin')}}</h1>

        <div class="auth__input">
          <label class="auth__input-label" for="email">Email</label>
          <input type="email" name="email" v-model="email">
        </div>

        <div class="auth__input">
          <label class="auth__input-label" for="password">Пароль</label>
          <input type="password" name="" v-model="password">
        </div>

        <div class="auth__error" v-if="errorMessageState">
          <span class="auth__error-message">{{errorMessage}}</span>
        </div>

        <div class="auth__captcha">
          <vue-hcaptcha ref="invisibleHcaptcha"
               theme="light"
               language="ru"
               :sitekey="siteKey"
               @verify="onVerify"
               @expired="onExpire">
           </vue-hcaptcha>
        </div>

        <div class="auth__send">
          <button class="auth__send-button" type="button" @click="requestMiddleware('signup')">
            {{$t('buttons.to_come')}}
          </button>
          <a class="auth__restor-password" @click="requestMiddleware('restore')">
            {{$t('buttons.reset')}}
          </a>
        </div>

      </div>
    </div>
  </div>

  <slot name="footer"></slot>
</template>


<script>
import VueHcaptcha from '@hcaptcha/vue3-hcaptcha';
import '@/assets/style/auth.css';
import {axiosMiddleware, checkInput} from "@/util/utils.js";

export default{
  components: { VueHcaptcha },
  data(){
    return{
      siteKey: 'abc758dd-917c-4d18-bf11-5018df4f3aa2',
      email: '',
      password: '',
      token:"",
      errorMessage: "",
      errorMessageState: false,
    }
  },
  methods:{
    onVerify: function(token){this.token = token;},
    onExpire() {this.token = "";},
    setErrorMessage: function(message){
      this.errorMessage = message;
      this.errorMessageState = true;
      this.$refs.invisibleHcaptcha.reset();
    },

    requestMiddleware(req_type){
      this.errorMessageState = false;

      let funcRouter = {'signup': this.signUp, 'restore': this.restorePassword};
      let userData = {"email": this.email, "captch_token": this.token,};

      if (req_type === 'signup')
        userData['password'] = this.password

      funcRouter[req_type](checkInput(userData), userData);
    },

    restorePassword: async function(checkState, userData){
      let message = "Сообщения с ссылкой на восстановления была отправлена на указанную вами почту";

      if (!checkState.status){
        this.setErrorMessage("Для восстановления пароля введите почту")
        return
      }

      let restoreResult = await axiosMiddleware("POST", "auth/reset", userData);
      if (!restoreResult.errorState)
        message = restoreResult.data.detail;
      else
        message = restoreResult.errorMessage;

      this.setErrorMessage(message);
    },

    signUp: async function(checkState, userData){
      if (!checkState.status){
        this.setErrorMessage(checkState.message)
        return
      }

      let authResult = await axiosMiddleware("POST", "signin", userData, );
      if (!authResult.errorState){
        this.$store.dispatch('signIn', {
          "accessToken": authResult.data['access_token'],
          "refreshToken": authResult.data['refresh_token']
        })
        this.$router.push({ name: 'home'})
      }
      else
        this.setErrorMessage(authResult.errorMessage);
    }
  }
}
</script>


<style>
</style>
