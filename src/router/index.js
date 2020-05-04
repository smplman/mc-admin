import Vue from 'vue'
import VueRouter from 'vue-router';
import Terminal from '../pages/Terminal.vue'
import Players from  '../pages/Players.vue'
import Editor from '../pages/Editor.vue'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes : [
    { 
      path: '/', 
      name: 'home',
      component: Terminal 
    },
    { 
      path: '/players', 
      name: 'players',
      component: Players 
    },
    { 
      path: '/editor', 
      name: 'editor',
      component: Editor 
    },
    {
      path: '*',
      name: '404',
      component: Terminal
    }
  ]
})