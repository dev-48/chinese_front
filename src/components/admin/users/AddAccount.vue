<script>
  import {axiosMiddleware, checkInput} from "@/util/utils.js";

  export default{
    name: 'addAccount',
    data(){
      return{
        selectedPermissionsId: 0,
        email: '',
        password: '',
        passwordConfirm: '',
        permission: '',
        permissionDesc: '',
        errorMessage: '',
        errorMessageState: false,
        userPermissions: {},
        permissionsList: {},
      }
    },
    async created(){
      let permissions = await axiosMiddleware('GET', '/admin/permissions', {}, true)
      if (!permissions.errorState)
        this.permissionsList = permissions.data.permissions;
    },
    methods:{
      backMenu(){
        this.$emit("backMenu")
      },
      setErrorMessage: function(message){
        this.errorMessage = message;
        this.errorMessageState = true;
      },
      delPermission: function(key){delete this.userPermissions[key]},
      addPermission: function(){
        let permissionData = this.permissionsList[this.selectedPermissionsId];
        if (permissionData){
          this.userPermissions[permissionData.id] = permissionData.public_name;
          this.permission = '';
          this.permissionDesc = '';
        }
      },
      addDesc: function(){
        this.selectedPermissionsId = event.target.value;
        this.permissionDesc = this.permissionsList[event.target.value].desc;
      },
      userRegistration: async function(){
        this.errorMessageState = false;

        let userData = {
            "email": this.email,
            "password": this.password,
            "passwordConfirm": this.passwordConfirm
        }

        let checkResult = checkInput(userData, ['password', 'passwordConfirm'])
        if (!checkResult.status)
          return this.setErrorMessage(checkResult.message);

        if (Object.keys(this.userPermissions).length > 0){
          userData['permission'] = [];
          for (let perm in this.userPermissions)
            userData.permission.push(perm)
        }

        let userReg = await axiosMiddleware('POST', '/signup', userData, true)
        if (userReg.errorState){
          this.setErrorMessage(userReg.errorMessage);
        }
      }
    }
  }
</script>


<template>
  <div class="admin__add-account">
    <div class="admin__add-container">
      <div class="admin__add-account-content">
        <div class="add-account__title">
          <span class="admin__h1 admin_text">Создать аккаунт</span>
          <button @click="backMenu" class="admin__button">Назад</button>
        </div>

        <div class="add-account__email">
          <label class="admin__label">Почта</label>
          <input type="email" class="admin__input" v-model="email">
        </div>

        <div class="add-account__password">
          <div class="password__container">
            <label class="admin__label">Пароль</label>
            <input type="password" class="admin__input" v-model="password">
          </div>

          <div class="password-confirm__container">
            <label class="admin__label">Подтвердите пароль</label>
            <input type="password" class="admin__input" v-model="passwordConfirm">
          </div>
        </div>
      </div>

      <div class="add-account__permissions-list">
        <label for="" class="admin__label">Права для данного пользователя</label>

        <select class="admin__select" v-model="permission" @change="addDesc">
          <option class="admin__option" v-for="(perm, key) in permissionsList" :value="key" v-bind:key="key.id">
            {{perm.public_name}}
          </option>
        </select>

        <div class="add__permission-add">
          <button class="admin__button" type="button" name="button" @click="addPermission">Добавить</button>
        </div>

        <div class="add__permission-desc">
          <p>{{permissionDesc}}</p>
        </div>

        <div class="add__selected-permissions" v-if="Object.keys(userPermissions).length > 0">
          <label class="admin__label">Выбранные права для данного пользователя </label>

          <div class="" v-for="(perm, key) in userPermissions" v-bind:key="key.id">
            <a class="add__permission" @click="delPermission(key)">✖ {{perm}}</a>
          </div>

        </div>
      </div>

      <div class="admin__error" v-if="errorMessageState">
        <span class="admin__error-message">{{errorMessage}}</span>
      </div>

      <div class="add-account__send">
        <button @click="userRegistration" class="admin__button" type="button" name="button">Отправить</button>
      </div>

    </div>
  </div>
</template>


<style media="screen">
  .add-account__send{
    margin-bottom: 25px;
  }

  .admin__add-container{
    position: relative;
    width: 95%;
    height: 100%;
    margin: 0 auto;
    padding-bottom: 15px;
  }


  .admin__add-account{
    font-family: 'Lucida Console';

    width: 70%;
    height: 100%;
    background-color: var(--bgc);
    border-radius: 6px;
  }

  .add-account__title{
    display: flex;
    justify-content: space-between;
    color: white;
    padding: 20px 0 0 0;
  }

  .add-account__email{
    display: flex;
    flex-direction: column;
    margin: 25px 0 0 0;
    width: 95%;
  }

  .add-account__password{
    display: flex;
    width: 100%;
    margin: 25px 0 25px 0;
    justify-content: space-between;
  }

  .password__container{
    width:45%;
  }

  .password-confirm__container{
    width:45%;
    margin-right: 40px;
  }

  .add-account__permissions-list{
    margin-bottom: 25px;
  }


  .add__permission-add{
    display: inline;
    margin-left: 15px;
  }

  .add__permission-desc{
    width: 70%;
    color: white;
    font-size: 15px;
    margin: 25px 0 25px 0;
  }

  .add__selected-permissions{
    width: 80%;
    color: white;
    font-size: 13px;
    margin: 25px 0 25px 0;
  }

  .add__permission{
    width: 40%;
    display: block;
    margin-top: 15px;;
  }

</style>
