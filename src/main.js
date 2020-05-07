// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import App from './App'
import SchemaForm from '../src/components/SchemaForm'

Vue.use(Buefy)
Vue.component(SchemaForm.name, SchemaForm)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
