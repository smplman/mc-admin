<template>
  <div>
    <h2>RCON Terminal</h2>
    <Terminal />
  </div>
</template>

<script>
import Terminal from '../components/Terminal.vue'
import Vue from "vue"

export default Vue.component("TerminalPage", {
  components: {
    Terminal
  }
});
</script>