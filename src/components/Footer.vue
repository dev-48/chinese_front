<template>
  <footer class="footer">
    <div class="footer__container">
      <div class="footer__content">
        <div class="footer__logo">
          <img class="footer__logo-img" src="@/assets/logo.png">
          <p class="footer__logo-name">
            Китайский
            Лекарь
          </p>
        </div>

        <div class="footer__content-data">
          <div class="footer__left-block">
            <a class="footer__left-block-text">{{$t('contac')}}</a>
            <a class="footer__left-block-text">{{$t('company')}}</a>
            <a class="footer__left-block-text">{{$t('service')}}</a>
            <a class="footer__left-block-text">{{$t('shop')}}</a>
            <a class="footer__left-block-text">{{$t('return')}}</a>
            <a class="footer__left-block-text">{{$t('gift')}}</a>
          </div>

          <div class="footer__right-block">
            <div class="footer__right-block-title">
              {{$t('contac')}}
            </div>

            <div class="footer__right-block-contact">
              +7 705 688-58-31 | +7 705 688-58-31
            </div>

            <div class="footer__right-block-adress">
              г. Шымкент, пр. Республики, 11, тд. Асем
            </div>

            <div class="footer__right-block-icons">
              <img class="footer__right-block-icon" src="@/assets/icons/icons8-yandex-zen-50.png">
              <img class="footer__right-block-icon" src="@/assets/icons/icons8-vk-48.png">
              <img class="footer__right-block-icon" src="@/assets/icons/icons8-telegram-app-50.png">
            </div>
          </div>

        </div>
      </div>
    </div>
  </footer>
</template>


<script>
import '@/assets/style/footer.css';

export default{
    name: 'Footer'
}
</script>
