import App from './App.vue'
import Notifications from 'vue-notification'
import router from './router'
import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'

import '../assets/app.scss'

Vue.use(Notifications)

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:3000'
}))

new Vue({
  router,
  el: '#app',
  render: h => h(App)
})