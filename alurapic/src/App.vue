<template>
<div class='page-container'>
  <main-menu  v-bind:routes="routes"></main-menu>
  <div class='corpo'>
    <transition name='pagina'>
      <router-view></router-view>
    </transition>
  </div>
</div>
</template>


<script>
import { routes } from './routes';
import Menu from './components/shared/menu/Menu.vue';

export default {
  components:{
    'main-menu': Menu
  },
  data(){
    return {
      routes:routes.filter(route => route.menu)
    }
  }
}
</script>

<style>
  .corpo {
    font-family: Helvetica, sans-serif;
    margin: 0 auto;
    width: 96%;
  }
  .pagina-leave-active, .pagina-enter{
    opacity: 0
  }

  .pagina-enter-active, .pagina-leave-active {
    transition: opacity .4s
  }

  .page-container {
    text-align: center;
    vertical-align: middle;
    max-width: 800px;
    margin: auto;
  }

</style>
