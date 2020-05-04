<template>
  <div>
    <h1>Config Editor</h1>
    <file-list :items="items" v-on:fileClick="fetchFile" />
    <config-editor v-model="fileData"/>
    <button @click.prevent="saveFile()">Save</button>
  </div>
</template>

<script>
import axios from 'axios'
import ConfigEditor from '../components/ConfigEditor.vue'
import FileList from '../components/FileList.vue'
import Vue from 'vue'

export default Vue.component('Editor', {
  components: { 
    ConfigEditor,
    FileList
  },
  data() {
    return {
      items: [],
      fileName: '',
      fileData: ''
    }
  },
  mounted() {
    axios
      .get(`http://localhost:3000/files`)
      .then(response => {
        this.items = response.data
      })
      .catch(e => {
        this.errors.push(e);
      });
  },
  methods: {
    fetchFile(file) {
      console.log('fetchFile', file)
      this.fileName = file
      axios
        .get(`http://localhost:3000/files`, {
          params: {
            file
          }
        })
        .then(response => {
          this.fileData = response.data
        })
        .catch(e => {
          this.errors.push(e);
        });
    },
    saveFile() {
      console.log('saveFile', this.fileName)
      axios.post('http://localhost:3000/files', {
          fileName: this.fileName,
          fileData: this.fileData
        })
        .then(function (response) {
          console.log(response);
        })
    }
  },
})
</script>