<template>
  <router-view v-slot="{Component}">

    <component :is="Component">
      <template #header>
        <Header/>
      </template>

      <template #preloader>
        <PreLoader/>
      </template>

      <template #footer>
        <Footer/>
      </template>
    </component>

  </router-view>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import PreLoader from '@/components/PreLoader.vue';

export default {
  name: 'App',
  computed:{
    authState(){return this.$store.getters.getAuthState},
    userData(){return this.$store.getters.getUserData;}
  },
  components: {
    Header,
    Footer,
    PreLoader
  },
  async created(){
    this.$store.dispatch('checkAuth');
    //console.log(await this.$store.dispatch('getCategoryList'))
  }
}
</script>


<style>
#app{
  width: 100%;
  height: 100%;

}
</style>
