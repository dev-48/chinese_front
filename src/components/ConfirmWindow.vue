<script>
  export default{
    name: "ConfirmWindow",
    props: {
      func: Function,
      args: Array,
      title: String,
      message: String,
      l_button_name: String,
      r_button_name: String,
    },
    methods:{
      closeWindows(){this.$emit('cancel')}
    }
  }
</script>

<template>
  <div class="confirm_window">
    <div class="confirm-block__mask"></div>

    <div class="confirm-block">
      <div class="confirm-block__content">
        <div class="confrim-block__top-block">
          <img src="@/assets/icons/icons8-ask-question-96.png">
        </div>

        <div class="confrim-block__bottom-block">
          <h2 class="confrim-block__title">{{title}}</h2>

          <div class="confrim-block__message">
            <p>{{message}}</p>
          </div>


          <div class="confrim-block__btn">
            <button v-on:click="func(...args)">{{l_button_name}}</button>
            <button v-on:click="closeWindows">{{r_button_name}}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style media="screen">
  section, h1, h2, p, li, img, div {
    -moz-transition: width 0.5s ease-in-out, left 1.0s ease-in-out;
    -webkit-transition: width 0.5s ease-in-out, left 1.0s ease-in-out;
    -moz-transition: width 0.5s ease-in-out, left 1.0s ease-in-out;
    -o-transition: width 0.5s ease-in-out, left 1.0s ease-in-out;
    transition: width 0.5s ease-in-out, left 1.0s ease-in-out;
  }

  .confirm-block__mask{
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.5;
    z-index: 10;
    top: 0%;
    left: 0%;
  }


  .confirm-block{
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 11;
    transform: translate(-50%, -50%);
    width: 350px;
    height: 450px;
    background-color: #27293D;
    border-radius: 10px;
    padding-bottom: 20px;
  }

  .confirm-block__content{
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }


  .confrim-block__top-block,
  .confrim-block__bottom-block{
    width: 100%;
    height: 50%;
    display: flex;
    align-items: center;
    border: none;
    box-shadow: none;
  }


  .confrim-block__top-block{
    justify-content: center;
    background-color: #E14ECB;
    border-radius: 10px;
  }


  .confrim-block__bottom-block{
    color: #D2D2D6;
    font-family: 'Montserrat';
    flex-direction: column;
    justify-content: center;
  }

  .confrim-block__btn{
    display: flex;
    justify-content: space-around;
    width: 100%;
    margin-top: 5%;
  }


  .confrim-block__title{
    width: 77%;
    font-size: 22px;
  }


  .confrim-block__message{
    width: 77%;
    font-size: 13px;
    margin-bottom: 10px;
  }


  .confrim-block__btn button{
    border: none;
    color: white;
    background-color: #E14ECB;

    font-family: 'Montserrat';
    font-size: 14px;
    border-radius: 6px;
    padding: 10px;
    transition: background-color 0.3s;
  }


  .confrim-block__btn button:hover{
    background-color: #E174D1;
  }


  @media (max-width: 319px){
  .confrim-block__top-block img{
    width: 64px;
    height: 64px;
  }

  .confirm-block{
    width: 230px;
    height: 330px;
    padding-bottom: 10px;
  }

  .confrim-block__title{
    font-size: 13px;
  }

  .confrim-block__message{
    font-size: 8px;
  }

  .confrim-block__btn button{
    font-size: 9px;
    padding: 8px;
  }
  }


  @media (min-width: 320px) and (max-width: 480px) {
  .confrim-block__top-block img{
    width: 74px;
    height: 74px;
  }

  .confirm-block{
    width: 290px;
    height: 400px;
    padding-bottom: 10px;
  }

  .confrim-block__title{
      font-size: 17px;
  }

  .confrim-block__message{
    font-size: 10px;
  }

  .confrim-block__btn button{
    font-size: 11px;
    padding: 10px;
  }
  }


  @media (min-width: 481px) and (max-width: 768px){
  .confrim-block__top-block img{
    width: 82px;
    height: 82px;
  }

  .confirm-block{
    width: 320px;
    height: 420px;
    padding-bottom: 10px;
  }

  .confrim-block__title{
    font-size: 19px;
  }

  .confrim-block__message{
    font-size: 11.5px;
  }

  .confrim-block__btn button{
    font-size: 12.5px;
    padding: 10px;
  }
  }


  @media (min-width: 769px) and (max-width: 1024px){}
</style>
