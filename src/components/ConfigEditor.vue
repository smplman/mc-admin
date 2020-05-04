<template>
  <div class="config-editor">
    <textarea :value="value" @input="$emit('input', $event.target.value)"></textarea>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.component('ConfigEditor', {
  components: { },
  props: {
    value: {
      type: String,
      default: ''
    }
  }
})
</script>

<style lang="scss">
.config-editor {
  padding: 10px;
  textarea {
    width: 100%;
    height: 50vh;
    background: #000;
    color: #FFF;
  }
}
</style>