<script>
  import UnderCateChange from "@/components/admin/under_cate/UnderCateChange.vue";
  import ConfirmWindow from '@/components/ConfirmWindow.vue';
  import {axiosMiddleware} from "@/util/utils.js"; //axiosMiddleware

  export default{
    name: "UnderCate",
    components: {
      UnderCateChange,
      ConfirmWindow
    },
    data(){
      return{
        page: 1,
        pagesCount: 0,
        categoryId: 0,
        changeCategoryId: 0,
        addUnderCateState: false,
        confirmWindows: false,
        underCateMethod: '',
        delMessage: '',
        categoryList: {},
        subCateList: {},
        changeData: {}
      }
    },
    async mounted(){
      this.categoryList = await this.getCategory();
      await this.getSubCate();
    },
    methods: {
      backMenu: async function() {await this.getSubCate(); this.addUnderCateState = false;},
      isActive: async function(id){await this.subCateChange(id, this.subCateList[id])},
      nextPage: async function(){
        if (this.page < this.pagesCount){
          this.page += 1;
          await this.getSubCate()
        }
      },

      prevPage: async function(){
        if (this.page > 1){
          this.page -= 1;
          await this.getSubCate()
        }
      },
      addChangeUnderCate: function(method, id=0){
        if (id !== 0){
          this.changeCategoryId = Number(id);
          this.changeData = this.subCateList[Number(id)]
        }

        this.underCateMethod = method,
        this.addUnderCateState = true
      },
      getCategory: async function(){
        let result = await axiosMiddleware('GET', 'admin/category', {}, true)
        return result.data;
      },
      getSubCate: async function(page=this.page){
        let url = `admin/subcate?page=${page}${(this.categoryId !== 0) ? '&category_id='+this.categoryId: ''}`
        let result = await axiosMiddleware('GET', url, {}, true)

        this.subCateList = result.data.data;
        this.pagesCount = result.data.number_pages;
      },
      subCateChange: async function(cateId, subCateData){
         subCateData['id'] = cateId;
         await axiosMiddleware('PATCH', 'admin/subcate', subCateData, true)
      },
      confirmDelCate: function(id){
        id = Number(id);
        this.delMessage = `Данное действие удалит подкатегорию ${this.subCateList[id].ru}, и все товарый связанные с этой подкатегорией.`;
        this.args = [id];
        this.confirmWindows = true
      },
      delCate: async function(id){
        this.confirmWindows = false;
        let req = await axiosMiddleware('DELETE', `admin/subcate?id=${id}`, {}, true);

        if (!req.errorState){
          delete this.subCateList[id];
          this.confirmWindows = false
          await this.getSubCate()
        }
      },
    },
    watch:{
      async categoryId(){
        this.page = 1;
        await this.getSubCate()
      }
    }
  }
</script>

<template>
  <div class="under-cate">
    <div class="under-cate__container">

      <Transition name="admin-dell">
        <div v-if="confirmWindows">
          <ConfirmWindow :func="delCate"
                         :args="args"
                         title="Удалить категорию ?"
                         :message="delMessage"
                         l_button_name="Удалить"
                         r_button_name="Отменить"
                         @cancel="confirmWindows=false"/>

        </div>
        </Transition>

      <Transition name="switch-component">
        <div class="under-cate__change" v-if="addUnderCateState">
          <UnderCateChange @backMenu="backMenu"
                           :method="underCateMethod"
                           :categoryList="categoryList"
                           :changeCategoryId="changeCategoryId"
                           :changeData="changeData"/>
        </div>

          <div class="under-cate__left-block" v-else>
            <div class="under-cate__left-block-content">
              <div class="under-cate__left-block-header">
                <div>
                  <h1 class="admin__h1 admin_text">Подкатегории</h1>
                </div>

                <div>
                  <button type="button" class="admin__button" @click="addChangeUnderCate('add')">Добавить подкатегорию</button>
                </div>
              </div>

              <div class="under-cate__left-block-filter">
                <label class="admin__label">Фильтр по категориям</label>

                <select class="admin__select" v-model="categoryId">
                  <option class="admin__option" :value="0" v-bind:key="0">Все</option>
                  <option class="admin__option" v-for="(perm, key) in categoryList" :value="key" v-bind:key="key.id">
                    {{perm.ru}}
                  </option>
                </select>
              </div>

              <div class="under-cate__left-block-subcate-list">
                <table class="under-cate__table admin__table">

                  <tr  class="subcate-list">
                    <th class="admin__th" scope="col">Статус</th>
                    <th class="under-cate__id admin__th" scope="col">ID</th>
                    <th class="admin__th" scope="col">Название категории</th>
                    <th class="admin__th" scope="col">Дата создание</th>
                  </tr>

                  <TransitionGroup name="admin-dell">
                  <tr v-for="(cate, key) in subCateList" v-bind:key="key">
                      <td class="under-cate__status">
                        <label class="radio__checkbox">
                          <input type="checkbox" class="radio__checkbox-input" @change="isActive(key)" v-model="cate.is_active">
                          <div class="radio__checkbox-inner"></div>
                        </label>
                      </td>
                      <td class="under-cate__id">{{key}}</td>
                      <td class="under-cate__ru"><a>{{cate.ru.slice(0,20)}}</a></td>
                      <td class="under-cate__datetime">{{cate.date_create}}</td>
                      <div class="admin__change-btn">
                        <td>
                          <button class="change-btn" v-on:click="addChangeUnderCate('change', key)">
                              <img src="@/assets/icons/icons8-edit-50.png">
                          </button>
                        </td>

                        <td>
                          <button class="change-btn" v-on:click="confirmDelCate(key)">
                              <img src="@/assets/icons/icons8-trash-64.png">
                          </button>
                        </td>
                      </div>
                  </tr>
                  </TransitionGroup>
                </table>
              </div>

              <div class="user-list__pagination">
                <button type="button" class="pagination-button admin__button" @click="nextPage" v-if="pagesCount > 1 && page < pagesCount">Вперед</button>
                <button type="button" class="admin__button" @click="prevPage" v-if="page > 1">Назад</button>
              </div>

            </div>
          </div>
      </Transition>

        <div class="under-cate__right-block">
          <div class="under-cate__left-block-content">
            
          </div>
        </div>

      </div>
    </div>

</template>


<style media="screen">
  .under-cate{
    width: 100%;
    height: 60%;
    margin-bottom: 10%;
  }

  .under-cate__container{
    width: 100%;
    height: 100%;
  }

  .under-cate__left-block{
    width: 65%;
    height: 100%;
    background-color: var(--bgc);
    border-radius: 6px;
    padding: 25px;
  }

  .under-cate__left-block-content{
    width: 100%;
    height: 100%;
    margin: 0 auto;
    margin-bottom: 100px;
  }

  .under-cate__left-block-header{
    display: flex;
    justify-content: space-between;
    margin-bottom: 2.5%;
  }

  .under-cate__left-block-filter{
    width: 45%;
    margin-bottom: 2.5%;
  }

  .under-cate__left-block-subcate-list{
    width: 100%;
    margin-bottom: 5%;
  }

  .under-cate__table{
  }

  .under-cate__id{
    width: 25px;
  }

  .under-cate__ru{
    word-break: break-all;
    width: 30%;
  }

  .under-cate__status{
    width: 2%;
  }

  .under-cate__datetime{
    width: 25%;
  }
</style>
