<script>
  import {checkInput, axiosMiddleware} from "@/util/utils.js"; //axiosMiddleware
  import PreLoader from '@/components/PreLoader.vue';

  export default{
    name: "UnderCateChange",
    props:{
      method: String,
      categoryList: Object,
      changeData: Object,
      changeCategoryId: Number,
    },
    computed:{
      requestState(){return this.$store.getters.getRequestStatus},
    },
    components:{
      PreLoader
    },
    data(){
      return {
        errorState: false,
        errorMessage: '',
        ru: '',
        kz: '',
        categoryId: '',
        headerText: "Новая Подкатегория"
      }
    },
    mounted(){
      if (this.method == "change"){
        this.headerText = "Изменения Подкатегории"
        this.ru = this.changeData.ru;
        this.kz = this.changeData.kz;
        this.categoryId = this.changeData.category_id
      }
    },
    methods:{
      backMenu: function(){this.$emit('backMenu')},
      displayError: function(message, state=true){
        this.errorState = state;
        this.errorMessage = message;
      },
      sendToReq: async function(){
        this.displayError('', false);

        let method = (this.method === "change") ? "PATCH": "POST";
        let data = {"ru": this.ru, "kz": this.kz, "category_id": Number(this.categoryId)}

        let checkState = checkInput(data, [], {
          "ru": {"minLength": 2, "inputName": "Названия категории на русском"},
          "kz": {"minLength": 2, "inputName": "Названия категории на казахском "},
          "category_id": {"minLength": 1, "inputName": "Категория"}
        })
        if (!checkState.status){
          return this.displayError(checkState.message);
        }

        if (this.method === "change")
          data['id'] = this.changeCategoryId;

        console.log(method)
        let req = await axiosMiddleware(method, 'admin/subcate', data, true)
        if (req.errorState)
          this.displayError(req.errorMessage)

        this.backMenu()
      }
    },
    watch:{
      ru(newValue, oldValue){
        if (newValue.length > 45)
          this.ru = oldValue;
      },
      kz(newValue, oldValue){
        if (newValue.length > 45)
          this.kz = oldValue;
      }
    }
  }
</script>

<template>
  <div class="under-cate__add-block">
    <div class="under-cate__left-block-content">

      <div class="under-cate__add-header under-cate__left-block-header">
        <div>
          <h1 class="admin__h1 admin_text">{{headerText}}</h1>
        </div>

        <div>
          <button type="button" class="admin__button" @click="backMenu">Назад</button>
        </div>
      </div>

      <div class="under-cate__add-content">
        <div class="under-cate__add-content-input-block">
          <label class="admin__label">Выберите категорию для закрепления</label>

          <select class="admin__select" v-model="categoryId">
            <option class="admin__option" disabled value="">Категория</option>
            <option class="admin__option" v-for="(perm, key) in categoryList" :value="key" v-bind:key="key.id">
              {{perm.ru}}
            </option>
          </select>

        </div>

        <div class="under-cate__add-content-input-block">
          <label class="admin__label">Название на русском (не меньше 2 и не более 45 символов)</label>
          <input type="text" class="admin__input" v-model="ru">
        </div>

        <div class="under-cate__add-content-input-block">
          <label class="admin__label">Название на казахском (не меньше 2 и не более 45 символов)</label>
          <input type="text" class="admin__input" v-model="kz">
        </div>

        <div class="add-category__error" v-if="errorState">
          <span class="admin__error-message">{{errorMessage}}</span>
        </div>

        <div class="under-cate__add-content-send-block">
          <div class="preloader" v-if="requestState">
            <PreLoader/>
          </div>
          <button v-else type="button" v-on:click="sendToReq" class="admin__button">Отправить</button>
        </div>

      </div>

    </div>
  </div>
</template>

<style media="screen">
.under-cate__add-content-send-block{
  margin-top: 5%;
  margin-bottom: 2%;
}

.under-cate__add-block{
    width: 65%;
    height: 100%;
    background-color: var(--bgc);
    border-radius: 6px;
    padding: 25px;
  }

  .under-cate__add-content-input-block{
    margin-bottom: 3%;
  }

  .under-cate__add-header{
    margin-bottom: 3%;
  }
</style>
