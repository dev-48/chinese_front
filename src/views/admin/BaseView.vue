<script>
  import {markRaw} from 'vue'
  import '@/assets/style/admin.css';

  import UserList from '@/components/admin/users/UserList.vue';
  import Category from '@/components/admin/category/Category.vue';
  import UnderCate from '@/components/admin/under_cate/UnderCate.vue';
  import {axiosMiddleware} from "@/util/utils.js";

  export default{
    name: "AdminPanelMain",
    components:{
      UserList: markRaw(UserList),
      Category: markRaw(Category),
      UnderCate: markRaw(UnderCate)
    },
    data(){
      return{
        activeComponentName: '',
        componentSelected: null,
      }
    },
    mounted(){
      this.switchComponents('userList')
    },
    methods:{
      activeComponent: function(componentName){
        if (this.activeComponentName === componentName)
          return {'p-activate': true}
        return {'admin__nav-list-content': true}
      },
      userLogOut: async function(){
        await axiosMiddleware('DELETE', '/logout', {}, true, true)
        this.$store.dispatch('cleanAuthData');
        this.$router.push({ name: 'home'});
      },
      switchComponents: function(componentName){
        this.activeComponentName = componentName;

        switch (componentName){
          case 'statistics':
            this.componentSelected = null;
            break;

          case 'addCategory':
            this.componentSelected = Category;
            break;

          case 'userList':
            this.componentSelected = UserList;
            break;

          case 'underCate':
            this.componentSelected = UnderCate
        }
      }
    }
  }
</script>


<template>
  <div class="admin-panel">

    <div class="admin__header">
      <div class="admin__header-content">
        <span class="admin__header-title">АДМИН ПАНЕЛЬ</span>

        <div class="header__user-menu">
            <router-link to="/" class="header__user-menu-logout">САЙТ</router-link>
            <a @click="userLogOut" class="header__user-menu-logout">ВЫЙТИ</a>
        </div>
      </div>
    </div>

      <div class="admin__nav-block">
        <div class="admin__nav-block-content">
          <div class="admin__logo">
            <span class="admin__logo-name">КИТАЙСКИЙ ЛЕКАРЬ</span>
          </div>

          <div class="admin__nav">

            <ul class="admin__nav-list">
              <li class="admin__nav-list-container">
                <div class="admin__nav-list-content">
                  <a class="admin__nav-content" @click="switchComponents('statistics')">
                    <i><img src="@/assets/icons/icons8-stats.png" width="24" style="margin-right: 15px"></i>
                    <p v-bind:class="activeComponent('Statistics')">СТАТИСТИКА</p>
                  </a>
                </div>
              </li>

              <li class="admin__nav-list-container">
                <div class="admin__nav-list-content">
                  <a class="admin__nav-content" @click="switchComponents('userList')">
                    <i><img src="@/assets/icons/icons8-userr1.png" width="24" style="margin-right: 15px"></i>
                    <p v-bind:class="activeComponent('userList')">ПОЛЬЗОВАТЕЛИ</p>
                  </a>
                </div>
              </li>

              <li class="admin__nav-list-container">
                <div class="admin__nav-list-content">
                  <a class="admin__nav-content" @click="switchComponents('addCategory')">
                    <i><img src="@/assets/icons/icons8-plus.png" width="24" style="margin-right: 15px"></i>
                    <p v-bind:class="activeComponent('addCategory')">КАТЕГОРИИ</p>
                  </a>
                </div>
              </li>

              <li class="admin__nav-list-container">
                <div class="admin__nav-list-content">
                  <a class="admin__nav-content" @click="switchComponents('underCate')">
                    <i><img src="@/assets/icons/icons8-plus.png" width="24" style="margin-right: 15px"></i>
                    <p v-bind:class="activeComponent('underCate')">ПОДКАТЕГОРИИ</p>
                  </a>
                </div>
              </li>

              <li class="admin__nav-list-container">
                <div class="admin__nav-list-content">
                  <a class="admin__nav-content" @click="switchComponents('addProducts')">
                    <i><img src="@/assets/icons/icons8-plus.png" width="24" style="margin-right: 15px"></i>
                    <p v-bind:class="activeComponent('')">ТОВАРЫ</p>
                  </a>
                </div>
              </li>

              <li class="admin__nav-list-container">
                <div class="admin__nav-list-content">
                  <a class="admin__nav-content" @click="switchComponents('addProducts')">
                    <i><img src="@/assets/icons/icons8-in-transit-50.png" width="24" style="margin-right: 15px"></i>
                    <p v-bind:class="activeComponent('')">КУРЬЕРЫЙ</p>
                  </a>
                </div>
              </li>

              <li class="admin__nav-list-container">
                <div class="admin__nav-list-content">
                  <a class="admin__nav-content" @click="switchComponents('addProducts')">
                    <i><img src="@/assets/icons/icons8-settings-50.png" width="24" style="margin-right: 15px"></i>
                    <p v-bind:class="activeComponent('')">ПРОЕКТ</p>
                  </a>
                </div>
              </li>

            </ul>

          </div>
        </div>
      </div>

    <main class="admin__main">
      <div class="admin__content-block">
        <div class="admin__content-block-content">
          <Transition name="switch-component">
            <component :is="componentSelected"></component>
          </Transition>
        </div>
      </div>
    </main>

  </div>
</template>


<style media="screen">
  .admin__content-block-content{
    width: 100%;
  }

  .p-disable{
    color: #ECB7F0;
  }

  .p-activate{
    color: white
  }

  .switch-component-enter-active,
  .switch-component-leave-active {
    transform: translateY(-50px);
    transition: all .5s;
  }

  .switch-component-enter-from,
  .switch-component-leave-to {
    transform: translateY(150px);
    opacity: 0;
  }

  .admin-component-enter-active,
  .admin-component-leave-active {
    transition: all .5s;
  }

  .admin-component-enter-from,
  .admin-component-leave-to {
    transform: translateX(50px);
    opacity: 0;
  }

  .admin-component-up-enter-active{
    transition: all 0.3s ease-out;
  }

  .admin-component-up-leave-active {
    transition: all 0.45s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .admin-component-up-enter-from,
  .admin-component-up-leave-to {
    transform: translateX(20px);
    opacity: 0;
  }


  .activate .admin__nav-content{
    color: white;
  }

  .admin__nav-list{
    padding: 0;
  }

  .admin-panel{
    width: 100%;
    height: 100%;
    background-color: #1E1E2F;
    padding: 0;
    margin: 0;
    overflow: auto;
  }

  .admin__main{
    width: 100%;
    height: 100%;
    padding: 0px 10px 0px 310px;
    margin: 0;
  }

  .admin__header{
    width: 100%;
    height: 70px;
  }

  .header__user-menu{
    font-family: 'Lucida Console';
    font-size: 18px;
  }

  .header__user-menu-logout{
    color: white;
    margin-left: 15px;
  }

  .admin__nav-block{
    width: 320px;
    height: 92%;
    position:fixed;
  }

  .admin__header-content{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 90%;
    width: 95%;
    margin: 0 auto;
  }


  .admin__header-title{
    color: white;
    font-family: 'Lucida Console';
    margin-left: 18px;
    font-size: 20px;
  }


  .admin__nav-block-content{
    background: linear-gradient(to bottom, #E14ECB, #BE53F0);
    width: 80%;
    height: 100%;
    margin: 0 auto;
    border-radius: 6px;
  }

  .admin__logo{
    position: relative;
    height: 70px;
    width: 88%;
    margin: 0 auto;
    border-bottom: 0.2px solid white;
    padding: 5px;
    margin-bottom: 30px;
  }

  .admin__logo-name{
    font-family: 'Lucida Console';
    width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    position: absolute;
    display: block;
    color: white;
    text-align: center;
    font-size: 18px;
  }

  .admin__nav-content{
    display: flex;
    align-items: center;

    font-family: 'Lucida Console';
    font-weight: 400;
    font-size: 13px;
    color: #ECB7F0;
    transition: color .3s;

  }

  .admin__nav-list-content{
    transition: color .3s;
  }

  .admin__nav-list-container:hover .admin__nav-list-content{
    color: white;
  }

  .admin__nav-list-container{
    height: 50px;
    margin: 0 5px 0 18px;
  }

  .admin__content-block{
    width: 100%;
    height: 100%;
  }

</style>
