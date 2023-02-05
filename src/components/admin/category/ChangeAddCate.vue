<script>
  import {checkInput, axiosMiddleware} from "@/util/utils.js"; //axiosMiddleware
  import PreLoader from '@/components/PreLoader.vue';

  export default{
    name: 'ChangeAddCate',
    computed:{
      requestState(){return this.$store.getters.getRequestStatus},
    },
    components:{
      PreLoader
    },
    props:{
      entryId: Number,
      cateMethod: String,
      cateData: Object
    },
    data(){
      return {
        ru: "",
        kz: "",
        image: '',
        errorMessage: '',
        imageUrl: null,
        errorMessageState: false,
      }
    },
    mounted(){
      if (this.cateMethod === "change"){
        this.ru = this.cateData.ru;
        this.kz = this.cateData.kz;

        this.imageUrl = (this.cateData.image) ? `${this.$store.getters.getBackEndAdr}${this.cateData.image}`: null;
      }
    },
    methods:{
      backMenu(){this.$emit("backMenu")},
      viewErrorMessage(message, state=true){this.errorMessageState = state, this.errorMessage = message},
      previewFiles(event){
        this.image = event.target.files[0];
        this.imageUrl = URL.createObjectURL(event.target.files[0]);
      },
      async cateRequest(){
        this.viewErrorMessage('', false);

        let formData = new FormData();
        let method = (this.cateMethod === "add") ? "POST" : "PATCH"

        formData.append('ru', this.ru)
        formData.append('kz', this.kz)
        formData.append('image', this.image);

        if (method === "PATCH")
          formData.append('id', this.entryId);


        let checkState = checkInput({"ru": this.ru, "kz": this.kz}, [], {
          "ru": {"minLength": 2, "inputName": "Названия категории на русском"},
          "kz": {"minLength": 2, "inputName": "Названия категории на казахском "}
        })
        if (!checkState.status)
          return this.viewErrorMessage(checkState.message)

        let resp = await axiosMiddleware(method, "admin/category", formData, false, false, {'Content-Type': 'multipart/form-data'})
        if (!resp.errorState)
          this.backMenu()
      }
    },
    watch:{
      ru(newValue, oldValue){
        if (newValue.length > 45)
          this.ru = oldValue

        this.$emit('ruText', newValue)
      },
      kz(newValue, oldValue){
        if (newValue.length > 45)
          this.kz = oldValue
        this.$emit('kzText', newValue)
      },
      imageUrl(newValue){
        if (newValue)
          this.$emit('img', newValue)
      }
    }
  }
</script>

<template>
  <div class="category__left-block-content">
    <div class="add-category">

      <div class="category__left-block-header">
        <div class="admin_category-name">
          <h1 class="admin__h1 admin_text">Новая категория</h1>
        </div>

        <div class="left-block-header__add-category">
          <button type="button" class="admin__button" @click="backMenu">Назад</button>
        </div>
      </div>

      <div class="add-category__name">
        <label class="admin__label">Названия категории на русском (не более 45 символов)</label>
        <input type="text" v-model="ru" class="admin__input">
      </div>

      <div class="add-category__name">
        <label class="admin__label">Названия категории на казахском (не более 45 символов)</label>
        <input type="text" v-model="kz" class="admin__input">
      </div>

      <div class="add-category__image">
        <label class="admin__file">
          <input type="file" @change="previewFiles" name="file">
          <span>Выберите файл</span>
        </label>
      </div>

      <div class="add-category__error" v-if="errorMessageState">
        <span class="admin__error-message">{{errorMessage}}</span>
      </div>

      <div class="add-category__send-button">
        <div class="preloader" v-if="requestState">
          <PreLoader/>
        </div>
        <button v-else type="button" class="admin__button" v-on:click="cateRequest">Отправить</button>
      </div>

    </div>
  </div>
</template>

<style media="screen">
  .add-category__error{
    width: 60%;
    margin-bottom: 20px;
  }

  .add-category__send-button{
    width: 100%;
    height: 100%;
  }

  .preloader{
    width: 80px;
    height: 80px;
    padding: 10px;
  }

  .add-category__image{
    padding: 25px 0 25px 0;
  }


  .add-category__name{
    margin-top: 25px;
  }
</style>
<style scoped>
.admin__error-message {
  filter: contrast(2);
}
</style>
