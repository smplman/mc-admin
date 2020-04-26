<template>
  <div>
    <h1>MC-Admin</h1>
    <terminal />
  </div>
</template>

<script>
import Vue from 'vue'
import Terminal from './components/Terminal.vue'

export default Vue.component('App', {
  components: { 
    VueTerminal 
  },
  data () {
    return {

    }
  },
  async mounted() {
      console.log('mounted')
  },
});
</script>

<style lang="sass">

</style>