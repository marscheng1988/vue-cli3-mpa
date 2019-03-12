import Vue from 'vue';
import App from './App.vue';
import store from './store';

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');

const width = window.innerWidth / 7.5;
document.getElementsByTagName('html')[0].style.fontSize = `${width}px`;