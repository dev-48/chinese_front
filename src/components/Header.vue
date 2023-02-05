<template>
  <header class="header">
    <div class="header__cap">
			<ul class="header__cap-left-elem">
				<li>+7 705 688-58-31</li>
				<li>+7 705 688-58-31</li>
			</ul>
			<ul class="header__cap-right-elem">
				<li><router-link to="/">{{$t('delivery_and_pay')}}</router-link></li>
				<li><router-link to="/">{{$t('pickup')}}</router-link></li>
				<li><router-link to="/">{{$t('shop')}}</router-link></li>
				<li><router-link to="/">{{$t('return')}}</router-link></li>
			</ul>
		</div>


	<div class="header__center_block-container">
		<div class="header__center_block-content">
			<div class="header__center_block">
        <router-link to="/">
				<div class="header__center_block-logo">
					<img class="header__center_block-logo-img" src="../assets/logo.png">
					<p>
						Китайский
						Лекарь
					</p>
				</div>
      </router-link>

				<div class="header__center_block-search">
					<input type="search" class="header__center_block-search_input" name="" :placeholder="$t('placeholder.search')">
					<button class="header__center_block-search_button"></button>
				</div>

				<div class="header__center_block-icon">
					<div class="header__auth">
						<router-link :to="{path: userRoute}"><img src="../assets/icons/user.png"></router-link>
					</div>


					<div class="shopping-cart">
						<a><img src="@/assets/icons/shopping-cart.png"></a>
						<div class="shopping-cart__count">
							<a class="shopping-cart__count-title">10</a>
						</div>
					</div>

					<div class="header__lang">
						<a @click="switchLang"><span class="header__lang-text">{{getLang.toUpperCase()}}</span></a>
					</div>

				</div>
			</div>
		</div>
	</div>

  <div :class="['header__collections', {is_snow: is_snow}]">
    <div class="header__collections-content">
      <ul class="header__collections-menu">

        <li class="header__collections-item">
          <div class="header__collections-controls">

            <div class="img-ratio__inner">
              <img class="header__collections-img" src="@/assets/test_img/Фото.webp">
            </div>

            <a class="header__collections-title" href="#">Сад и огород</a>
          </div>

          <ul class="header__collections-submenu">
            <li class="header__collections-item">
              <a class="header__collections-link" href="#">Растения и цветы</a>
              <a class="header__collections-link" href="#">Уход за растениями</a>
              <a class="header__collections-link" href="#">Садовый инвентарь</a>
              <a class="header__collections-link" href="#">Садовые инструменты</a>
              <a class="header__collections-link" href="#">Товары для отдыха</a>
              <a class="header__collections-link" href="#">Барбекю для дачи</a>
            </li>
          </ul>
        </li>

        <li class="header__collections-item">
          <div class="header__collections-controls">

            <div class="img-ratio__inner">
              <img class="header__collections-img" src="@/assets/test_img/Садовая_мебель.webp" alt="">
            </div>

            <a class="header__collections-title" href="#">Садовая мебель</a>
          </div>

          <ul class="header__collections-submenu">
            <li class="header__collections-item">
              <a class="header__collections-link" href="#">Terraboom</a>
              <a class="header__collections-link" href="#">Уход за растениями</a>
              <a class="header__collections-link" href="#">Садовый инвентарь</a>
              <a class="header__collections-link" href="#">Садовые инструменты</a>
              <a class="header__collections-link" href="#">Товары для отдыха</a>
              <a class="header__collections-link" href="#">Барбекю для дачи</a>
              <a class="header__collections-link" href="#">Lizard</a>
              <a class="header__collections-link" href="#">Комплекты мебели</a>
              <a class="header__collections-link" href="#">Технические светильники</a>
              <a class="header__collections-link" href="#">Подвесные светильники</a>
            </li>
          </ul>
        </li>

        <li class="header__collections-item">
          <div class="header__collections-controls">

            <div class="img-ratio__inner">
              <img class="header__collections-img" src="@/assets/test_img/Посуда.webp" alt="">
            </div>

            <a class="header__collections-title" href="#">Посуда</a>
          </div>

          <ul class="header__collections-submenu">
            <li class="header__collections-item">
              <a class="header__collections-link" href="#">Laambro</a>
              <a class="header__collections-link" href="#">Belfast</a>
              <a class="header__collections-link" href="#">Glasgow</a>
              <a class="header__collections-link" href="#">Denmark</a>
              <a class="header__collections-link" href="#">Для приготовления</a>
              <a class="header__collections-link" href="#">Сервиловка стола</a>
              <a class="header__collections-link" href="#">Для чая и кофе</a>
              <a class="header__collections-link" href="#">Для чая и кофе</a>
            </li>
          </ul>
        </li>


        <li class="header__collections-item">
          <div class="header__collections-controls">

            <div class="img-ratio__inner">
              <img class="header__collections-img" src="@/assets/test_img/Освещение.webp" alt="">
            </div>

            <a class="header__collections-title" href="#">Освещение</a>
          </div>

          <ul class="header__collections-submenu">
            <li class="header__collections-item">
              <a class="header__collections-link" href="#">Люстры</a>
              <a class="header__collections-link" href="#">Комплектующие для светильников</a>
              <a class="header__collections-link" href="#">Технические светильники</a>
              <a class="header__collections-link" href="#">Лампочки</a>
              <a class="header__collections-link" href="#">Светодиодное освещение</a>
              <a class="header__collections-link" href="#">Подвесные светильники</a>
            </li>
          </ul>
        </li>

        <li class="header__collections-item">
          <div class="header__collections-controls">

            <div class="img-ratio__inner">
              <img class="header__collections-img" src="@/assets/test_img/Фото.webp" alt="">
            </div>

            <a class="header__collections-title" href="#">Сад и огород</a>
          </div>

          <ul class="header__collections-submenu">
            <li class="header__collections-item">
              <a class="header__collections-link" href="#">Растения и цветы</a>
              <a class="header__collections-link" href="#">Уход за растениями</a>
              <a class="header__collections-link" href="#">Садовый инвентарь</a>
              <a class="header__collections-link" href="#">Садовые инструменты</a>
              <a class="header__collections-link" href="#">Товары для отдыха</a>
              <a class="header__collections-link" href="#">Барбекю для дачи</a>
            </li>
          </ul>
        </li>

      </ul>
    </div>
  </div>

		<nav class="header__nav">
			<div class="header__nav-area_catalog">
				<button @click="submenu">☰ Каталог</button>
			</div>

			<div class="header__nav-list">
				<ul class="header__nav-list-ul">
					<li><router-link to="/">{{$t('company')}}</router-link></li>
					<li><router-link to="/">{{$t('contact')}}</router-link></li>
					<li><router-link to="/">{{$t('delivery')}}</router-link></li>
					<li><router-link to="/">{{$t('payment')}}</router-link></li>
					<li><router-link to="/">{{$t('personal_area')}}</router-link></li>
				</ul>
			</div>

      <div :class="['header__collections-overlay', {is_snow: is_snow}]" @click="submenu">
      </div>

		</nav>
	</header>
</template>


<script>
import '@/assets/style/header.css';

export default {
  name: 'Header',
  computed: {
    authState(){return this.$store.getters.getAuthState},
    userData(){return this.$store.getters.getUserData;},
    getLang(){
      return this.$store.getters.getLang;
    }
  },
  data(){
    return{
      is_snow: true,
      userRoute: "/auth"
    }
  },
  created(){
    if (this.authState){
      this.userRoute = '/'

      if (this.userData.is_staff)
        this.userRoute = '/staff/panel';
    }

    this.$i18n.locale = this.getLang;
  },
  methods:{
    submenu: function(){
      this.is_snow = (this.is_snow) ? false: true;
    },
    switchLang: function(){
      let lang = this.$i18n.locale;
      (lang === 'ru') ? lang = 'kz': lang = 'ru';

      this.$i18n.locale = lang;
      this.$store.commit('setLang', lang)
    }
  }
}
</script>/

<style>

.is_snow{
  display: none
}


.header__collections-overlay{
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.3);
  z-index: 2;

  filter: contrast(0.8);
}


.header__collections{
  position: absolute;
  top: 199px;
  right: 0;
  z-index: 3;
  width: 100%;
  height: 718px;
}


.header__collections-content{
    height: 100%;
    width: 80%;
    background-color: #ffffff;
    margin: 0 auto;
    padding: 2rem;
    overflow-y: auto;
    scrollbar-width: thin;
    min-height: 300px;
    box-shadow: 0px 0 15px rgb(0 0 0 / 50%);
}


.header__collections-item{
  width: 223px;
  margin-right: 55px;
  margin-bottom: 25px;
}


.header__collections-menu li, .header__collections-menu ul{
  padding: 0;
}


.header__collections-menu{
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-left: 15px;
}


.header__collections-controls{
  padding-bottom: 12px;
}


.img-ratio__inner{
    position: relative;
    width: 228.39px;
    height: 228.39px;
    margin-bottom: 20px;
    overflow: hidden;
}


.header__collections-img{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    border-radius: 12px;
    object-fit: cover;
    transform: translate(-50%, -50%);
}


.header__collections-title{
  display: block;
  font-size: 26px;
  font-weight: 400;
  transition: color .2s;
}


.header__collections-link{
  display: block;
  font-size: 15px;
  margin-bottom: 5px;
  transition: color .15s;
}


.header__collections-link:hover, .header__collections-title:hover{
  color: var(--violet);
}



</style>
