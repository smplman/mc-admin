<template>
  <div>
    <h1>MC-Admin</h1>
    <router-link to="/">Terminal</router-link>
    <router-link to="/players" :click="clickButton()">Players</router-link>
    <router-link to="/editor">Config Editor</router-link>
    <notifications group="mc_log" />
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.component('App', {
  components: { },
  data () {
    return { }
  },
  sockets: {
    connect: function () {
      console.log('socket connected')
    },
    mcLog: function (data) {
       console.log('mcLog', data)
      this.$notify({
        group: 'mc_log',
        type: data.level.toLowerCase(),
        title: 'Important message',
        text: data.message
      })
    },

  },
  async mounted() {
      console.log('mounted')
  },
  methods: {
    clickButton: function(e) {
      console.log(e, 'click emmit')
      this.$socket.emit('message', 'test')
    }
  },
});
</script>

<style lang="scss">

</style>