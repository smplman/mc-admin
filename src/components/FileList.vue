<template>
  <ul>
    <li v-for="item in items" :key="item">
      <a href="#" @click.prevent="$emit('fileClick', item)">{{item}}</a>
    </li>
  </ul>
</template>

<script>
import Vue from 'vue'

export default Vue.component('FileList', {
  props: {
    items: {
      type: Array,
      default: []
    }
  },
  methods: {
    // fileClick(file) {
    //   console.log('fileClick', file)
    //   this.$emit('fileClick', file)
    // }
  },
})
</script>