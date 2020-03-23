import Vue from 'vue'
import '@/plugins/axios'
import '@/plugins/vuetify'
import '@/plugins/common'
import i18n from '@/plugins/i18n'
import App from '@/App.vue'
import router from '@/router'
import { store } from '@/store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  created() {
    store.dispatch('setLocale', store.getters.locale)
  }
}).$mount('#app')
