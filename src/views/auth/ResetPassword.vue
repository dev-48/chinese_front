<template>
  <slot name="header"></slot>

  <div class="reset">
    <div class="auth__container">
      <div class="auth__content">

      <h1 class="auth__title">{{$t('reset_password')}}</h1>

      <div class="auth__input">
        <label class="auth__input-label" for="password">Пароль</label>
        <input type="password" name="password" v-model="password">
      </div>

      <div class="auth__input">
        <label class="auth__input-label" for="password-confirm">Пароль ещё раз</label>
        <input type="password" name="password-confirm" v-model="passwordConfirm">
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
        <button class="auth__send-button" type="button" @click="changePassword">
          {{$t('buttons.to_come')}}
        </button>

        <router-link to="/auth" class="auth__restor-password">
          Авторизоваться
        </router-link>
      </div>

      </div>
    </div>
  </div>

  <slot name="footer"></slot>
</template>


<script>
  import VueHcaptcha from '@hcaptcha/vue3-hcaptcha';

  import {axiosMiddleware, checkInput} from "@/util/utils.js";
  import '@/assets/style/auth.css';

  export default{
    name: 'ResetPassword',
    components: { VueHcaptcha },
    data(){
      return{
        siteKey: 'abc758dd-917c-4d18-bf11-5018df4f3aa2',
        token:"",
        password: "",
        passwordConfirm: "",
        errorMessage: "",
        errorMessageState: false,
      }
    },
    methods:{
      onVerify(token) {this.token = token;},
      onExpire() {this.token = "";},
      setErrorMessage: function(message){
        this.errorMessage = message;
        this.errorMessageState = true;
        this.$refs.invisibleHcaptcha.reset();
      },
      changePassword: async function(){
        this.errorMessageState = false;
        let changeData = {
          token: this.$route.query.token,
          password: this.password,
          captch_token: this.token,
        }
        let checkStatus = checkInput({
            password: this.password,
            passwordConfirm: this.passwordConfirm
          }, ['password', 'passwordConfirm']
        )
        if (!checkStatus.status)
          return this.setErrorMessage(checkStatus.message)

        let restoreResult = await axiosMiddleware("PUT", "auth/reset", changeData);
        if (restoreResult.errorState)
          return this.setErrorMessage(restoreResult.errorMessage)

        this.$store.dispatch('signIn', {
          "accessToken": restoreResult.data['access_token'],
          "refreshToken": restoreResult.data['refresh_token']
        })
        this.$router.push({ name: 'home'})
      }
    }

  }

</script>


<style media="screen">

</style>
