import Vue from 'vue'
import Api from '../Api'

export default {
    namespaced: true,
    state: {
        minimenu: {
            home_order: {
                router_link: 'News',
                text: 'Новости со строек',
            },
            about: {
                router_link: 'About',
                text: 'О нас',
            },
        }
    },
    getters: {
        MiniMenu: state => {
            return state.minimenu
        },
    },
    mutations: {
        'SPECIAL': (state, data) => {
            state.minimenu = {}
            Vue.set(state.minimenu, 'home_order', {
                router_link: 'News',
                text: 'Новости со строек',
            })

            let objLink = {text: 'Акции', router_link: 'SpecialsList', counter: data}
            Vue.set(state.minimenu, 'specials', objLink)

            Vue.set(state.minimenu, 'about', {
                router_link: 'About',
                text: 'О нас',
            })
        },
    },
    actions: {
        'SPECIAL' : ({ commit }) => {
            Api.special.list(1).then(response => {
                if(response.status === 200 && response.data > 0) {
                    commit('SPECIAL', response.data)
                }
            })
        }
    },
    modules: {

    }
}
