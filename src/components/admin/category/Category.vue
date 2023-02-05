<script>
  import ChangeAddCate from '@/components/admin/category/ChangeAddCate.vue';
  import ConfirmWindow from '@/components/ConfirmWindow.vue';
  import {axiosMiddleware} from "@/util/utils.js"; //axiosMiddleware

  export default{
    name: 'Category',
    components:{
      ChangeAddCate,
      ConfirmWindow
    },
    data(){
      return{
        args: null,
        selectionCate: 0,
        categoryState: false,
        contentBlock: false,
        confirmWindows: false,
        defaultImg: `${this.$store.getters.getBackEndAdr}/api/v1/static/image/no_image-612.jpg`,
        img: this.defaultImg,
        cateMethod: "",
        ru_text: "",
        kz_text: "",
        delMessage: "",
        categoryList: {},
        cateData: {},
      }
    },
    async mounted(){this.getCategory()},
    methods:{
      getCategory: async function(){
        let result = await axiosMiddleware('GET', 'admin/category', {}, true)
        this.categoryList = result.data;
      },

      delCate: async function(id){
        this.confirmWindows = false;
        let req = await axiosMiddleware('DELETE', `admin/category?id=${id}`, {}, true);

        if (!req.errorState){
          delete this.categoryList[id];
          this.clearContentBlock()
        }
      },

      cateState(cateMethod, id=0){
        if (id !== 0){
          this.cateData = this.categoryList[id];
          this.selectionCate = Number(id);
        }

        this.cateMethod = cateMethod;
        this.clearContentBlock();
        this.categoryState=true;
      },

      clearContentBlock(){
        this.ru_text = "";
        this.kz_text = "";
        this.img = this.defaultImg;
        this.contentBlock = false;
      },
      backMenu: async function(){
        this.categoryState = false;
        this.getCategory(),
        this.clearContentBlock()
      },
      viewCataContent: function(id){
        let data = this.categoryList[id]
        this.ru_text = data.ru;
        this.kz_text = data.kz;
        this.img = `${this.$store.getters.getBackEndAdr}${data.image}`
        this.contentBlock = true
      },
      confirmDelCate: function(id){
        this.delMessage = `Данное действие удалить категорию ${this.categoryList[id].ru}, и все подкатегории и товарый связанные с этой категорией.`
        this.args = [id];
        this.confirmWindows = true
      },
      newCateRuText: function(value){this.ru_text = value; console.log(value.length)},
      newCateKzText: function(value){this.kz_text = value},
      newCateImg: function(value){this.img = value},
    }
  }
</script>

<template>
  <div class="admin_category">
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


    <div class="admin_category__container">
    <Transition name="admin-component-up">
      <div class="category__left-block" v-if="categoryState">
          <ChangeAddCate :cateMethod="cateMethod"
                         :cateData="cateData"
                         :entryId="selectionCate"
                         @backMenu="backMenu"
                         @ruText="newCateRuText"
                         @kzText="newCateKzText"
                         @img="newCateImg"/>
      </div>

      <div class="category__left-block" v-else>
        <div class="category__left-block-content">
          <div class="category__left-block-header">
            <div class="admin_category-name">
              <h1 class="admin__h1 admin_text">Категории</h1>
            </div>

            <div class="left-block-header__add-category">
              <button type="button" class="admin__button" v-on:click="cateState('add')">Добавить категорию</button>
            </div>
          </div>

          <div class="category__left-block-search">
            <div class="left-block-search-input">
            </div>
          </div>

          <div class="category__left-block-list">
            <table class="admin__table">
              <tr  class="category_tr">
                <th class="admin__th user_list__id-th" scope="col">ID</th>
                <th class="admin__th category_th" scope="col">Название категории</th>
                <th class="admin__th datetime_row" scope="col">Дата создание</th>
              </tr>
              <TransitionGroup name="admin-dell">
                <tr v-for="(cate, key) in categoryList" v-bind:key="key" class="category_tr">
                  <div class="category__data-container">
                      <td class="user_list__id-th admin__td">{{key}}</td>
                      <td class="user_list__id-th admin__td">
                        <a class="admin__td category_th" v-on:click="viewCataContent(key)">{{cate.ru}}</a>
                      </td>
                      <td class="admin__td datetime_row">{{cate.date_create}}</td>
                      <div class="admin__change-btn">
                        <td>
                          <button class="change-btn" v-on:click="cateState('change', key)">
                              <img src="@/assets/icons/icons8-edit-50.png">
                          </button>
                        </td>

                        <td>
                          <button class="change-btn" v-on:click="confirmDelCate(key)">
                              <img src="@/assets/icons/icons8-trash-64.png">
                          </button>
                        </td>
                      </div>
                  </div>
                </tr>
              </TransitionGroup>
            </table>
          </div>
        </div>
      </div>
      </Transition>
      <Transition name="admin-component">
        <div class="category__right-block" v-if="contentBlock || categoryState">
          <div class="content-block_content">

            <div class="content-block__image-block">
              <img class="category__right-block-image" :src="img" alt="">
            </div>

            <div class="category__right-block-name">
              <label class="admin__label">Название на русском</label>
              <p class="right-block__name-category admin_text">{{ru_text}}</p>
            </div>

            <div class="category__right-block-name">
              <label class="admin__label">Название на казахском</label>
              <p class="right-block__name-category admin_text">{{kz_text}}</p>
            </div>
            <tr class="category_tr">
              <div class="category__data-container">
                <td class="user_list__id-th admin__td">1</td>
                <a class="admin__td category_th">Категория и  ее очень длинное название =</a>
                <td class="admin__td datetime_row">20.12.2023</td>
                <div class="admin__change-btn">
                  <td>
                    <button class="change-btn">
                      <img src="@/assets/icons/icons8-edit-50.png">
                    </button>
                  </td>

                  <td>
                    <button class="change-btn">
                      <img src="@/assets/icons/icons8-trash-64.png">
                    </button>
                  </td>
                </div>
              </div>
            </tr>
          </div>
        </div>
      </Transition>

    </div>
  </div>
</template>


<style media="screen">
  .category_tr{
    width: 100%;
  }

  .datetime_row{
    width: 162px;
    height: 40px;
  }

  .category__data-container{
    width:100%;
    display: flex;
  }


  .category_tr{
    width: 100%;
    height: 40px;
    vertical-align: middle;
    display: flex;
    margin-top: 5%;
  }

  .content-block_content{
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 90%;
    height: 90%;
    margin-top: 20px;
  }

  .category__left-block-search{
    width: 60%;
    margin-bottom: 35px;
  }

  .admin_category{
    width: 100%;
    height: 100%;
  }

  .admin_category__container{
    display: flex;
  }

  .category__left-block-header{
    display: flex;
    justify-content: space-between;
    margin: 25px 0 25px 0px;

  }

  .category__left-block{
    width: 65%;
    height: 800px;
    padding-bottom: 20px;
  }

  .category__right-block{
    width: 35%;
    height: 450px;
  }

  .category__right-block,
  .category__left-block{
    background-color: var(--bgc);
    border-radius: 6px;
    margin-right: 2%;
    height: 100%;
    padding-bottom: 30px;
  }

  .left-block-header__input{
    width: 50%;
  }

  .category__left-block-content{
    width: 95%;
    margin: 0 auto;
  }

  .category_th{
    width: 50%;
    word-break: break-all;
    height: 50px;
  }

  .right-block__name-category{
    font-size: 17px;
    width: 80%;
  }

  .content-block__image-block{
    position: relative;
    width: 45%;
    height: 45%;
    overflow: hidden;
    border-radius: 6px;
    margin-bottom: 10px
  }

  .category__right-block-image{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    border-radius: 6px;
  }

  .category__left-block-list{
    width: 100%;
    height: 100%;
  }

  .category__right-block-name{
    width: 100%;
    overflow: hidden;
    margin-top: 15px;
  }
</style>

<style scoped>
.admin__table {
  max-height: 100%;
}
</style>
