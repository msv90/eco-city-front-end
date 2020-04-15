import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import menu from './menu.js'
import minimenu from './minimenu.js'

export default new Vuex.Store({
    state: {
    },
    mutations: {
    },
    actions: {
    },
    modules: {
        menu: menu,
        minimenu: minimenu
    }
})
