import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    open: '#FF0000',
    assigned: '#FFD700',
    completed: '#32CD32',
    closed: '#A9A9A9',
    currency: '#FF8C00'
  }
})
