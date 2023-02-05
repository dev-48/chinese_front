<script type="text/javascript">
import {axiosMiddleware} from "@/util/utils.js";
import AddAccount from '@/components/admin/users/AddAccount.vue';
import PreLoader from '@/components/PreLoader.vue';
export default{
  name: 'UserList',
  components:{
    AddAccount,
    PreLoader
  },
  computed:{
    requestState(){return this.$store.getters.getRequestStatus},
  },
  data(){
    return {
      maxPage: 0,
      page: 1,
      limit: 10,
      emailSearch: '',
      addUserState: false,
      userList: {},
      allUserList: {},
    }
  },
  async mounted(){
    this.getUserList()
  },
  methods:{
    prevPage: async function(){this.page -= 1; await this.getUserList()},
    nextPage: async function(){
      if (this.page < this.maxPage){
        this.page += 1
        await this.getUserList();
      }
    },
    getUserList: async function(){
      let url = `/admin/users/list?page=${this.page}&limit=${this.limit}`
      let userList = await axiosMiddleware("GET", url, {}, true);
      if (!userList.errorState){
        this.maxPage = userList.data.number_pages;
        this.allUserList = userList.data.user_list;
        this.userList = userList.data.user_list;
      }
    },
    backMenu: async function(){this.getUserList(); this.addUserState = false;},
    searchEmail: async function(){
      let user = await axiosMiddleware('GET', `/admin/search/user?email=${this.emailSearch}`, {}, true)
      if (!user.errorState)
        this.userList = user.data;
    }
  },
  watch: {
    async emailSearch(newEmail){
      if (newEmail.length >= 3){
        await this.searchEmail(newEmail);
      }
      else{
        this.userList = this.allUserList;
      }
    }
  }
}
</script>


<template>
  <div class="user-list" v-if="!addUserState">
    <div class="user-list__container">
      <div class="user-list__content">

        <div class="user-list__header-title">
          <h1 class="admin__h1 admin_text">Пользователи</h1>
        </div>

        <div class="user-list__header">
          <div class="header__user-search">
            <input type="text" class="admin__input" v-model="emailSearch" placeholder="Поиск пользователя">
          </div>

          <div class="header__add-user">
            <button type="button" class="admin__button" @click="addUserState=true">Добавить пользователя</button>
          </div>
        </div>

        <div class="" v-if="requestState">
          <div class="user-list__preloader">
            <PreLoader/>
          </div>
        </div>

        <div class="user-list__list" v-else>
          <div class="list__users">
            <table class="admin__table">
              <tr class="admin__tr">
                <th class="user_list__id-th admin__th" scope="col">id</th>
                <th class="user_list__email-th admin__th" scope="col">Почта</th>
                <th class="admin__th" scope="col">Дата регистрации</th>
              </tr>
              <TransitionGroup name="admin-dell">
                <tr v-for="(userData, key) in userList" v-bind:key="key">
                  <td class="admin__td">{{key}}</td>
                  <td class="admin__td">{{userData.email}}</td>
                  <td class="admin__td">{{userData.date_create}}</td>
                </tr>
              </TransitionGroup>
            </table>
          </div>
        </div>

        <div class="user-list__pagination" v-if="!requestState">
          <button type="button" class="pagination-button admin__button" @click="nextPage" v-if="page < maxPage">Вперед</button>
          <button type="button" class="admin__button" @click="prevPage" v-if="page > 1">Назад</button>
        </div>

      </div>
    </div>
  </div>
  <div class="add-user" v-else>
    <AddAccount @backMenu="backMenu"/>
  </div>
</template>


<style media="screen">
.user-list__preloader{
  width: 100px;
  height: 100px;
}
.user-list__header-title{
  padding-top: 25px;
}
.user-list{
  width: 70%;
  max-height: 100%;
  background-color: var(--bgc);
  border-radius: 6px;
  padding-bottom: 40px;
  margin: 0;
  overflow-y: auto;
}
.user-list__container{
  width: 95%;
  height: 100%;
  margin: 0 auto;
}
.user-list__header{
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
}
.header__user-search{
  width: 50%;
  margin-top:27px;
}
.header__add-user{
  margin-top:25px;
}
.user-list__pagination{
  margin-top: 45px;
}
.pagination-button{
  margin-right: 10px;
}
.user_list__email-th{
  width: 500px;
}
</style>

<style scoped>
.admin__td {
  word-break: break-all;
}
</style>