import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './lang'
import './assets/styles/icon.css'
import './assets/fonts/daysOne.css'
Vue.config.productionTip = false

console.log(router)
console.log(App)
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
