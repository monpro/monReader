import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/styles/icon.css'
import './assets/fonts/daysOne.css'
Vue.config.productionTip = false

console.log(router)
console.log(App)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
