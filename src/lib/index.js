import VueWaterMarkTools from '../components/vueWaterMarkTools.vue'

const vueWaterMarkTools = {
  install: function (Vue) {
    if (typeof window !== 'undefined' && window.Vue) {
      Vue = window.Vue
    }
    Vue.component('vueWaterMarkTools', VueWaterMarkTools)
  }
}

export default vueWaterMarkTools;
