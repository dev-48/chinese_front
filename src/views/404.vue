<template>
  <div class="404">
    <p class="zoom-area">{{$t('not_found')}}</p>
    <section class="error-container">
        <span class="four"><span class="screen-reader-text">4</span></span>
        <span class="zero"><span class="screen-reader-text">0</span></span>
        <span class="four"><span class="screen-reader-text">4</span></span>
    </section>
    <div class="link-container">
      <router-link to="/" class="more-link">{{$t('base_page')}}</router-link>
    </div>
  </div>
</template>

<script>
import '@/assets/style/404.css';

export default{
  name: 'NotFound'
}
</script>


<style media="screen">

</style>
